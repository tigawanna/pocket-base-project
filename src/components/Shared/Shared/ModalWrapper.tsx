import React,{ReactNode} from 'react'
import { FaTimes} from 'react-icons/fa'
import { IconContext } from 'react-icons/lib'

interface ModalWrapperProps {
children:ReactNode
open:boolean
setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalWrapper: React.FC<ModalWrapperProps> = ({children,open,setOpen}) => {

if(!open){
    return null
}
return (
 <div className=' fixed z-50 top-0 w-[100%] h-[100%] bg-slate-400 bg-opacity-50  flex items-center justify-center'>
 <div className="fixed   top-[5%] left-[5%] ">
    <IconContext.Provider value={{ size: "50px", className: "text-slate-900" }} >
    <FaTimes onClick={() => setOpen(false)} /></IconContext.Provider>
</div>


    {children}

</div>
);
}
