import React from 'react'
import { UseQueryResult } from '@tanstack/react-query';
import { QueryFnProps, SetInput } from './types';



interface FetchSelectProps {
head:{prop:string,collection:string}
queryFn?: (props: QueryFnProps) => UseQueryResult<any, unknown>
setInput: (props: SetInput) => void
}

export const TheFetchSelect: React.FC<FetchSelectProps> = ({head,queryFn,setInput}) => {
  const args = head.prop.split('.')
  const [keyword, setKeyword] = React.useState({ word:"" })


  let query
 if (queryFn) {
    query = queryFn({ key: head.collection, keyword: keyword.word })
  }

const handleChange = (e:any) => {
  const { value } = e.target;
  setKeyword({ ...keyword, [e.target.id]: value});
};

const finishSearch=(item:any)=>{
  setKeyword({ word: item[args[1]] })
  setInput({item:item.id, item_key:args[0]})
}


const data = query?.data
if (query?.error) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-[80%] h-full flex justify-center items-center  text-red-600 text-sm">
          {/* @ts-ignore */}
          ERROR LOADING  {query.error.message}
        </div>
   
      </div>);
  }

  if (query?.isLoading) {
    return <div className="w-full h-full flex-center"> loading ..... </div>;
  }




return (
 <div className='w-full h-full cursor-pointer flex flex-col items-center justify-center'>
    <label className="font-bold text-white text-md  w-[90%] flex items-start">
      {head.prop}
    </label>
    <input
      className='w-[90%] p-2 m-1 text-white   border border-black 
      dark:border-white h-10 text-base rounded-sm   dark:bg-slate-700'
    id="word"
    autoComplete='off'
    value={keyword.word}
    onChange={handleChange}

    />
  {data?.length < 1 ?
  <div className="w-[70%] h-full cursor-pointer flex flex-col items-center justify-center
    text-sm text-red-400 break-inside-auto
    ">0 results found , try creating the reccord then try again</div>:null
  }
    <div className='w-[90%] border-2 rounded-lg flex flex-wrap items-center justify-center'>
    {data?.map((item:any)=>{
    return (
        <div key={item.id} 
         onClick={()=>finishSearch(item)}
        className="m-1 p-2 border-4 text-white text-center min-w-fit rounded-lg hover:bg-purple-900">
        {item[args[1]]} 
        </div>
      )
    })}
    </div>
 </div>
);
}



