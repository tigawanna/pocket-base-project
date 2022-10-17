
import { writeBatch,doc} from 'firebase/firestore';
import { db } from './../firebase/firebaseConfig';
import dayjs from 'dayjs';
import { Payment, tyme, Shop } from './other/types';
import { QueryClient } from 'react-query';


export const getPaymentRef=(paymentId:string)=>{
  return doc(db, "payments",paymentId);
}

export const getShopPaymentRef=(paymentId:string,floor:string,shopNo:string)=>{
  return doc(db, "shops",floor,"shops",shopNo,"paymenthistory",paymentId);  
}


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



  export  const setPayment=(item:Payment,paymentId:string,floor:string,shopNo:string,queryClient:QueryClient)=>{
   const paymentRef = doc(db, "payments",paymentId);
   const shopPaymentRef = doc(db, "shops",floor,"shops",shopNo,"paymenthistory",paymentId);
   const notificationRef = doc(db, "notifications", paymentId);
  //  console.log("item when updating",item)
   //query indexes to manually resolve cache
   const payment_index=["payments",item.month]
   const shoppayment_index =["payment", floor, item.shopnumber]
   const notification_index =["notification"]
    //add payment to the payment collection and the nesyed shop paymenyhistory collection
   const notification = {
     date: new Date(),
     type: item?.editedOn ? "updated payment" : "new payment",
     item,
   }; 
   const batch = writeBatch(db);
   batch.set(paymentRef,item)
   batch.set(shopPaymentRef,item)
   batch.set(notificationRef, notification);
     
   batch.commit().then((stuff)=>{
//    console.log("batch write successful === ",stuff)
    appendtoCache(queryClient, item, payment_index);
    appendtoCache(queryClient, item, shoppayment_index);
    appendtoCache(queryClient, notification, notification_index);
  })
  .catch((stuff) => {
    //   console.log("error writing batch ===", stuff);
    });
  }



  export  const deletePayment=(item:Payment,floor:string,shopNo:string,queryClient:QueryClient)=>{
    const paymentRef = doc(db, "payments",item.paymentId);
    const shopPaymentRef = doc(db, "shops",floor,"shops",shopNo,"paymenthistory",item.paymentId);
    const notificationRef = doc(db, "notifications", item.paymentId);
    const notification_index = ["notification"];
    const notification = {
        date:new Date(),
        type:"deleted payment",
        item,
      };
  //   const payment_index=["payments",item.month]
  //  const shoppayment_index =["payment", floor,item.shopnumber]
    //add payment to the payment collection and the nesyed shop paymenyhistory collection

    const batch = writeBatch(db);
    batch.delete(paymentRef)
    batch.delete(shopPaymentRef)
    batch.set(notificationRef, notification);
     batch
       .commit()
       .then((stuff) => {
        //  console.log("batch delete successful === ", stuff);
        appendtoCache(queryClient, notification, notification_index);
       })
       .catch((stuff) => {
        //  console.log("error deleting batch ===", stuff);
       });

    // removeFromCache(queryClient,item,payment_index)
    // removeFromCache(queryClient,item,shoppayment_index)

   } 





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

  

