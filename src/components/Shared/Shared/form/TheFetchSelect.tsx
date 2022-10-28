import React from 'react'
import { UseQueryResult } from '@tanstack/react-query';
import { QueryFnProps } from './types';



interface FetchSelectProps {
head:{prop:string,collection:string}
  queryFn?: (props: QueryFnProps) => UseQueryResult<any, unknown>
}

export const TheFetchSelect: React.FC<FetchSelectProps> = ({head,queryFn}) => {
  const args = head.prop.split('.')
  // console.log("select input ===== ",selectInput)
  const [keyword, setKeyword] = React.useState({ word:"" })
  const [doSearch,setDosearch]=React.useState(false)

//  React.useEffect(()=>{
//    setKeyword({ word: selectInput[`${args[0]}`][args[1]] })
//   },[selectInput])

const handleChange = (e:any) => {
  const { value } = e.target;
  setKeyword({ ...keyword, [e.target.id]: value});
};

const finishSearch=(item:any)=>{
  setDosearch(false)
  setKeyword({ word: item[args[1]] })

  // setInput((prev:any)=>{
  //   prev[args[0]] = item.id
  //   return prev
  // })

  // setInput({ item: keyword.word, item_key:args[0] })

}
let query
if(queryFn){
  query = queryFn({ key: args[0], keyword: keyword.word })
}
const data = query?.data

  if (query?.error) {
    return (
      <div className="w-full h-full flex flex-wrap  text-red-900">
        {/* @ts-ignore */}
        ERROR LOADING  {query.error.message}
      </div>);
  }

  if (query?.isLoading) {
    return <div className="w-full h-full flex-center"> loading ..... </div>;
  }




return (
 <div className='w-full h-full cursor-pointer flex flex-col items-center justify-center'>
    <label className="font-bold text-md  w-[90%] flex items-start">
      {head.prop}
    </label>
    <input
    className='text-center w-[90%] p-1'
    id="word"
    autoComplete='off'
    value={keyword.word}
    onChange={handleChange}
    onInput={()=>setDosearch(true)}
    />
  {data?.length < 1 ?
  <div className="w-[70%] h-full cursor-pointer flex flex-col items-center justify-center
    text-sm text-red-400 break-inside-auto
    ">0 results found , try creating the reccord then try again</div>:null
  }
    <div className='w-[90%] border-2 rounded-lg flex flex-wrap items-center justify-center'>
    {doSearch&&data?.map((item:any)=>{
    return (
        <div key={item.id} 
         onClick={()=>finishSearch(item)}
        className="m-1 p-2 border-4  text-center min-w-fit rounded-lg hover:bg-purple-900">
        {item[args[1]]} 
        </div>
      )
    })}
    </div>
 </div>
);
}



