import { User, Admin } from 'pocketbase';
import React, { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { Loading } from '../../components/Shared/Shared/Loading';
import { client } from '../../pocketbase/config';




interface RedirectProps {
user?: User | Admin | null
}

export const Redirect: React.FC<RedirectProps> = ({user}) => {
const [loading, setLoading] = React.useState(true)
const queryClient = useQueryClient()
const navigate = useNavigate()
const [searchParams] = useSearchParams();
const code = searchParams.get('code') as string
const local_prov = JSON.parse(localStorage.getItem('provider') as string)
console.log("provs in loacl host ==== ",local_prov)
// this hasto match what you orovided in the oauth provider , in tis case google
let redirectUrl = 'http://localhost:3000/redirect'
useEffect(()=>{
    if (local_prov.state !== searchParams.get("state")) {
      const url = 'http://localhost:3000/login'
        if (typeof window !== 'undefined') {
            window.location.href = url;
        }
    }
    else {
 
      client.users.authViaOAuth2(
            local_prov.name,
            code,
            local_prov.codeVerifier,
            redirectUrl
            )
            .then((response) => {
                // console.log("authentication data === ", response)
                // udating te user rofile field in pocket base with custome data from your 
                // oauth provider in this case the avatarUrl and name
                client.records.update('profiles', response.user.profile?.id as string, {
                    name: response.meta.name,
                    avatarUrl: response.meta.avatarUrl,
                    
                }).then((res) => {
                // console.log(" successfully updated profi;e", res)

                }).catch((e) => {
                    console.log("error updating profile  == ", e)
                })
                setLoading(false)
                // console.log("client modal after logg   == ", client.authStore.model)
                queryClient.setQueryData(['user'], client.authStore.model)
                navigate('/')

            }).catch((e) => {
                console.log("error logging in with provider  == ", e)
            })
    }

},[])
if (user) {
    return <Navigate to="/" replace />;
}
return (
 <div className='w-full h-full '>
        {loading ? <Loading size={30}/>:null}
 </div>
);
}
