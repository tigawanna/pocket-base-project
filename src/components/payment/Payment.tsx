import React from "react";
import { client } from "../../pocketbase/config";
import { useQuery } from "react-query";
import { PaymentResponnse } from "../../utils/other/types";
import { Record } from "pocketbase";
import { TheTable } from "../Shared/table";
import useMeasure from "react-use-measure";
import { useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";
import { FaRegEdit, FaPlus, FaTimes, FaPrint } from "react-icons/fa";
import { months, monthindex, getMonthIndex } from "../../utils/paymentutils";

interface PaymentProps {
  user: any;
}
export const header = [
    { name: "PayId", prop: "id", type: "string", editable: true },
    { name: "Created On ", prop: "created", type: "date", editable: true },
    { name: "Updated On", prop: "updated", type: "date", editable: true },
    { name: "Shop number", prop: "shop.shopNumber", type: "@expand", editable: true },
    { name: "Amount", prop: "amount", type: "number", editable: true },
    { name: "Shop name", prop: "shop.name", type: "@expand", editable: true,collection:"shops" },
    
]

export const Payment: React.FC<
  PaymentProps
> = ({}) => {
  const [ref, top] = useMeasure();
  const [mainH, setMainH] = React.useState(
    window?.innerHeight ?? 0
  );
  const totalHeight = mainH - top.height - 70;
  const bottomHeight = totalHeight;
  const navigate = useNavigate();
  const [update, setUpdate] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [month, setMonth] = React.useState<string>(getmonth);

  const selectMonth = (index: number) => {
    setMonth(months[index]);
  };

  const paymentsQuery = useQuery(
    ["payments"],
    getPayments,
    {}
  );
  // console.log("paymentsdata === ", paymentsQuery);
  if (paymentsQuery.error) {
    return (
      <div className="w-full h-full flex flex-wrap  text-red-900">
        {/* @ts-ignore */}
        ERROR LOADING payments{" "}{paymentsQuery.error?.message}
      </div>
    );
  }

  if (paymentsQuery.isLoading) {
    return (
      <div className="w-full h-full flex-center">
        {" "}
        loading .....{" "}
      </div>
    );
  }
  const payments = paymentsQuery.data?.items as
    | PaymentResponnse[]
    | Record[];

  return (
    <div className="w-full h-full flex-center">
      <div
        ref={ref}
        className="h-fit w-full bg-slate-400  flex-wrap flex-center fixed top-[60px]
      right-1 left-1 p-1 "
      >
        <div className="h-full w-fit bg-slate-600 p-2  flex-center rounded-xl">
          <IconContext.Provider
            value={{
              size: "25px",
              className:
                "mx-[15px] text-white hover:text-purple-600",
            }}
          >
            <FaRegEdit
              onClick={() => setUpdate(!update)}
            />
            {!open ? (
              <FaPlus
                onClick={() => setOpen(!open)}
              />
            ) : (
              <FaTimes
                onClick={() => setOpen(!open)}
              />
            )}
            <FaPrint
              onClick={() =>
                navigate("/print-preview", {
                  state: {
                    rows: payments,
                    header,
                    title: `payments for ${payments[0]?.created}`,
                  },
                })
              }
            />
          </IconContext.Provider>
        </div>
        <div className="  ml-3 flex-center flex-wrap">
          {/* eslint-disable-next-line array-callback-return */}
          {months.map((item, index) => {
            if (index <= monthindex) {
              return (
                <div
                  style={{
                    backgroundColor:
                      index ===
                      getMonthIndex(month)
                        ? "purple"
                        : "",
                  }}
                  key={index}
                  onClick={() =>
                    selectMonth(index)
                  }
                  className="w-fit m-1 bg-slate-600 hover:bg-purple-700 p-2 text-white 
                  cursor-pointer rounded-lg"
                >
                  {item}
                </div>
              );
            }
          })}
        </div>
      </div>
      <div
        style={{
          // top: `${ratio}%`,
          height: bottomHeight,
          bottom: 0,
        }}
        className="absolute  w-[98%]  overflow-y-scroll  left-[1%] right-[1%] 
         scrollbar-thin scrollbar-thumb-purple-800 "
      >
        <TheTable
          rows={payments}
          header={header}
          update={update}
        />
      </div>
    </div>
  );
};

export const getPayments = async () => {
  return await client.records.getList(
    "payments",
    1,
    50,
    {
      filter: 'created >= "2022-01-01"',
      expand: "shop",
    }
  );
};



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
export const getmonth = month[d.getMonth()];
