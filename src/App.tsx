import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toolbar } from "./components/Navigation/Toolbar/Toolbar";
import "../node_modules/table-for-react/dist/tailwind.css";
import { Test } from './components/test/Test';


import { client, getUser } from "./pocketbase/config";

import { useQuery } from "@tanstack/react-query";
import { Protected } from './pocketbase/auth/Protected';
import { Redirect } from "./pocketbase/auth/Redirect";
import { Shops } from "./components/shops/Shops";
import { Payment } from "./components/payment/Payment";
import { Home } from "./components/home/Home";
import { Shop } from "./components/shops/Shop";
import { PrintPreview } from "./components/Print/PrintPreview";
import { Login } from "./pocketbase/auth/Login";
import { Tenants } from "./components/Tenants/Tenants";




function App() {


const userQuery = useQuery(["user"], getUser);


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
                <Protected user={user}>
                  <Home user={user} />
                </Protected>
              }
            />


            <Route
              path="/shops"
              element={
                <Protected user={user}>
                  <Shops user={user} />
                </Protected>
              }
            />
            <Route
              path="/tenants"
              element={
                <Protected user={user}>
                  <Tenants user={user} />
                </Protected>
              }
            />

            <Route
              path="/shop"
              element={
                <Protected user={user}>
                  <Shop user={user} floor={"ground"} shopId={"G-01"} />
                </Protected>
              }
            />
            <Route
              path="/payments"
              element={
                <Protected user={user}>
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
