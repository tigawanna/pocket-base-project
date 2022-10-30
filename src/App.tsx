import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toolbar } from "./components/Navigation/Toolbar/Toolbar";
import "../node_modules/table-for-react/dist/tailwind.css";
import { Test } from './components/test/Test';


import { appendToCache, client, getUser } from "./pocketbase/config";

import { useQuery,useQueryClient } from "@tanstack/react-query";
import { Protected } from './pocketbase/auth/Protected';
import { Redirect } from "./pocketbase/auth/Redirect";
import { Shops } from "./components/shops/Shops";
import { Payment } from "./components/payment/Payment";
import { Home } from "./components/home/Home";
import { Shop } from "./components/shops/Shop";
import { PrintPreview } from "./components/Print/PrintPreview";
import { Login } from "./pocketbase/auth/Login";
import { Tenants } from "./components/Tenants/Tenants";
import { Tenant } from "./components/Tenants/Tenant";




function App() {

const querClient = useQueryClient()
const userQuery = useQuery(["user"], getUser);
const testmode= true
  // const dummyuser = {
  //   "id": "20dq1d1c3h5mncl",
  //   "created": "2022-09-18 06:12:51.080",
  //   "updated": "2022-09-18 06:12:51.080",
  //   "email": "denniskinuthiaw@gmail.com",
  //   "verified": true,
  //   "lastResetSentAt": "",
  //   "lastVerificationSentAt": "",
  //   "profile": {
  //     "id": "fzezpytbmw2cb1e",
  //     "created": "2022-09-18 06:12:51.081",
  //     "updated": "2022-10-17 15:45:58.593",
  //     "@collectionId": "systemprofiles0",
  //     "@collectionName": "profiles",
  //     "avatar": "",
  //     "avatarUrl": "https://lh3.googleusercontent.com/a/ALm5wu0eTxuzjH5YNIzy1z46o25PonSNVXxyRomY8--qxPY=s96-c",
  //     "name": "Dennis",
  //     "userId": "20dq1d1c3h5mncl",
  //     "@expand": {}
  //   }
  // }
//  console.log("auth === ",userQuery)

if (userQuery.isLoading ) {
    return (
      <div className="w-full h-screen flex-center scroll-bar">
        <div className="w-[670%] h-[70%] flex-center ">loading....</div>
      </div>
    );
  }
  if (userQuery.isError) {
    return (
      <div className="w-full h-screen flex-center scroll-bar">
        <div className="w-[670%] h-[70%] flex-center ">
          {/* @ts-ignore */}
         {userQuery?.error?.response?.message}
        </div>
        </div>
    ); 
  }
  const user = userQuery.data;
  // if(!user){
  //   appendToCache(['user'], querClient, dummyuser)
  // }

  // if(!user){
  //   return (
  //     <div className="w-full h-screen flex-center scroll-bar">
  //       <Login/>
  //     </div>
  //   );
  // }

  return (
    <div className="h-screen w-screen scroll-bar">
      <BrowserRouter>
        <div className="fixed top-[0px] w-[100%] z-50">
          <Toolbar user={user} />
        </div>
        <div className="w-full h-[90%] mt-16 ">
          <Routes>
            <Route
              path="/"
              element={
                <Protected user={user} testmode={testmode}>
                  <Home user={user} />
                </Protected>
              }
            />


            <Route
              path="/shops"
              element={
                <Protected user={user} testmode={testmode}>
                  <Shops user={user} />
                </Protected>
              }
            />
            <Route
              path="/tenants"
              element={
                <Protected user={user} testmode={testmode}>
                  <Tenants user={user} />
                </Protected>
              }
            />
            <Route
              path="/tenant/:tenantId"
              element={
                <Protected user={user} testmode={testmode}>
                  <Tenant user={user} />
                </Protected>
              }
            />

            <Route
              path="/shop"
              element={
                <Protected user={user} testmode={testmode}>
                  <Shop user={user} floor={"ground"} shopId={"G-01"} />
                </Protected>
              }
            />
            <Route
              path="/payments"
              element={
                <Protected user={user} testmode={testmode}>
                  <Payment user={user} />
                </Protected>
              }
            />
            <Route
              path="/print-preview"
              element={<PrintPreview user={user} />}
            />
            {/* @ts-ignore */}
            <Route path="/login" element={<Login user={user} />} />
            <Route path="/redirect" element={<Redirect user={user} />} />
            <Route path="/test" element={<Test />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
