export type SetInput = {
  item: string;
  item_key: string;
};



export interface FormOptions {
  field_name: string;
  field_type: string;
  default_value: string | number;
  options?: { name: string; value: string }[];
  misc?: { coll_name: string };
}

export interface FilterParams{
data:any[]; keyword:string
}

export interface QueryFnProps{
key:string
keyword:string
}
