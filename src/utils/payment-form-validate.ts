import { Payment } from "./other/types";


interface PaymentValidation{
 input:Payment
 error:{name: string; error: string}
 setError: React.Dispatch<React.SetStateAction<{name: string; error: string}>>
}
export interface PaymentFormError{
    error:{name: string; error: string}
    setError: React.Dispatch<React.SetStateAction<{name: string; error: string}>>
}

export const paymentValidation = ({ input, error, setError}:PaymentValidation) => {

// console.log("input",input)
    const shopPattern=/^[G]-\d{2}$|^[M]\d{1}-\d{2}$/g
      
        // checks if shopnumber matches patter G-00/99 or M1/M9-00/99 ,ex , M2-09 G-80 M1-99 G-01
        if(!shopPattern.test(input.shopnumber.toUpperCase())) {
          setError({ name: "shopno", error: "invalid shop number pattern" });
          // console.log("inside g test value",shopPattern.test(input.shopnumber.toUpperCase()))
          return false;
        }
    
    
 
        //least rent is 10,000
        if (input.payment<1000) {
            setError({ name: "payment", error: "shop payment seems too low,minimun 1k" });
            return false;
        }
    
    
        //no error
    
        setError({ name: "", error: "" });
        return true;
      };  
    