import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { client } from '../../../pocketbase/config';





interface FetchSelectProps {
head:{prop:string,collection:string}
setInput: React.Dispatch<any>
}

export const TheFetchSelect: React.FC<FetchSelectProps> = ({head,setInput}) => {
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



  const searchField = async () => {
    return await client.records.getFullList(`${head.collection}`, 5,
      { filter: ` ${args[1]} ~ "${keyword.word}"  `}
    );
  };
const fieldQuery = useQuery(["search",keyword.word], searchField, {
  enabled:doSearch,
  
});

const finishSearch=(item:any)=>{
  setDosearch(false)
  setKeyword({ word: item[args[1]] })
  setInput((prev:any)=>{
    prev[args[0]] = item.id
    return prev
  })

}

const data = fieldQuery.data

return (
 <div className='w-full h-full cursor-pointer flex-center-col'>
    <input
    className='text-center w-[60%] p-1'
    id="word"
    value={keyword.word}
    onChange={handleChange}
    onInput={()=>setDosearch(true)}
    />
    <div className='w-[100%] bg-slate-700 '>
    {doSearch&&data?.map((item)=>{
    return (
        <div key={item.id} 
        onClick={()=>finishSearch(item)}
        className="m-[1px] border-2  text-center">
          {item[args[1]]}
        </div>
      )
    })}
    </div>
 </div>
);
}



