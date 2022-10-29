import React from "react";
import dayjs from "dayjs";
import { useMutation, useQueryClient} from '@tanstack/react-query';
import { User,Admin } from "pocketbase";
import { NewShopType, Shop } from "../../utils/other/types";
import { client } from "../../pocketbase/config";
import { useCollection } from "../Shared/hooks/useCollection";
import TheForm from "../Shared/Shared/form/TheForm";
import { QueryFnProps, FormOptions } from "../Shared/Shared/form/types";
import { validate } from "./paymentformvalidate";

export interface NewPayment {
  amount: number;
  madeBy: string
  shop: string
  deletedAt?: string
  deletedBy?: string
  updatedBy?: string
  updatedAt?: string
}

export interface ValidatePayment{
error:{name:string;error:string}
setError: React.Dispatch<React.SetStateAction<{ name: string; error: string }>>
input:NewPayment
}


interface PaymentFormProps {
  user?:User|Admin|null
  open:boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>

}

export const PaymentForm: React.FC<PaymentFormProps> = ({setOpen}) => {
const queryClient = useQueryClient();
  // console.log("user in shops  ==== ", user?.displayName);
  const floormap = {
    ground: "G-",
    first: "M1-",
    second: "M2-",
    third: "M3-",
  };

  const queryFn = ({key,keyword }: QueryFnProps) => {
    return useCollection({
      key: [key],
      filter: keyword,
      rqOptions: {
        select: (data) => {
          if (keyword !== "") {
            return data.items.filter((item) => item.name.toLowerCase().includes(keyword.toLowerCase()))
          }

          return data.items
        }
      }
    })
  }




  const form_input: FormOptions[] = [
    { field_name: "amount", field_type: "number", default_value: "" },
    { field_name: "createdBy", field_type: "fetchselect", default_value: "", misc: { coll_name: "admins" } },
    { field_name: "shop", field_type: "fetchselect", default_value: "", misc: { coll_name: "shops" } },
 ]



  const addShopMutation =
 
  useMutation((vars: { coll_name: string, payload: NewShopType }) => {
    return client.records.create(vars.coll_name, vars.payload)
  }
  ,
  // {
  //   onMutate: async (newItem) => {
  //     // Cancel any outgoing refetches (so they don't overwrite our optimistic update)

  //     await queryClient.cancelQueries(["payments"]);
  //     // Snapshot the previous value
  //     const previousItems = queryClient.getQueryData(["payments"]);
  //     // Optimistically update to the new value
  //     console.log("previuos   === ", newItem, previousItems)
  //     //@ts-ignore
  //     queryClient.setQueryData(["payments"], (old) => {old.items[newItem.payload.id] = newItem.payload
  //       return old
  //     });
  //     // Return a context object with the snapshotted value
  //     console.log("previuos after edit  === ", previousItems)
  //     return { previousItems };
  //   },
  //   // If the mutation fails, use the context returned from onMutate to roll back
  //   // onError: (err, newTodo, context) => {
  //   //   //@ts-ignore
  //   //   queryClient.setQueryData(["payments"], context.previous);
  //   // },
  //   // // Always refetch after error or success:
  //   onSettled: () => {
  //     queryClient.invalidateQueries(["payments"]);
  //   },
  // }
  
  )



  const handleSubmit = async (data:NewShopType) => {
     addShopMutation.mutate({ coll_name: 'payments', payload: data })
     setOpen(prev=>!prev)
  };

return (
    <div className="w-full h-[90%]  flex flex-col items-center justify-center">
  
      <div className='w-[90%] md:w-[60%] h-[80%] flex items-center justify-center 
       rounded-lg shadow-lg bg-slate-900'>
        <TheForm
          header={"New Payment"}
          fields={form_input}
          submitFn={handleSubmit}
          validate={validate}
          queryFn={queryFn}

        />
      </div>


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





// interface ShopFormProps {

// }

// export const OldShopForm: React.FC<ShopFormProps> = ({}) => {
// return (
//  <div>
//     <form className="w-[90%] h-[80%] md:h-[60%] md:w-[60%] flex-center">
//       <div className="w-full h-full  flex-center flex-col bg-slate-500">

//         <div className="p-2 w-[95%] flex flex-col flex-center bg-slate-600 rounded-md text-white">
//           <label className="text-4xl font-bold capitalize mb-2 w-full ">
//             {/* {floor} */}
//           </label>
//           <div className="w-full h-full flex sm:flex-row flex-col ">
//             {/* shop number */}
//             <div className="w-full flex flex-col m-1">
//               <label className="text-sm">Shop Number</label>
//               <input
//                 type="text"
//                 placeholder="Shop number"
//                 className="p-2 w-[100%]  rounded-md text-black font-semibold"
//                 id="shopNumber"
//                 // onChange={handleChange}
//                 // value={input.shopNumber}
//               />
//               {error && error.name === "shopNumber" ? (
//                 <div className="shop-form-error">{error.message}</div>
//               ) : null}
//             </div>

//             {/* shop name */}
//             <div className="w-full flex flex-col m-1">
//               <label className="text-sm">Shop Name</label>
//               <input
//                 type="text"
//                 placeholder="Shop name"
//                 className="p-2 w-[100%]  rounded-md text-black font-semibold"
//                 id="name"
//                 onChange={handleChange}
//                 value={input.name}
//               />
//               {error && error.name === "name" ? (
//                 <div className="shop-form-error">{error.message}</div>
//               ) : null}
//             </div>
//           </div>

//           <div className="w-full h-full flex sm:flex-row flex-col ">
//             {/* monthly rent */}
//             <div className="w-full flex flex-col m-1">
//               <label className="text-sm">Monthly Rent</label>
//               <input
//                 type="number"
//                 placeholder="monthlyrent"
//                 className="p-2  w-[100%]  rounded-md text-black font-semibold"
//                 id="monthlyrent"
//                 onChange={handleChange}
//                 value={input.monthlyrent}
//               />
//               {error && error.name === "monthlyrent" ? (
//                 <div className="shop-form-error">{error.message}</div>
//               ) : null}
//             </div>
//           </div>
//         </div>
//         <div className="w-full h-full flex flex-col justify-center items-center">
//           <label className="text-base font-bold">Monthly Rent</label>
//           <TheFetchSelect head={{ collection: "tenants", prop: "tenant.name" }} setInput={setInput} />
//         </div>

//         <button
//           onClick={(e) => handleSubmit(e)}
//           className="py-2 px-5 m-2 bg-slate-700 rounded 
//              hover:bg-slate-800 capitalize font-medium text-white"
//         >
//           add
//         </button>
//       </div>
//     </form>
//  </div>
// );
// }
