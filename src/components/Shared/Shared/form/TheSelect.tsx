import React from 'react'
import { FormOptions } from './../../../App';

interface TheSelectProps {
  handleChange(event: React.ChangeEvent<HTMLSelectElement>): Promise<void>;
  input: { name: string };
  item:FormOptions
  error: {
    name: string;
    message: string;
  };
}

export const TheSelect: React.FC<TheSelectProps> = ({
    handleChange,
  error,
  input,
  item

}) => {


const isError = () => {
  if (error.message != "" && error.name === item.field_name) {
    return true;
  }
  return false;
};
const options = item?.options
return (
  <div className="flex-col-center  w-full ">
    <label className="font-bold text-md capitalize  w-[80%] flex items-start">
      {item.field_name}
    </label>
      <select id={item.field_name} onChange={handleChange} 
       className="w-[80%] md:w-[80%] p-2 m-1  border border-black 
        dark:border-white h-10 text-base rounded-sm   dark:bg-slate-700">
          <option value={options&&options[0].value}>Pick a {" "}{item.field_name}</option>
          {
            options&&options.map((opt,index)=>{
            return(
            <option key={opt.name + index} value={opt.value}>
              {opt.name}
            </option>
              )
            })
          }
        </select>

    {isError() ? (
      <div className="text-base  text-red-600">{error.message}</div>
    ) : null}
  </div>
);
}
