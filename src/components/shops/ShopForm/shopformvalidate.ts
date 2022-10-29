import { ShopFormValidate } from "../../../utils/other/types";

export const validate = ({ input, error, setError,shops }: ShopFormValidate) => {
  console.log("validation input ===== ",input)
  let i;
  // const shopExists = () => {
  //   let final = false;
  //   for (i = 0; i < shops?.length; i++) {
  //     if (
  //       shops[i].shopNumber.toLowerCase() ===
  //       input.shopNumber.toLowerCase()
  //     ) {
  //       final = true;
  //       setError({
  //         name: "shopNumber",
  //         message: "shop number exists",
  //       });
  //       break;
  //     }
  //     if (
  //       shops[i].name.toLowerCase() ===
  //       input.name.toLowerCase()
  //     ) {
  //       final = true;
  //       setError({
  //         name: "name",
  //         message: "shop name exists",
  //       });
  //       break;
  //     }
  //   }
  //   return final;
  // };

  // console.log("shop exists? ==== ",shopExists())
  // check if the shop name or number already exists
  // if (shopExists()) {
  //   return false;
  // }
  const shopPattern =
    /^[G]-\d{2}$|^[M]\d{1}-\d{2}$/g;

  // checks if shopnumber matches patter G-00/99 or M1/M9-00/99 ,ex , M2-09 G-80 M1-99 G-01
  if (
    !shopPattern.test(
      input.shopNumber.toUpperCase()
    )
  ) {
    setError({
      name: "shopNumber",
      message: "invalid shop number pattern",
    });
    // console.log("inside g test value",shopPattern.test(input.shopnumber.toUpperCase()))
    return false;
  }

  //checks if shop name is empty

  if (input.name === "") {
    setError({
      name: "name",
      message: "shopname field required",
    });
    return false;
  }

  
   if (input.transferedAt === "") {
     setError({
       name: "name",
       message: "shopname field required",
     });
     return false;
   }
    if (input.tenant === "") {
      setError({
        name: "tenant",
        message: "stenant field required",
      });
      return false;
    }
  //checks if shop floor is empty

  if (input.floor === "") {
    setError({
      name: "flooor",
      message: "floor field required",
    });
    return false;
  }
  //rent can.t be negative
  if (input.monthlyrent < 0) {
    setError({
      name: "monthlyrent",
      message: "shop rent can't be negative",
    });
    return false;
  }
  //least rent is 10,000
  if (input.monthlyrent < 10000) {
    setError({
      name: "monthlyrent",
      message:
        "shop rent seems too low,minimun 10k",
    });
    return false;
  }

  //no error

  setError({ name: "", message: "" });
  return true;
};  
    