export const dummy_payment=[
    {
        "date": {
            "seconds": 1657395075,
            "nanoseconds": 417000000
        },
        "paymentmode": "cash",
        "month": "July",
        "paymentId": "M2-04l5ea8kx3second",
        "madeBy": "Grass Peach",
        "payment": "1600",
        "shopnumber": "M2-04"
    },
    {
        "date": {
            "seconds": 1657395052,
            "nanoseconds": 506000000
        },
        "paymentmode": "direct_deposit",
        "month": "July",
        "paymentId": "M1-02l5ea8aqvfirst",
        "madeBy": "Grass Peach",
        "payment": "6400",
        "shopnumber": "M1-02"
    },
    {
        "date": {
            "seconds": 1657395052,
            "nanoseconds": 506000000
        },
        "paymentmode": "direct_deposit",
        "month": "July",
        "paymentId": "M1-02l5ea8633first",
        "madeBy": "Grass Peach",
        "payment": "4400",
        "shopnumber": "M1-02"
    },
    {
        "date": {
            "seconds": 1657395022,
            "nanoseconds": 891000000
        },
        "paymentmode": "cash",
        "month": "July",
        "paymentId": "M1-01l5ea7pdcfirst",
        "madeBy": "Grass Peach",
        "payment": "9700",
        "shopnumber": "M1-01"
    },
    {
        "date": {
            "seconds": 1657395022,
            "nanoseconds": 891000000
        },
        "paymentmode": "cash",
        "month": "July",
        "paymentId": "M1-01l5ea7h20first",
        "madeBy": "Grass Peach",
        "payment": "1300",
        "shopnumber": "M1-01"
    },
    {
        "date": {
            "seconds": 1657395000,
            "nanoseconds": 874000000
        },
        "paymentmode": "cash",
        "month": "July",
        "paymentId": "M3-03l5ea79bcthird",
        "madeBy": "Grass Peach",
        "payment": "1700",
        "shopnumber": "M3-03"
    },
    {
        "date": {
            "seconds": 1657395000,
            "nanoseconds": 874000000
        },
        "paymentmode": "cash",
        "month": "July",
        "paymentId": "M3-03l5ea734wthird",
        "madeBy": "Grass Peach",
        "payment": "6700",
        "shopnumber": "M3-03"
    },
    {
        "date": {
            "seconds": 1657394980,
            "nanoseconds": 74000000
        },
        "paymentmode": "cheque",
        "month": "July",
        "paymentId": "M3-02l5ea6qqwthird",
        "madeBy": "Grass Peach",
        "payment": "6300",
        "shopnumber": "M3-02"
    },
    {
        "date": {
            "seconds": 1657394980,
            "nanoseconds": 74000000
        },
        "paymentmode": "cash",
        "month": "July",
        "paymentId": "M3-02l5ea6jsothird",
        "madeBy": "Grass Peach",
        "payment": "6000",
        "shopnumber": "M3-02"
    },
    {
        "date": {
            "seconds": 1657394955,
            "nanoseconds": 130000000
        },
        "paymentmode": "cheque",
        "month": "July",
        "paymentId": "M2-01l5ea69mgsecond",
        "madeBy": "Grass Peach",
        "payment": "4500",
        "shopnumber": "M2-01"
    },
    {
        "date": {
            "seconds": 1657394955,
            "nanoseconds": 130000000
        },
        "paymentmode": "cash",
        "month": "July",
        "paymentId": "M2-01l5ea61egsecond",
        "madeBy": "Grass Peach",
        "payment": "4000",
        "shopnumber": "M2-01"
    },
    {
        "date": {
            "seconds": 1657394935,
            "nanoseconds": 699000000
        },
        "paymentmode": "mpesa",
        "month": "July",
        "paymentId": "G-04l5ea5s6oground",
        "madeBy": "Grass Peach",
        "payment": "4600",
        "shopnumber": "G-04"
    },
    {
        "date": {
            "seconds": 1657394935,
            "nanoseconds": 699000000
        },
        "paymentmode": "direct_deposit",
        "month": "July",
        "paymentId": "G-04l5ea5ly8ground",
        "madeBy": "Grass Peach",
        "payment": "6000",
        "shopnumber": "G-04"
    },
    {
        "date": {
            "seconds": 1657394915,
            "nanoseconds": 150000000
        },
        "paymentmode": "mpesa",
        "month": "July",
        "paymentId": "G-03l5ea5ehbground",
        "madeBy": "Grass Peach",
        "payment": "7200",
        "shopnumber": "G-03"
    },
    {
        "date": {
            "seconds": 1657394915,
            "nanoseconds": 150000000
        },
        "paymentmode": "cash",
        "month": "July",
        "paymentId": "G-03l5ea55q0ground",
        "madeBy": "Grass Peach",
        "payment": "12000",
        "shopnumber": "G-03"
    },
    {
        "date": {
            "seconds": 1657394891,
            "nanoseconds": 490000000
        },
        "paymentmode": "cash",
        "month": "July",
        "paymentId": "G-02l5ea4z21ground",
        "madeBy": "Grass Peach",
        "payment": "7000",
        "shopnumber": "G-02"
    },
    {
        "date": {
            "seconds": 1657394891,
            "nanoseconds": 490000000
        },
        "paymentmode": "cash",
        "month": "July",
        "paymentId": "G-02l5ea4swhground",
        "madeBy": "Grass Peach",
        "payment": "8000",
        "shopnumber": "G-02"
    },
    {
        "date": {
            "seconds": 1657394868,
            "nanoseconds": 294000000
        },
        "paymentmode": "cash",
        "month": "July",
        "paymentId": "G-01l5ea4cb5ground",
        "madeBy": "Grass Peach",
        "payment": "7000",
        "shopnumber": "G-01"
    },
    {
        "date": {
            "seconds": 1657394868,
            "nanoseconds": 294000000
        },
        "paymentmode": "cash",
        "month": "July",
        "paymentId": "G-01l5ea473mground",
        "madeBy": "Grass Peach",
        "payment": "5000",
        "shopnumber": "G-01"
    }
]

