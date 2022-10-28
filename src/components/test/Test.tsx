import { useQuery,useMutation } from '@tanstack/react-query';
import React from 'react'

import { client } from '../../pocketbase/config';
import { PaymentResponnse } from '../../utils/other/types';
import { TheTable } from '../Shared/table';
import { handleSubmit } from './../../utils/paymentutils';

interface TestProps {

}
// id: string
// created: string
// updated: string
// "@collectionId": string
// "@collectionName": string
// "@expand": Expand
// amount: number
// createdBy: string
// deletedAt: string
// deletedBy: string
// shop: string
// updatedBy: string
export const header = [
  { name: "PayId", prop: "id", type: "string", editable: true },
  { name: "Created On ", prop: "created", type: "date", editable: true },
  { name: "Updated On", prop: "updated", type: "date", editable: true },
  { name: "Amount", prop: "amount", type: "number", editable: true },
  { name: "Shop name", prop: "shop.name", type: "expand", editable: true },

]



export const Test: React.FC<TestProps> = ({}) => {
  const [file, setFile] = React.useState("")
  const getPayments = async () => {
  return  await client.records.getList('test', 2, 50, {
      filter: 'created >= "2022-01-01 00:00:00"', expand: "shop"
    });
  };

  const query = useQuery(["test"],getPayments)
  const data = query?.data?.items as PaymentResponnse[] | undefined
  
  const addTenantMutation = useMutation((vars: { coll_name: string, payload: any }) => {
    return client.records.create(vars.coll_name, vars.payload)
  },)


  function handleChange(event:React.ChangeEvent<any>) {
    setFile(event.target.files[0])
  }
   function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
   event.preventDefault()
     const formData = new FormData();
     formData.append('pic', file);
     formData.append('name', "deez nuts");
     formData.append('title', 'Hello world!');
     console.log("file state === ",file)
     console.log("form data ",formData)
     client.records.create('test',formData)
  //  addTenantMutation.mutate({coll_name:"test",payload:{pic:formData}})
   }
  // const record = await client.records.create('test', data);

  if (query.error) {
    return (
      <div className="w-full h-full flex flex-wrap  text-red-900">
        {/*@ts-ignore */}
        ERROR LOADING payments {query.error?.message}
      </div>
    );
  }

  if (query.isLoading) {
    return <div className="w-full h-full flex-center"> loading ..... </div>;
  }

console.log("data === ",data)


return (
<div className=" w-full min-h-screen h-full flex items-center justify-center ">
    <form 
      className='border-4 p-5 m-1 flex-center-col'
    onSubmit={handleSubmit}>
      <h1 className='text-xl font-bold'>React File Upload</h1>
      <input 
      className='border-2 p-2 m-1'
        type="file" 
      onChange={handleChange}/>
      <button 
        className='border-2 p-2 m-1 bg-slate-900 hover:bg-slate-800'
      type="submit">Upload</button>
    </form>
</div>
);
}



