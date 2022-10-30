import PocketBase, { Record } from "pocketbase";

import { useQuery } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";

export interface PeepResponse {
  id: string;
  created: string;
  updated: string;
  "@collectionId": string;
  "@collectionName": string;
  age: number;
  bio: string;
  name: string;
  "@expand": {};
}


export const client = new PocketBase(import.meta.env.VITE_pb_url_agrho_lan);

//agrho lan
// export const client = new PocketBase("http://192.168.0.101:8090");
//home lan
// export const client = new PocketBase("http://192.168.43.238:8090");
//localhost
// export const client = new PocketBase( "http://127.0.0.1:8090");
// const redirectUrl ="http://127.0.0.1:8090/redirect.html";

export const getUser = async () => {
  return await client.authStore.model;
};

// export const getAdmin = async () => {
//     return await client.admins.authViaEmail(
//       "denniskinuthiaw@gmail.com",
//       "SBwptpWeAN9BezV"
//     );
// };
export const providers = await client.users.listAuthMethods();
// console.log("provider data === ",providers)
// export const oAuthSignIn=async()=>{
//   const providers = await client.users.listAuthMethods();
//   const provider = providers.authProviders[0];

//   console.log(" provider vars ==== ",
//     provider.name,

//     provider.codeVerifier,
//     redirectUrl
//   );
//   // authenticate
//   const authRes = await client.users.authViaOAuth2(
//     provider.name,
//     // @ts-ignore
//     params.get("code"),
//     provider.codeVerifier,
//     redirectUrl
//   );

//   console.log("succefull auth == ",authRes)
//   return authRes;
// }

export const realTime = async (
  index: [string],
  queryClient: QueryClient
) => {
  return await client.realtime.subscribe(index[0],
    function (e) {
      console.log("new real time response", e.record);
      appendToCache(index, queryClient, e.record);

      //    queryClient.setQueryData(["peeps", { id: e.record.id }], e.record);
    }
  );
};

export const allPeeps = async (): Promise<
  PeepResponse[] | Record[]
> => {
  return await client.records.getFullList(
    "peeps",
    200 /* batch size */,
    {
      sort: "-created",
    }
  );
};

export const appendToCache = async (
  index: [string],
  queryClient: QueryClient,
  newData: any
) => {
  queryClient.setQueryData(index, (old: any) => {
    console.log("old to be unshifted === ",old)
        console.log(" new data === ",newData)
    if(old){
     old.items.unshift(newData);
      return old;
    }
   return newData; 

  });
};


export const getPrevdata = (
  index: [string],
  queryClient: QueryClient
) => {
  const previous =
    queryClient.getQueryData(index);
  console.log("previous items", previous);
};
