import React from "react";
import { useNavigate } from 'react-router-dom';
import { Admin, User } from "pocketbase";
import { providers } from "../../pocketbase/config";




interface LoginProps {
user?: User | Admin | null
}
interface ProvType{

    name: string
    state: string
    codeVerifier: string
    codeChallenge: string
    codeChallengeMethod: string
    authUrl: string

}

export const Login: React.FC<
  LoginProps
> = ({user}) => {
const provs = providers.authProviders;
const navigate = useNavigate()
// console.log("user in Login.tsx  ==  ",user)
React.useEffect(()=>{
  if (user?.email) {
    navigate('/')
  }
},[])

const startLogin = (prov:ProvType) => { localStorage.setItem("provider",JSON.stringify(prov));
  const redirectUrl = "http://localhost:3000/redirect";
  const url = prov.authUrl + redirectUrl;
      // console.log("prov in button === ", prov)
      // console.log("combined url ==== >>>>>>  ",url)
  
    if (typeof window !== "undefined") {
      window.location.href = url;
    }
  };

  return (
    <div className="w-full h-full flex-center-col">
      <div className="text-3xl font-bold ">
        LOGIN
      </div>
      {provs &&
        provs?.map((item:any) => {
          return (
            <button 
            className="p-2 bg-purple-600"
            key={item.name}
            onClick={() => startLogin(item)}>{item.name}</button>
          );
        })}
    </div>
  );
};
