import React from 'react'

interface ConsentProps {
setOpen: React.Dispatch<React.SetStateAction<boolean>>
message:string
action:any
}

export const Consent: React.FC<ConsentProps> = ({message,action,setOpen}) => {


return (
 <div className='consent-container'>
    <div className='consent-child'>
   <div className='h-full w-full flex flex-col'>
   <div className='h-full w-full flex flex-center text-3xl font-medium'>{message}</div>
   <div className='h-full w-full flex-evenly'>
    <button
      onClick={()=>{action();setOpen(false)}}
        className='consent-button'
    >YES</button>
    
    <button
      onClick={()=>setOpen(false)}  
        className='consent-button text-red-200'
    >NO</button> 
 
   </div>
    </div>
    </div>
 </div>
);
}
