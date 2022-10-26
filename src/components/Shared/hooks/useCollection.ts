import { useQuery } from "@tanstack/react-query"
import { client } from "../../../pocketbase/config";


interface T {
  key: string[];
  filter?: string;
  expand?: string;
}
export const useCollection =({key,filter="",expand=""}:T)=>{
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
    return useQuery(key, fetcherFunction);
}
