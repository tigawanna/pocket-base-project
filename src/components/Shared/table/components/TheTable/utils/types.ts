export interface TableRow{
    id:number
    name:string
    age:number
    email:string
    date:Date|string|Tyme
}

export interface ErrorState {
    name: string;
    error: string;
  }

  //for firebase timestamps
  export interface Tyme{
    nanoseconds: number,
    seconds:number
  }
