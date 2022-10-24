import React from 'react'
import { useQuery } from 'react-query';
import { client } from '../../../../../pocketbase/config';
import { Header } from '../TheTable/utils/types';


interface TableSelectProps {
handleChange:any
head: Header
item:any
input:any
initval: string | number
}

export const TableSelect: React.FC<TableSelectProps> = ({head,item,input,initval}) => {

  const [keyword, setKeyword] = React.useState({ word: initval })
  const handleChange = (e:any) => {
    const { value } = e.target;
    setKeyword({ ...keyword, [e.target.id]: value});
  };
  const args = head.prop.split('.')
  const field = args[0]

  const searchField = async () => {
    return await client.records.getFullList(`${head.collection}`, 5,
      { filter: ` ${args[1]} ~ "${keyword.word}"  `}
    );
  };
const fieldQuery = useQuery(["search",keyword.word], searchField, {});
  const data = fieldQuery.data

  console.log("data === ",data)
return (
 <div className='w-full h-full relative'>
    <input
    className='text-center'
    id="word"
    value={keyword.word}
    onChange={handleChange}
    />
    <div className='absolute w-[100%] bg-slate-700'>
    {data?.map((item)=>{

      return (
        <div key={item.id} className="m-[1px] border-2">
          {item.name} {item.shopNumber}
          </div>
      )
    })}
    </div>
 </div>
);
}



