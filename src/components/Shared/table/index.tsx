import React,{useEffect, useState} from 'react'


import { useCountdownTimer } from 'use-countdown-timer';
import { FaSortDown, FaSortUp } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import { mainRow } from './components/tableparts/tableRows';
import { UndoModal } from './components/tableparts/UndoModal';
import { tymeToDate } from './components/TheTable/utils/utils';
import { Header, Tyme } from './components/TheTable/utils/types';


export interface TheTableProps {
  rows?:any[]
  header:Header[]

  //optional props use ?. for fuctions before invoking them 
  update?:boolean
  sort?:boolean
  error?:{name:string,error:string}
  validate?: (prev: any, current: any) => boolean
  saveChanges?: (prev: any, current: any) => void
  deleteRow?: (current: any) => void
  clearError?: () => void
  }

  
  
  export const TheTable: React.FC<TheTableProps> = (
  {
    rows,
    error,
    update=false,
    sort=false,
    header,
    validate,
    saveChanges,
    deleteRow,
    clearError
  }
   ) => {
  
  const [data, setData] = useState<any>(rows);
  const [editIdx, setEditIdx] = useState(-1);
  const [before, setBefore] = useState<any>({});
  const [input, setInput] = useState<any>();
  
  //refresh the data if another row is added/removed
  useEffect(() => { setData(rows)}, [rows])

  const { countdown, start,reset} = useCountdownTimer({timer: 1000 * 5,resetOnExpire:true});
  
   const handleSortAsc = (field:any) => {
    function compare(a:any, b:any) {
      if (typeof a === "number") {
        //@ts-ignore
        return a[field] - b[field];
      } else {
        if (a[field] > b[field]) {
          return 1;
        }
        if (b[field] > a[field]) {
          return -1;
        }
        return 0;
      }
    }
    const sorted = data.sort(compare);
    setData([...sorted]);
  };
  const handleSortDesc = (field:any) => {
    function compare(a:any, b:any) {
      if (typeof a === "number") {
          //@ts-ignore
        return b[field] - a[field];
      } else {
        if (b[field] > a[field]) {
          return 1;
        }
        if (a[field] > b[field]) {
          return -1;
        }
        return 0;
      }
    }
  
    const sorted = data.sort(compare);
    setData([...sorted]);
  };
  
   //@ts-ignore
   const handleChange = (e, item) => {
     const { value } = e.target;
  
     setInput({
       ...input,
       [e.target.id]: value
  
     });
   };
  
   //convert row from td cell to input to start editing
   const startEditing = (index: number,item:any) => {
     if (index === -23) {
       setEditIdx(-23);
     } else {
       setEditIdx(index);
     }
     for(const i in item){
      //@ts-ignore
     if(item[i].seconds){
     item[i]=tymeToDate(item[i] as Tyme)
     }
  
     }
     setInput(item)
     setBefore(item)
  // //copy the row selected to before to compare to changes in input
  //  data?.map((row:any, j:number) => (j === index ? setBefore(row) : row));
  //  data?.map((row:any, j:number) => (j === index ? setInput(row) : row));
  
  };
  
   const removeItem = (index: number) => {
     if (index === -69) {
       setEditIdx(-1);
     } else {
       setEditIdx(-1);
       deleteRow?.(input)
       clearError?.()
       data?.splice(index, 1);
       start()
     }
   };
   //restore item to the top of the list
   const undoRemove = () => {
     reset()
     data?.unshift(input);
   };
  
   //save the edits to db
   const stopEditing = async (index: number) => {
      if(validate?.(before,input)){
       data?.splice(index, 1,input);
      setEditIdx(-1);
      saveChanges?.(before,input)
     
     }
   }
  
      //save the edits to db
   const cancelEdit =  (index: number) => {
  
     if (index === -69) {
        setEditIdx(-1);
        clearError?.()
      } else {
        setEditIdx(-1);
        clearError?.()
      }
  
   };
  
  
  return (
    <div className="w-full h-full relative top-0">
      <div className="h-fit">
        <table border={1} className="table-auto w-full ">
          <thead className="w-screen sticky top-0 ">
            <IconContext.Provider
              value={{
                size: "20px",
                className:
                  "text-white m-0 p-0 flex-center hover:bg-purple-700 hover:rounded-sm",
              }}
            >
              <tr>
                {header &&
                  header.map((x, i) => {
                    return (
                      <td
                        key={x.name + i}
                        className="bg-slate-900 p-2 text-white  border"
                      >
                        <div className="flex justify-center items-center w-full bg-slate-900 h-full">
                          <div className="flex font-semibold">{x.name}</div>
                          {sort ? (
                            <div className="flex flex-col ml-1 h-[60%] ">
                              <FaSortUp onClick={() => handleSortAsc(x.prop)} />
                              <FaSortDown
                                onClick={() => handleSortDesc(x.prop)}
                              />
                            </div>
                          ) : null}
                        </div>
                      </td>
                    );
                  })}
                {update ? (
                  <th className=" bg-slate-900 text-white opacity-100">Edit</th>
                ) : null}
              </tr>
            </IconContext.Provider>
          </thead>
          <tbody className="h-full">
            {data &&
              data.map((dataitem: Object, dataindex: number) => {
                // console.log("data item==== ",dataitem)
                return mainRow(
                  dataindex,
                  dataitem,
                  header,
                  handleChange,
                  editIdx,
                  startEditing,
                  stopEditing,
                  removeItem,
                  cancelEdit,
                  input,
                  update,
                  error
                );
              })}
          </tbody>
        </table>
        {/* undo butto to restore removed row after edit */}
        {countdown !== 5000 ? (
          <div
            className="fixed bottom-[10%] right-[10%] rounded-lg w-24 p-2  font-medium 
          hover:bg-purple-800 bg-slate-900"
          >
            <UndoModal undoRemove={undoRemove} countdown={countdown} />
          </div>
        ) : null}
      </div>
    </div>
  );
  }
  