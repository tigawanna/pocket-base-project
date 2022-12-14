import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from "@tanstack/react-query"
import { client } from "../../../pocketbase/config";
import {Record} from "pocketbase";
import { ListResult } from "../types/pb-types";

interface T {
  key: string[];
  filter?: string;
  expand?: string;
  rqOptions?: UseQueryOptions<ListResult<Record>,unknown,any,string[]>;
}

export const useCollection =({key,filter="",expand="",rqOptions={}}:T)=>{
    const fetcherFunction = async () => {
      return await client.records.getList(
        key[0],
        1,
        50,
        {
          filter: `${filter}`,
          expand:expand,
        }
      );
    };
  return useQuery< ListResult<Record>,unknown,ListResult<Record>,string[]>(key, fetcherFunction,rqOptions);
}


interface VarsT{
    coll_name: string;
    payload: {};

}
interface UseMutateProps {
  vars: VarsT;
  rqOptions?: UseMutationOptions<
    Record,
    unknown,
    VarsT,
    string[]
  >;
}

// export const useMutateCollection = ({vars,rqOptions}:UseMutateProps) => {
//   return useMutation<Record,unknown,VarsT,string[]>((variables) => {
//     return client.records.create(
//       vars.coll_name,
//       vars.payload
//     );
//   },rqOptions
  
//   );
// };




