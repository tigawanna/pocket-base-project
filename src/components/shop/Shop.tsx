import { User } from "firebase/auth";
import React, { useState } from "react";
import { ShopDetails } from "./ShopParts";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { query, collection, orderBy } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useLocation } from "react-router-dom";
import { Payment, Shop as ShopType } from "../../utils/other/types";
import { useNavigate } from "react-router-dom";
// import { TheTable } from "table-for-react";
import { header } from "../../utils/shop-table-yars";
import { IconContext } from "react-icons";
import { FaRegEdit, FaPrint, FaTimes } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { setPayment,deletePayment, dummy_g01, get_dummy_shop_payment,
   formatTyme } from "../../utils/sharedutils";
import { getmonth, handleChange, handleSubmit } from './../../utils/paymentutils';
import { SharedPaymentForm } from "../Shared/SharedPaymentForm";
import { useQueryClient} from 'react-query';
import { insert_dummy_to_cache} from './../../utils/sharedutils';
import useMeasure from "react-use-measure";
import { TheTable } from "../../table";



interface ShopProps {
  user?: User | null;
  floor: string;
  shopId: string;
}

export const Shop: React.FC<ShopProps> = ({ user }) => {
  const { state } = useLocation();
  const shop = state as ShopType;

  console.log("shop == ",shop)
  const queryClient = useQueryClient();
  const [formopen, setFormOpen] = useState(false);
  const [input, setInput] = useState<Payment>({
    date: new Date(),
    shopnumber: shop.shopnumber,
    payment: 1000,
    paymentId: "",
    madeBy: "",
    month: getmonth,
    paymentmode: "cash_deposit",
  });

  const [update, setUpdate] = useState(false);
  const [error, setError] = useState({ name: "", error: "" });

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [mainH, setMainH] = useState(window?.innerHeight ?? 0);
  const [ref, top] = useMeasure();

  // console.log(top.height,top.width)
  // console.log("ration === > ",top.width/top.height);
  // console.log("top percentage === ",topHeight,bottomHeight)
  // const axis = () => {
  //   return 0;
  // };

  const topHeight = (top.height / mainH) * 100;
  const bottomHeight = 100 - (topHeight + 12);

  const validate = (prev: Payment, current: Payment) => {
    if (current.payment < 1000) {
      setError({ name: "payment", error: "payment seems too low, 1k minimun" });
      return false;
    }

    setError({ name: "", error: "" });
    return true;
  };

  const saveChanges = (prev: Payment, current: Payment) => {
    // console.log("saving ...", current);
   const item: Payment = {
      date: current.date,
      shopnumber: current.shopnumber.toUpperCase(),
      madeBy: current.madeBy,
      month: current.month,
      payment: current.payment,
      paymentmode: current.paymentmode,
      paymentId: current.paymentId,
      editedBy: user?.displayName,
      editedOn: new Date(),
    };
    setPayment(
      item,
      current.paymentId,
      shop.shopfloor,
      shop.shopnumber,
      queryClient
    );
  };

  const deleteRow = (current: any) => {
    // console.log("delteing current ,",current)
    deletePayment(current, shop.shopfloor, shop.shopnumber, queryClient);
  };

  const floor = shop.shopfloor;

  const handleTheChange = (e: any) => {
    handleChange({ e, input, setInput });
  };

  const handleTheSubmit = async (e: any) => {
    handleSubmit({
      e,
      input,
      floor,
      user,
      error,
      setError,
      open,
      setOpen,
      formopen,
      setFormOpen,
      queryClient,
    });
  };

  const clearError = () => {
    setError({ name: "", error: "" });
  };

  const paymentRef = query(
    collection(
      db,
      "shops",
      shop?.shopfloor,
      "shops",
      shop?.shopnumber,
      "paymenthistory"
    ),
    orderBy("date", "desc")
  );

  // console.log("shop payment dapenadncies ===== ",shop)

  const paymentQuery = useFirestoreQueryData(
    ["payment", shop?.shopfloor, shop?.shopnumber],
    paymentRef
  );

  const payments = paymentQuery.data as Payment[];

  //  if(!payments && shop.shopnumber && shop.shopfloor === "ground"){
  //   insert_dummy_to_cache(get_dummy_shop_payment(shop.shopnumber),
  //   ["payment", shop?.shopfloor, shop?.shopnumber],queryClient)
  //  }

  if (paymentQuery.error) {
    return (
      <div className="w-full h-full flex flex-wrap  text-red-900">
        ERROR LOADING payments {paymentQuery.error.message}
      </div>
    );
  }

  if (paymentQuery.isLoading) {
    return <div className="w-full h-full flex-center"> loading ..... </div>;
  }

  // console.log("shop payments === ",payments);

  return (
    <div className=" w-full h-full flex flex-col justify-between overflow-y-hidden ">
      <div ref={ref} className="h-fit fixed top-[10%] w-full">
        <div className="h-full w-full py-3 flex-wrap flex-center  z-40 bg-slate-700 text-white">
          <div className="mx-1 font-bold border border-white px-1">
            {shop.shopname}
          </div>
          <div className="mx-1 font-bold border-white px-1">
            {shop.shopnumber}
          </div>
          <div className="mx-1 font-bold border border-white px-1">
            {" "}
            {shop.shopfloor}
          </div>
          <div
            className="mx-2 w-[95%] md:w-fit p-2  
          flex-center rounded-xl bg-slate-900"
          >
            <IconContext.Provider
              value={{
                size: "25px",
                className: "mx-[15px] text-white hover:text-purple-600",
              }}
            >
              <FaRegEdit onClick={() => setUpdate(!update)} />
              {!formopen ? (
                <FaPlus onClick={() => setFormOpen(!formopen)} />
              ) : (
                <FaTimes onClick={() => setFormOpen(!formopen)} />
              )}
              <FaPrint
                onClick={() =>
                  navigate("/print-preview", {
                    state: {
                      rows: payments,
                      header,
                      title: `${payments[0].month} payments for ${shop.shopname}`,
                    },
                  })
                }
              />
            </IconContext.Provider>
          </div>
          <div className="mx-1 font-bold">
            {" "}
            {shop.monthlyrent.toLocaleString()}
          </div>
          <div className="mx-1 font-bold border border-white px-1">
            {" "}
            {formatTyme(shop.date)}
          </div>
          <div className="mx-1 font-bold  px-1">
            {""}
            {shop.shoparrears}
          </div>
        </div>
      </div>

      {formopen ? (
        <SharedPaymentForm
          formopen={formopen}
          input={input}
          setFormOpen={setFormOpen}
          handleChange={handleTheChange}
          handleSubmit={handleTheSubmit}
          error={error}
        />
      ) : null}

      <div
        style={{
          // top: `${top.height + 66}px`,
          height: `${bottomHeight}%`,
          bottom: "0px",
        }}
        className="absolute  w-[95%]  overflow-y-scroll left-[2%] right-[2%]
        scrollbar-thin scrollbar-thumb-purple-400"
      >
        <TheTable
          rows={payments}
          header={header}
          error={error}
          sort={false}
          update={update}
          validate={validate}
          saveChanges={saveChanges}
          deleteRow={deleteRow}
          clearError={clearError}
        />
        <div className="p-2 m-2 min-w-20"></div>
      </div>
    </div>
  );
};
