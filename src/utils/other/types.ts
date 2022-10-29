export interface ShopType {
  "@collectionId"?: string;
  "@collectionName"?: string;
  id?: string;
  created: string;
  updated: string;
  name: string;
  shopNumber: string;
  tenant: string;
  monthlyrent: number;
  floor: string;
  prevTenant: string;
  transferedAt: string;
  transferedBy: string;
}

export interface NewShopType {
  name: string;
  shopNumber: string;
  tenant: string;
  monthlyrent: number;
  floor: string;
  transferedAt:string;
}


export interface Payment{
  shopnumber:string,
   payment:number,
   paymentId:string,
   madeBy?:string|null,
   month:string,
   date:Date,
   paymentmode:"cheque"|"cash_deposit"|"mpesa"|"transfer",
   editedOn?:Date|null,
   editedBy?:string|null
}
export interface ShopFormError{
    name:string
    message:string
}
export interface tyme{
    nanoseconds:number,
    seconds:number
  }

export interface  ShopFormValidate{
    input: NewShopType
    error: ShopFormError
    setError: React.Dispatch<React.SetStateAction<ShopFormError>>
    shops:Shop[]
}  

export interface ErrorState {
    name: string;
    error: string;
  }


  export interface PaymentResponnse {
    id: string;
    created: string;
    updated: string;
    "@collectionId": string;
    "@collectionName": string;
    "@expand": Expand;
    amount: number;
    createdBy: string;
    deletedAt: string;
    deletedBy: string;
    shop: string;
    updatedBy: string;
  }

  export interface Expand {
    shop: Shop;
  }

  export interface Shop {
    "@collectionId": string;
    "@collectionName": string;
    created: string;
    floor: string;
    id: string;
    monthlyrent: number;
    name: string;
    prevTenant: string;
    shopNumber: string;
    tenant: string;
    transferedAt: string;
    transferedBy: string;
    updated: string;
  }
