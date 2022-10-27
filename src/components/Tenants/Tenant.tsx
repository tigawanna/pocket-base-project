
import React from 'react'
import { useParams } from 'react-router-dom';
import { useCollection } from '../Shared/hooks/useCollection';
import { useLocation } from 'react-router-dom';
import { User,Admin,Record} from 'pocketbase';
import { CardItems } from '../Shared/Shared/CardItems';
import { TenantType } from "./types";

interface TenantProps {
    user: User | Admin | null
}
type ParamsT = {
  tenantId:string
}
export const Tenant: React.FC<TenantProps> = ({}) => {

const params = useParams<ParamsT>();

const query = useCollection({ key: ["tenants"],rqOptions:{
select: (data) => {
    return data.items.filter((item) => item.id === params.tenantId)
  }
} });

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
const tenant = query?.data as TenantType | undefined

return (
 <div className='w-full min-h-full flex flex-col items-center'>
  {/* @ts-ignore */}
    <CardItems items={makeItems(tenant[0])} 
      parentstyle={`p-4 m-1 flex flex-col border-2
     hover:shadow-slate-600 hover:shadow-lg rounded w-[90%] h-full`}
    />

 </div>
);
}


const makeItems = (tenant?: TenantType): CardItems[] => {
  return [
    // { value:tenant?.id , name: "id", type: "string", style: "p-1 text-xl font-bold w-full" },
    {
      value: tenant?.name,
      name: "name",
      type: "with-img",
      style:
        "bg-slate-600  p-2 my-2 rounded-lg w-full h-full flex  items-center ",
      innnerstyle:
        "p-2 m-2   text-5xl capitalize font-semibold truncate",
      image: {
        src: "https://picsum.photos/id/1/100/100",
        style: "h-full w-[30%] rounded-sm",
        height: 200,
        width: 200,
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
