import { NewPayment, ValidatePayment } from "./PaymentForm";

export const validate = ({ input, error, setError}:ValidatePayment) => {
      console.log(
        "validation input ===== ",
        input
      );
   if(input.amount < 1000){
    setError({name:"amount",error:"amount too low 1k min"})
    return false 
   }
       if (input.madeBy === "") {
         setError({
           name: "madeBy",
           error: "madeBy value cannot be empty",
         });
         return false;
       }
        if (input.shop === "") {
               setError({
                 name: "shop",
                 error:
                   "shop value cannot be empty",
               });
               return false;
             }
    setError({name:"",error:""})
    return true 
}
