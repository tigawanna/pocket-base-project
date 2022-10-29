import dayjs from "dayjs";
import React from "react";
import { useNavigate } from "react-router-dom";

export interface CardItems{
    name: string;
    value: any;
    type: string;

    style: string;
    innnerstyle ?: string
    image ?: { src: string, style?: string, height: number, width: number }
}

interface CardItemsProps {
  navto?: { url: string; state?: any };
  items:CardItems[];
  parentstyle?: string;
}

export const CardItems: React.FC<
  CardItemsProps
> = ({ navto, items,parentstyle }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() =>
        {
        if (navto?.url){ 
          navigate(navto?.url as string, {
          state: navto?.state,
        })}
      }
      }
    className={parentstyle ? parentstyle : `p-4 m-1 flex flex-wrap bg-slate-500 text-white
     hover:shadow-slate-600 hover:shadow-lg rounded w-[90%] md:w-[30%] h-full`}
    >
      {items?.map((item, index) => {

        if (item.type === "date") {
          return (
            <div className={item.style} key={index + item.name}>
              {item.name}:{" "}
              {dayjs(item.value).format(
                "DD/MM/YYYY"
              )}
            </div>
          );
        }
          if (item.type === "with-img") {
              return (
                  <div className={item.style} key={index + item.value}>
                      <img
                
                      className={item?.image?.style} 
                    src={item?.image?.src} alt=" " 
                      height={100}
                      width={100}
                      />
                      <div className={item?.innnerstyle }>
                          {item.value}
                      </div>
                  </div>
              );
          }

        return (
            <div className={item.style} key={index + item.name}>
            {item.value}
          </div>
        );
      })}
    </div>
  );
};