export const dummy_ground_shops=[
  {
      "monthlyrent": 10000,
      "shopfloor": "ground",
      "shopnumber": "G-01",
      "date": {
          "seconds": 1657394635,
          "nanoseconds": 645000000
      },
      "shopname": "def"
  },
  {
      "date": {
          "seconds": 1657394673,
          "nanoseconds": 296000000
      },
      "shopname": "abc",
      "monthlyrent": 10000,
      "shopfloor": "ground",
      "shopnumber": "G-02"
  },
  {
      "date": {
          "seconds": 1657394715,
          "nanoseconds": 40000000
      },
      "shopname": "happy",
      "monthlyrent": 10000,
      "shopfloor": "ground",
      "shopnumber": "G-03"
  },
  {
      "date": {
          "seconds": 1657394723,
          "nanoseconds": 369000000
      },
      "shopname": "left",
      "monthlyrent": 10000,
      "shopfloor": "ground",
      "shopnumber": "G-04"
  }
]

export const dummy_first_shops=[
  {
      "date": {
          "seconds": 1657394729,
          "nanoseconds": 460000000
      },
      "shopname": "leafy",
      "monthlyrent": 10000,
      "shopfloor": "first",
      "shopnumber": "M1-01"
  },
  {
      "date": {
          "seconds": 1657394734,
          "nanoseconds": 363000000
      },
      "shopname": "leg",
      "monthlyrent": 10000,
      "shopfloor": "first",
      "shopnumber": "M1-02"
  },
  {
      "date": {
          "seconds": 1657394742,
          "nanoseconds": 421000000
      },
      "shopname": "peak",
      "monthlyrent": 10000,
      "shopfloor": "first",
      "shopnumber": "M1-03"
  },
  {
      "date": {
          "seconds": 1657394747,
          "nanoseconds": 227000000
      },
      "shopname": "snowy",
      "monthlyrent": 10000,
      "shopfloor": "first",
      "shopnumber": "M1-04"
  }
]

export const  dummy_second_shops=[
  {
      "date": {
          "seconds": 1657394753,
          "nanoseconds": 631000000
      },
      "shopname": "top",
      "monthlyrent": 10000,
      "shopfloor": "second",
      "shopnumber": "M2-01"
  },
  {
      "date": {
          "seconds": 1657394757,
          "nanoseconds": 771000000
      },
      "shopname": "blue",
      "monthlyrent": 10000,
      "shopfloor": "second",
      "shopnumber": "M2-02"
  },
  {
      "date": {
          "seconds": 1657394762,
          "nanoseconds": 491000000
      },
      "shopname": "summer",
      "monthlyrent": 10000,
      "shopfloor": "second",
      "shopnumber": "M2-03"
  },
  {
      "date": {
          "seconds": 1657394767,
          "nanoseconds": 315000000
      },
      "shopname": "walker",
      "monthlyrent": 10000,
      "shopfloor": "second",
      "shopnumber": "M2-04"
  }
]

