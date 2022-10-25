

import dayjs from 'dayjs';
import { Payment, tyme, Shop } from './other/types';
import { QueryClient } from "@tanstack/react-query";




export const insert_dummy_to_cache=(data:any,index:any[],queryClient:QueryClient)=>{
  queryClient.setQueryData(index,data);
}

const appendtoCache=async(queryClient:QueryClient,newobj:any,index:any[])=>{
  
  // console.log("index for the query === ",index)
  // console.log("new data to append=== ",newobj)

  await queryClient.cancelQueries(index);
  // Snapshot the previous value
  const previous = queryClient.getQueryData(index) as any[]

  // Optimistically update to the new value
   if(previous){
    //since this is being called on create and update , if the dpaymentId
  //exists it's spliced out to avoid duplication in cache

    queryClient.setQueryData(index, (oldobj:any) => {
      // console.log("oldobj === ",oldobj)
      let final =  [...oldobj, newobj]
      for(let i = 0; i<oldobj.length; i++){
        if(oldobj[i].paymentId === newobj.paymentId){
     
         oldobj.splice(i,1,newobj)
         final = oldobj
        //  console.log("oldobj after splice=== ",oldobj)  
         break
        }
      }
      
      return(final)
    });
   
  }
}

// const removeFromCache=async(queryClient:QueryClient,newobj:any,index:any[])=>{
  
//   // console.log("index for the query === ",index)
//   // console.log("new data to append=== ",newobj)

//   await queryClient.cancelQueries(index);
//   // Snapshot the previous value
//   const previous = queryClient.getQueryData(index) as any[]

//   // Optimistically update to the new value
//    if(previous){
//     // console.log("previous data exists === ",previous)

//   //splice out any item in cache with the give payment id on that index 
//   //and return the remaining elements

//     queryClient.setQueryData(index, (oldobj:any) => {
//       // console.log("oldobj === ",oldobj)
//       let final =  [oldobj]
//       for(let i = 0; i<oldobj.length; i++){
//         if(oldobj[i].paymentId === newobj.paymentId){
//          oldobj.splice(i,1)
//          final = oldobj

//          break
//         }
//       }

//       return(final)
//     });
   
//   }
// }












export const formatTyme = (time?: any) => {
  if (time?.nanoseconds && time?.seconds) {
    const ty = new Date(
      //@ts-ignore
      time.seconds * 1000 + time.nanoseconds / 1000000
    );
    return dayjs(ty).format("DD/MM/YYYY");
  }
  if (
    time &&
    Object.prototype.toString.call(time) === "[object Date]" &&
    !isNaN(time)
  ) {
    return dayjs(time).format("DD/MM/YYYY");
  }

  return dayjs(new Date()).format("DD/MM/YYYY");
};




  export const addComma=(figure:number)=>{
    return figure.toLocaleString()
  }



  
export const getNextShopNumber=(shops:Shop[])=>{
    //@ts-ignore
  let num:[number] =[0];  
   shops.forEach((shop)=>{
  
    if(shop.shopnumber.includes('G'))
    {
      num.push(parseInt(shop.shopnumber.slice(2,4)))
    }
    else
    {
      num.push(parseInt(shop.shopnumber.slice(3,5)))
    } 
   })

  const nextNo= num.reduce(function (p, v) {return ( p > v ? p : v );})+1
  const nextShopNo = nextNo<10?'0'+nextNo:nextNo
  return {existingShopNo:num,nextShopNo}
  }

  
