import React from 'react'
import { IconContext } from 'react-icons';
import { FaPlus } from 'react-icons/fa';

interface AddItemCardProps {
styles?:string
color?:string
size?:string
iconstyle?:string
action?:()=>void
}

export const AddItemCard: React.FC<AddItemCardProps> = (
{styles,size="75px",color,iconstyle="",action=()=>{console.log("click")}}) => {
return (
<div 
onClick={()=>action()}
className={styles ? styles :`p-12 m-1 flex-center bg-slate-500 hover:shadow-slate-600 
hover:shadow-lg rounded w-[90%] md:w-[30%] `}>
<IconContext.Provider value={{ size,color,className:iconstyle}}>
<FaPlus/>    
</IconContext.Provider>
 </div>
);
}
