interface TabItemProps {
  value: string;
  currTab:string
  count:number
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export const TabItem: React.FC<TabItemProps> = ({value,count,setValue,currTab}) => {
 
return (
<div 
style={{color: value === currTab?'#ba0aff':'',
borderBottomColor: value === currTab?'#ba0aff':'',
borderBottomWidth:'1px'
}}
 onClick={() =>setValue(value)}
 className ='py-1  cursor-pointer text-[12px] md:text-lg font-bold text-mono w-[95%] 
 flex-center md:flex-1 m-[1px] '>
  {value} : {count}
 </div>
);
}
