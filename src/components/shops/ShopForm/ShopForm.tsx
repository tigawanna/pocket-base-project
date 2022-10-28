


import React from "react";
import { useState } from "react";
import { NewShopType, Shop, ShopFormError } from "../../../utils/other/types";
import { validate } from "./shopformvalidate";
import dayjs from "dayjs";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from "../../../pocketbase/config";
import { TheFetchSelect } from "../../Shared/Shared/form/TheFetchSelect";







interface ShopFormProps {
  user?:any
  floor: string;
  shops:Shop[]
  open:boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const ShopForm: React.FC<ShopFormProps> = ({ floor,shops,open,setOpen,user}) => {
  // console.log("user in shops  ==== ", user?.displayName);
  const floormap = {
    ground: "G-",
    first: "M1-",
    second: "M2-",
    third: "M3-",
  };
  const queryClient = useQueryClient();
  const {existingShopNo,nextShopNo}=getNextShopNumber(shops)

  const [error, setError] = useState<ShopFormError>({ name: "", message: "" });
  const [input, setInput] = useState<NewShopType>({
   monthlyrent: 10000,
    floor,
     name: "",
    //@ts-ignore
   shopNumber: `${floormap[floor]}${nextShopNo}`,
  tenant:"",
   

  });

  const addShopMutation = useMutation((vars: { coll_name: string, payload:NewShopType }) => {
    return client.records.create(vars.coll_name, vars.payload)
  },)

 
 const handleChange = (e: any) => {
    const { value } = e.target;
    setInput({
      ...input,
      [e.target.id]: value,
    });
  };



  const handleSubmit = async(e: any) => {
    e.preventDefault();

  const item={
   shopNumber:input.shopNumber.toUpperCase(),
   name:input.name.toLowerCase(),
   floor:input.floor.toLowerCase(),
   monthlyrent:input.monthlyrent,
   shopfloor:input.floor.toLowerCase(),
   tenant:input.tenant.toLowerCase(),
   madeBy:user?.displayName,
  }



    // console.log('mutatin done',addShopMutation)

    if (validate({ input, error, setError ,shops})) {
          addShopMutation.mutate({coll_name:"shops",payload:item})
       setOpen(!open)
    }

 };






  return (
    <div className="w-full h-[90%]  flex-center flex-col">
      <form className="w-[90%] h-[80%] md:h-[60%] md:w-[60%] flex-center">
        <div className="w-full h-full  flex-center flex-col bg-slate-500">
          <div className="w-full flex-center flex flex-wrap">
            <div className="w-fit bg-slate-500 p-2 text-black">
              existing shop Nos:
            </div>
            {existingShopNo.map((item, index) => {
              return (
                <div
                  key={index}
                  className="rounded-[50%] min-w-5 min-h-5 m-1 p-2 bg-slate-600 font-bold text-white text-center"
                >
                  {item}
                </div>
              );
            })}
          </div>
          <div className="p-2 w-[95%] flex flex-col flex-center bg-slate-600 rounded-md text-white">
            <label className="text-4xl font-bold capitalize mb-2 w-full ">
              {floor}
            </label>
            <div className="w-full h-full flex sm:flex-row flex-col ">
              {/* shop number */}
              <div className="w-full flex flex-col m-1">
                <label className="text-sm">Shop Number</label>
                <input
                  type="text"
                  placeholder="Shop number"
                  className="p-2 w-[100%]  rounded-md text-black font-semibold"
                  id="shopNumber"
                  onChange={handleChange}
                  value={input.shopNumber}
                />
                {error && error.name === "shopNumber" ? (
                  <div className="shop-form-error">{error.message}</div>
                ) : null}
              </div>

              {/* shop name */}
              <div className="w-full flex flex-col m-1">
                <label className="text-sm">Shop Name</label>
                <input
                  type="text"
                  placeholder="Shop name"
                  className="p-2 w-[100%]  rounded-md text-black font-semibold"
                  id="name"
                  onChange={handleChange}
                  value={input.name}
                />
                {error && error.name === "name" ? (
                  <div className="shop-form-error">{error.message}</div>
                ) : null}
              </div>
            </div>

            <div className="w-full h-full flex sm:flex-row flex-col ">
              {/* monthly rent */}
              <div className="w-full flex flex-col m-1">
                <label className="text-sm">Monthly Rent</label>
                <input
                  type="number"
                  placeholder="monthlyrent"
                  className="p-2  w-[100%]  rounded-md text-black font-semibold"
                  id="monthlyrent"
                  onChange={handleChange}
                  value={input.monthlyrent}
                />
                {error && error.name === "monthlyrent" ? (
                  <div className="shop-form-error">{error.message}</div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="w-full h-full flex flex-col justify-center items-center">
            <label className="text-base font-bold">Monthly Rent</label>
                <TheFetchSelect head={{ collection: "tenants", prop: "tenant.name" }} setInput={setInput} />
               </div>

          <button
            onClick={(e) => handleSubmit(e)}
            className="py-2 px-5 m-2 bg-slate-700 rounded 
             hover:bg-slate-800 capitalize font-medium text-white"
          >
            add
          </button>
        </div>
      </form>
    </div>
  );
};


export const formatTyme = (time?: any) => {
  if (time?.nanoseconds && time?.seconds) {
    const ty = new Date(
      //@ts-ignore
      time.seconds * 1000 + time.nanoseconds / 1000000
    );
    return dayjs(ty).format("DD/MM/YYYY");
  }
  if (
    time &&
    Object.prototype.toString.call(time) === "[object Date]" &&
    !isNaN(time)
  ) {
    return dayjs(time).format("DD/MM/YYYY");
  }

  return dayjs(new Date()).format("DD/MM/YYYY");
};

export const addComma = (figure: number) => {
  return figure.toLocaleString()
}

export const getNextShopNumber = (shops: Shop[]) => {
  //@ts-ignore
  let num: [number] = [0];
  shops.forEach((shop) => {

    if (shop.shopNumber.includes('G')) {
      num.push(parseInt(shop.shopNumber.slice(2, 4)))
    }
    else {
      num.push(parseInt(shop.shopNumber.slice(3, 5)))
    }
  })

  const nextNo = num.reduce(function (p, v) { return (p > v ? p : v); }) + 1
  const nextShopNo = nextNo < 10 ? '0' + nextNo : nextNo
  return { existingShopNo: num, nextShopNo }
}
