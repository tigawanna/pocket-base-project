import React from "react";
import { useNavigate } from 'react-router-dom';
import { Admin, User } from "pocketbase";
import { providers } from "../../pocketbase/config";
import { TheIcon } from "../../components/Shared/Shared/TheIcon";
import { BsGoogle,BsFacebook,BsReddit,BsTwitter,BsDiscord,BsGithub} from 'react-icons/bs'



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

const startLogin = (prov:ProvType) => { 
  localStorage.setItem("provider",JSON.stringify(prov));
  const redirectUrl = "http://localhost:3000/redirect";
  const url = prov.authUrl + redirectUrl;
  if (typeof window !== "undefined") {
      window.location.href = url;
    }
  };
const icons = {"google":BsGoogle,"twitter":BsTwitter,"discord":BsDiscord,
"reddit":BsReddit,"facebook":BsFacebook,"github":BsGithub}
  return (
    <div className="w-full h-full flex-center-col">
      <div className="text-3xl font-bold my-3">
        Login with
      </div>
      {provs &&
        provs?.map((item:any) => {
          return (
            <button 
            className="p-2 hover:bg-purple-900 bg-slate-900 text-white border-2 text-3xl 
            flex items-center justify-center m-2"
            key={item.name}
            onClick={() => startLogin(item)}>
              {/* @ts-ignore */}
              <TheIcon size="50" Icon={icons[item.name]} color="" iconstyle="m-1" />
              <div className="text-4xl font-bld capitalize mx-3"> {item.name}</div>
           </button>
          );
        })}
    </div>
  );
};
