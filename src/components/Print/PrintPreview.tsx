import { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { PrintThis } from './Printme';
import { FaPrint } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { Admin, User } from 'pocketbase';
interface PrintPreviewTypes{
  user?: User | Admin | null
}
interface TheTableProps {
title:string    
rows:any[]
header:{name:string,prop:string,type:string,editable:boolean}[]
}

export const PrintPreview = ({user}:PrintPreviewTypes) => {
  const componentRef = useRef(null);

  const { state } = useLocation();
  const props=state as TheTableProps
  

  return (
    <div>
      <ReactToPrint

        trigger={() => <button className='p-2 bg-slate-600 text-white fixed top-[12%] left-[50%] z-50'><FaPrint/></button>}
        content={() => componentRef.current}
      />
      <PrintThis
      title={props.title} 
      rows={props.rows}
      header={props.header}
      ref={componentRef} />
    </div>
  );
};
