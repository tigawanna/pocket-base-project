import { Payment } from "./other/types";
import { paymentValidation } from "./payment-form-validate";
import { User } from 'firebase/auth';
import { setPayment } from './sharedutils';
import { QueryClient } from 'react-query';
// var uniqid = require('uniqid')

import uniqid from 'uniqid'


const d = new Date();
let month = [];
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";
export const getmonth= month[d.getMonth()];

export const monthindex=d.getMonth();

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export const minimonths = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

export const monthsmap = {
    "January":0,
    "February":1,
    "March":2,
    "April":3,
    "May":4,
    "June":5,
    "July":6,
    "August":7,
    "September":8,
    "October":9,
    "November":10,
   "December":11
}


export const getMonthIndex=(index:string)=>{
    //@ts-ignore
    return monthsmap[index]
}

export const getMonthName=(dt:Date)=>{
const date = new Date(dt);  // 2009-11-10
return date.toLocaleString('default', { month: 'long' });
}


interface HCHANGE{
e: any 
input:Payment  
setInput: React.Dispatch<React.SetStateAction<Payment>>
}

export const handleChange = ({e,input,setInput}:HCHANGE) => {
  const { value } = e.target;
  setInput({
    ...input,
    [e.target.id]: value,
  });
};

interface HSUBMIT{
  e: any,
  input:Payment,
  floor:string
  user?:User|null
  error:{name:string,error:string}
  setError: React.Dispatch<React.SetStateAction<{ name: string; error: string;}>>
  open:boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  formopen:boolean
  setFormOpen: React.Dispatch<React.SetStateAction<boolean>>
  queryClient: QueryClient

}

export const handleSubmit = async({e,input,floor,user,error,setError,open,setOpen,formopen,setFormOpen,queryClient}:HSUBMIT) => {
e.preventDefault();

const paymentId=uniqid(input.shopnumber,floor)

const item:Payment={
date:input.date,
shopnumber:input.shopnumber.toUpperCase(),
madeBy:user?.displayName,
month:input.month,
payment:input.payment ,
paymentmode:input.paymentmode,
paymentId

}
// console.log("saving ..... ",item)
if (paymentValidation({ input, error, setError })){
 setPayment(item,paymentId,floor,input.shopnumber,queryClient)
 setOpen(!open)
 setFormOpen(!formopen)
}

};
