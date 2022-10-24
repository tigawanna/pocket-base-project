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
setInput: React.Dispatch<any>
selectInput:any
setSelectInput:any
}

export const TableSelect: React.FC<TableSelectProps> = ({head,item,input,initval,setInput,
  selectInput,setSelectInput}) => {
  const args = head.prop.split('.')
  // console.log("select input ===== ",selectInput)
  const [keyword, setKeyword] = React.useState({ word: selectInput[`${args[0]}`][args[1]] })
  const [doSearch,setDosearch]=React.useState(false)

 React.useEffect(()=>{
  //  setSelectInput({ shop: item })
   setKeyword({ word: selectInput[`${args[0]}`][args[1]] })

 },[selectInput])

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
  setSelectInput({shop:item})

}

const data = fieldQuery.data
// console.log("input === ",input)
// console.log("item ===== ",head)
// console.log("select input === ",selectInput[`${args[0]}`])
return (
 <div className='w-full h-full relative cursor-pointer'>
    <input
    className='text-center'
    id="word"
    value={keyword.word}
    onChange={handleChange}
    onInput={()=>setDosearch(true)}
    />
    <div className='absolute w-[100%] bg-slate-700'>
    {doSearch&&data?.map((item)=>{

      return (
        <div key={item.id} 
        onClick={()=>finishSearch(item)}
        className="m-[1px] border-2">
          {item[args[1]]}
        </div>
      )
    })}
    </div>
 </div>
);
}



