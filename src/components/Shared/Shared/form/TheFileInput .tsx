import React from 'react'


interface TheFileInputProps {
  handleChange(event: React.ChangeEvent<HTMLInputElement>): Promise<void>;
  item: any
  input: { name: string };
  error: {
    name: string;
    message: string;
  };
}

export const TheFileInput: React.FC<TheFileInputProps> = ({
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
    <div className="flex flex-col items-center justify-center w-full ">
      <label className="font-bold text-md capitalize  w-[90%] flex items-start">
        {item.field_name}
      </label>
      <input
        style={{ borderColor: isError() ? "red" : "" }}
        className="w-[90%] p-2 m-1   border border-black dark:border-white h-10 text-base
       rounded-sm   dark:bg-slate-700"
        id={item.field_name}
        type={item.field_type}
        placeholder={"enter " + item.field_name}
        onChange={handleChange}
        autoComplete={"off"}
        // @ts-ignore
        // value={input[item.field_name]}
      />
      {/* @ts-ignore */}
      <img src={URL.createObjectURL(input[item.field_name])} 
      className="h-[40%] w-[60%] m-1 rounded-sm"
      />
      {isError() ? (
        <div className="text-base  text-red-600">{error.message}</div>
      ) : null}
    </div>
  );
}
