import React from 'react'
import { Shop } from '../../utils/other/types';
import { formatTyme } from './../../utils/sharedutils';

interface ShopWidgetsProps {

}

export const ShopWidgets: React.FC<ShopWidgetsProps> = ({}) => {
return (
 <div className=''>

 </div>
);
}

interface ShopDetailsProps {
shop:Shop
}

export const ShopDetails: React.FC<ShopDetailsProps> = ({shop}) => {

// const total=    
return (
  <div className="w-full h-full bg-slate-400 text-white">
    <div className="w-full h-full  bg-slate-500 flex flex-wrap">
      <div className="w-full  bg-slate-500 p-2  font-bold flex flex-wrap">
        <div className="w-full text-2xl sm:text-3xl font-medium  capitalize">
          {shop.shopname}
        </div>

        <div className="flex-center w-full capitalize bg-red-600">
          <div className="w-full text-2xl sm:text-5xl font-bold p-5 ">
            {shop.shopnumber}
          </div>

          <div className="bg-slate-700 m-1 p-1 sm:text-xl">
            {shop.shopfloor}
          </div>
          <div className="bg-slate-700 m-1 p-1 sm:text-xl">
            {shop.monthlyrent.toLocaleString()}
          </div>
          <div className="bg-slate-700 m-1 p-1 sm:text-xl">
            {formatTyme(shop.date)}
          </div>
        </div>
      </div>

      <div className="w-full h-full flex-center flex-col  bg-slate-600 p-1">
        <div className="shadow-md shadow-white rounded-lg p-1 w-[80%] flex-center ">
          <div className="w-full  text-4xl font-medium text-center ">
            13,500
          </div>
        </div>
      </div>
    </div>
  </div>
);
}


