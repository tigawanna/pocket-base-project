
import { useEffect, useState } from "react";
export const useTimeout=(delay:number|null|undefined)=>{

const [wait,setWait]=useState(true)
const waitTime  = delay?(delay * 1000):undefined
      useEffect(() => {
        const timeoutID = window.setTimeout(() => {
        setWait(false)
        }, waitTime);
        return () => window.clearTimeout(timeoutID);
      }, []);

      return wait
}
