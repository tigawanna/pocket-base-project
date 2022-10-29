import { Admin, User } from "pocketbase";
import React from "react";
import { AddItemCard } from "../Shared/Shared/AddItemCard";
import { CardItems } from "../Shared/Shared/CardItems";
import { ModalWrapper } from "../Shared/Shared/ModalWrapper";
import { useCollection } from "./../Shared/hooks/useCollection";
import { TenantForm } from "./TenantForm/TenantForm";
import { TenantType } from "./types";

interface TenantsProps {
  user:User|Admin|null;
}

export const Tenants: React.FC<TenantsProps> = ({}) => {
const query = useCollection({key: ["tenants"]});
const [open,setOpen] = React.useState(false)

  if (query.error) {
  return (
      <div className="w-full h-full flex flex-wrap  text-red-900">
        {/* @ts-ignore */}
        ERROR LOADING  {query.error.message}
      </div>);
  }

  if (query.isLoading) {
    return <div className="w-full h-full flex-center"> loading ..... </div>;
  }
 
  const data = query.data?.items as TenantType[]|undefined;

  return (
    <div className="w-full min-h-full ">
      <ModalWrapper open={open} setOpen={setOpen} children={<TenantForm setOpen={setOpen}/>}/>
      <div className="flex-center  w-full  mt-14 flex-wrap ">
        <AddItemCard styles="" action={() => { setOpen(prev => !prev) }} />
        {data?.map((item) => {
          return (
            <CardItems
              items={makeItems(item)}
              navto={{url:`/tenant/${item.id}`,state:item}}
              key={item.id}
              parentstyle={''}
            />
          );
        })}

      </div>
    </div>
  );
};

const makeItems = ( tenant?: TenantType): CardItems[] => {
  const piccy = tenant?.pic ? "http://192.168.0.101:8090/api/files/" + tenant?.["@collectionName"] + "/" + tenant?.id + "/" + tenant?.pic : "https://picsum.photos/id/1/100/100"
    return [
        // { value:tenant?.id , name: "id", type: "string", style: "p-1 text-xl font-bold w-full" },
        {
            value: tenant?.name,
            name: "name",
            type: "with-img",
            style:
                "border-2 p-2 my-2 rounded-lg w-full h-full flex  items-center ",
            innnerstyle:
                "p-2 m-2  text-2xl capitalize truncate",
            image: {
              src:piccy,
                style: "h-20 w-20 rounded-[20%] border-2",
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
