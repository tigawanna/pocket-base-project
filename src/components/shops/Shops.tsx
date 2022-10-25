import React, { useState } from 'react'
import { ShopFloor } from './ShopsParts';

interface ShopsProps {
user:any
}

export const Shops: React.FC<ShopsProps> = ({}) => {
 const floors = ["ground", "first", "second", "third"];
    const [floor, setFloor] = useState("ground");
    const [open, setOpen] = useState(false);
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

 </div>
);
}
