import React from "react";
import { AddItemCard } from "../Shared/Shared/AddItemCard";
import { CardItems } from "../Shared/Shared/CardItems";
import { useCollection } from "./../Shared/hooks/useCollection";
import { TenantType } from "./types";

interface TenantsProps {
  user: any;
}

export const Tenants: React.FC<TenantsProps> = ({}) => {
const query = useCollection({key: ["tenants"]});
const [open,setOpen] = React.useState(false)

  if (query.error) {
  return (
      <div className="w-full h-full flex flex-wrap  text-red-900">
        {/* @ts-ignore */}
        ERROR LOADING SHOPS {shopsQuery.error.message}
      </div>);
  }

  if (query.isLoading) {
    return <div className="w-full h-full flex-center"> loading ..... </div>;
  }

  const data = query.data?.items as TenantType[]|undefined;
 console.log(open)
  return (
    <div className="w-full min-h-full bg-purple-900">
      <div className="flex-center  w-full  m-2 mt-14 flex-wrap">
        {data?.map((item) => {
          return (
            <CardItems
              items={makeItems(item)}
              navto={{url:`/tenant/${item.id}`,state:item}}
              key={item.id}
            />
          );
        })}
        <AddItemCard styles="" action={()=>{setOpen(prev=>!prev)}}/>
      </div>
    </div>
  );
};

const makeItems = ( tenant?: TenantType): CardItems[] => {
    return [
        // { value:tenant?.id , name: "id", type: "string", style: "p-1 text-xl font-bold w-full" },
        {
            value: tenant?.name,
            name: "name",
            type: "with-img",
            style:
                "bg-slate-600  p-2 my-2 rounded-lg w-full h-full flex  items-center ",
            innnerstyle:
                "p-2 m-2   text-xl truncate",
            image: {
                src: "https://picsum.photos/id/1/100/100",
                style: "h-20 w-20 rounded-[50%]",
                height: 100,
                width: 100,
            },
        },
        {
            value: tenant?.email,
            name: "email",
            type: "string",
            style: "font-bold w-full",
        },
        {
            value: tenant?.created,
            name: "created",
            type: "date",
            style: "font-bold",
        },
    ];
};
