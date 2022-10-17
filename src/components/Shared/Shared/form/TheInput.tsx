import React from 'react'
import { FormOptions } from '../../../App';

interface TheInputProps {
  handleChange(event: React.ChangeEvent<HTMLInputElement>): Promise<void>;
  item: FormOptions
  input: { name: string };
  error: {
    name: string;
    message: string;
  };
 }

export const TheInput: React.FC<TheInputProps> = ({
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

return (
  <div className="flex-col-center  w-full ">
    <label className="font-bold text-md capitalize  w-[80%] flex items-start">
      {item.field_name}
    </label>
    <input
      style={{ borderColor: isError() ? "red" : "" }}
      className="w-[80%] md:w-[80%] p-2 m-1   border border-black dark:border-white h-10 text-base
       rounded-sm   dark:bg-slate-700"
      id={item.field_name}
      type={item.field_type}
      placeholder={"enter " + item.field_name}
      onChange={handleChange}
      autoComplete={"off"}
      // @ts-ignore
      value={input[item.field_name]}
    />
    {isError() ? (
      <div className="text-base  text-red-600">{error.message}</div>
    ) : null}
  </div>
);
}
