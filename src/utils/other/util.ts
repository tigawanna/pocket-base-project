import dayjs  from 'dayjs';
import { tyme } from './types';
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);



export const formatTyme =(time?:any)=>{
  if (time?.nanoseconds && time?.seconds) {
    const ty = new Date(
      //@ts-ignore
      time.seconds * 1000 + time.nanoseconds / 1000000
    );
    return dayjs(ty).format("DD/MM/YYYY");
  }  
  if (time && Object.prototype.toString.call(time) === "[object Date]" &&!isNaN(time))
  {
    return dayjs(time).format("DD/MM/YYYY");
  }

  return dayjs(new Date()).format("DD/MM/YYYY")
 
}

export const formatRelativeTyme = (time?: tyme) => {
  if (time) {
    const ty = new Date(
      //@ts-ignore
      time.seconds * 1000 + time.nanoseconds / 1000000
    );
    return dayjs(ty).fromNow();
  }

  return dayjs(new Date()).fromNow();
};

export const justTym =(time:tyme|null|undefined)=>{
    if(time){
      const ty= new Date(
          //@ts-ignore
        time.seconds * 1000 + time.nanoseconds / 1000000
      );
   return ty
   }  
   return null
   
  }


  export const findFloor=(shopnumber:string)=>{
  const floormaps=[
   ["G-" ,"ground"],
   ["M1-","first"],
   ["M2-","second"],
   ["M3-","third"],
   ["M4-","fourth"],
   ["M5-","fifth"],
  ]
  let floor="ground"
  for(let i=0; i<floormaps.length; i++){
   if(shopnumber.includes(floormaps[i][0])){
    floor = floormaps[i][1]
    break
   } 
  }
 return floor
  }

  
  

