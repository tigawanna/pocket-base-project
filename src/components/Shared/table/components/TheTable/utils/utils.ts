
import dayjs from 'dayjs';
import { Tyme } from './types';

export const tymeToDate =(time?:Tyme)=>{
    if(time){
      const ty= new Date(
          //@ts-ignore
        time.seconds * 1000 + time.nanoseconds / 1000000
      
      );
      return dayjs(ty).format("DD/MM/YYYY")
   }  
  
    return dayjs(new Date()).format("DD/MM/YYYY")
   
  }
  