export const dummy_third_shops=[
  {
      "date": {
          "seconds": 1657394774,
          "nanoseconds": 139000000
      },
      "shopname": "harry",
      "monthlyrent": 10000,
      "shopfloor": "third",
      "shopnumber": "M3-01"
  },
  {
      "date": {
          "seconds": 1657394779,
          "nanoseconds": 115000000
      },
      "shopname": "leo",
      "monthlyrent": "14500",
      "shopfloor": "third",
      "shopnumber": "M3-02"
  },
  {
      "date": {
          "seconds": 1657394788,
          "nanoseconds": 899000000
      },
      "shopname": "huko",
      "monthlyrent": "15000",
      "shopfloor": "third",
      "shopnumber": "M3-03"
  },
  {
      "date": {
          "seconds": 1657394801,
          "nanoseconds": 650000000
      },
      "shopname": "kule",
      "monthlyrent": "16000",
      "shopfloor": "third",
      "shopnumber": "M3-04"
  }
]


export const dummy_g01=[

  {
      "date": {
          "seconds": 1657394980,
          "nanoseconds": 74000000
      },
      "paymentmode": "cash",
      "month": "July",
      "paymentId": "M3-02l5ea6jsothird",
      "madeBy": "Grass Peach",
      "payment": "6000",
      "shopnumber": "G-02"
  },
  {
      "date": {
          "seconds": 1657394955,
          "nanoseconds": 130000000
      },
      "paymentmode": "cheque",
      "month": "July",
      "paymentId": "M2-01l5ea69mgsecond",
      "madeBy": "Grass Peach",
      "payment": "4500",
      "shopnumber": "G-01"
  },



  {
      "date": {
          "seconds": 1657394868,
          "nanoseconds": 294000000
      },
      "paymentmode": "cash",
      "month": "July",
      "paymentId": "G-01l5ea4cb5ground",
      "madeBy": "Grass Peach",
      "payment": "7000",
      "shopnumber": "G-01"
  },
  {
      "date": {
          "seconds": 1657394868,
          "nanoseconds": 294000000
      },
      "paymentmode": "cash",
      "month": "July",
      "paymentId": "G-01l5ea473mground",
      "madeBy": "Grass Peach",
      "payment": "5000",
      "shopnumber": "G-01"
  }
]

export const dummy_g02=[
  {
    "date": {
        "seconds": 1657394891,
        "nanoseconds": 490000000
    },
    "paymentmode": "cash",
    "month": "July",
    "paymentId": "G-02l5ea4z21ground",
    "madeBy": "Grass Peach",
    "payment": "7000",
    "shopnumber": "G-02"
},
{
    "date": {
        "seconds": 1657394891,
        "nanoseconds": 490000000
    },
    "paymentmode": "cash",
    "month": "July",
    "paymentId": "G-02l5ea4swhground",
    "madeBy": "Grass Peach",
    "payment": "8000",
    "shopnumber": "G-02"
}
]

export const dummy_g03=[
  {
    "date": {
        "seconds": 1657394891,
        "nanoseconds": 490000000
    },
    "paymentmode": "cash",
    "month": "July",
    "paymentId": "G-02l5ea4z21ground",
    "madeBy": "Grass Peach",
    "payment": "7000",
    "shopnumber": "G-03"
},
{
    "date": {
        "seconds": 1657394891,
        "nanoseconds": 490000000
    },
    "paymentmode": "cash",
    "month": "July",
    "paymentId": "G-02l5ea4swhground",
    "madeBy": "Grass Peach",
    "payment": "8000",
    "shopnumber": "G-03"
}
]

export const dummy_g04=[
  {
    "date": {
        "seconds": 1657394891,
        "nanoseconds": 490000000
    },
    "paymentmode": "cash",
    "month": "July",
    "paymentId": "G-02l5ea4z21ground",
    "madeBy": "Grass Peach",
    "payment": "7000",
    "shopnumber": "G-04"
},
{
    "date": {
        "seconds": 1657394891,
        "nanoseconds": 490000000
    },
    "paymentmode": "cash",
    "month": "July",
    "paymentId": "G-02l5ea4swhground",
    "madeBy": "Grass Peach",
    "payment": "8000",
    "shopnumber": "G-04"
}
]


export const get_dummy_shop_payment =(shopnumber:string)=>{
if(shopnumber === "G-01"){
  return dummy_g01
}
if(shopnumber === "G-02"){
  return dummy_g02
}
if(shopnumber === "G-03"){
  return dummy_g03
}
if(shopnumber === "G-04"){
  return dummy_g04
}
}
