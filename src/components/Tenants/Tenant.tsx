import React from 'react'
import { useParams } from 'react-router-dom';
import { useCollection } from '../Shared/hooks/useCollection';
import { User,Admin} from 'pocketbase';
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
 <div className='w-full min-h-full flex flex-col items-center '>
  {/* @ts-ignore */}
    <CardItems items={makeItems(tenant[0])} 
      parentstyle={`p-4 m-1 flex flex-col border-2
     hover:shadow-slate-600 hover:shadow-lg rounded w-[90%] h-full bg-slate-500 text-white`}
    />

 </div>
);
}


const makeItems = (tenant?: TenantType): CardItems[] => {
  const piccy = tenant?.pic ? "http://192.168.0.101:8090/api/files/" + tenant?.["@collectionName"] + "/" + tenant?.id + "/" + tenant?.pic : "https://picsum.photos/id/1/100/100"
  return [
    // { value:tenant?.id , name: "id", type: "string", style: "p-1 text-xl font-bold w-full" },
    {
      value: tenant?.name,
      name: "name",
      type: "with-img",
      style:
        `border-2  p-2 my-2 rounded-lg w-full h-full flex flex-col 
        md:flex-row  items-center md:items-center justify-center md:justify-start`,
      innnerstyle:
        "p-2 m-2   text-5xl capitalize font-semibold truncate",
      image: {
        src:piccy, style: "h-full w-[50%] md:w-[30%] rounded-lg border-2",
        height: 200,
        width: 200,
      },
    },
    {
      value: tenant?.email,
      name: "email",
      type: "string",
      style: "text-xl w-full",
    },
    {
      value: tenant?.created,
      name: "created",
      type: "date",
      style: "text-xl",
    },
  ];
};
