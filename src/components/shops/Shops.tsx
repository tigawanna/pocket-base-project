import React, { useState } from 'react'
import { AddShopCard, ShopCard, ShopFloor } from './ShopsParts';

import { client } from '../../pocketbase/config';
import { useQuery } from '@tanstack/react-query';
import { IconContext } from 'react-icons';
import { FaTimes } from 'react-icons/fa';
import { ShopForm } from './ShopForm/ShopForm';

interface ShopsProps {
user:any
}

export const Shops: React.FC<ShopsProps> = ({}) => {
 const floors = ["ground", "first", "second", "third"];
    const [floor, setFloor] = useState("ground");
    const [open, setOpen] = useState(false);
    const getShops = async () => {
        return await client.records.getList(
            "shops",
            1,
            50,
            {
                filter: ` floor ~ "${floor}" `,
                expand: "tenant",
            }
        );
    };

    const shopsQuery = useQuery(["shops", floor], getShops);

    if (shopsQuery.error) {

        return (
            <div className="w-full h-full flex flex-wrap  text-red-900">
                {/* @ts-ignore */}
                ERROR LOADING SHOPS {shopsQuery.error.message}
            </div>);
    }

    if (shopsQuery.isLoading) {
        return <div className="w-full h-full flex-center"> loading ..... </div>;
    }
    
    const data = shopsQuery.data?.items 

return (
    <div className="w-full h-full flex-col text-white">
        <div className="right-0 left-0 flex flex-wrap h-[10%]w-full ">
            <div className="fixed flex h-[10%] w-full mx-1 justify-center ">
                {floors.map((afloor, index) => (
                    <ShopFloor
                        floor={afloor}
                        setFloor={setFloor}
                        key={index}
                       current={floor}
                    />
                ))}
            </div>
        </div>

        {open ? <div

            className="fixed z-40 h-full w-full bg-slate-400 bg-opacity-50 ">
            <div className="fixed z-50  ">
                <IconContext.Provider value={{ size: "50px", className: "text-slate-600" }} >
                    <FaTimes onClick={() => setOpen(false)} /></IconContext.Provider>
            </div>
            {/* @ts-ignore */}
            <ShopForm floor={floor} shops={data} open={open} setOpen={setOpen}  />
        </div> : null}



        <div className="flex-center  w-full  m-2 mt-14 flex-wrap">
            <AddShopCard open={open} setOpen={setOpen} />
            {/* @ts-ignore */}
            {data?.map((shop, index) => <ShopCard shop={shop} key={index} />)}

        </div>
 </div>
);
}




