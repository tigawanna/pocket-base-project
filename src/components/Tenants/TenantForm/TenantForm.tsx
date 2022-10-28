import { useFirestoreDocumentData } from '@react-query-firebase/firestore';
import { useMutation } from '@tanstack/react-query';
import React from 'react'
import { client } from '../../../pocketbase/config';
import { useCollection } from '../../Shared/hooks/useCollection';
import TheForm from '../../Shared/Shared/form/TheForm';
import { FormOptions, QueryFnProps } from '../../Shared/Shared/form/types';
import { TenantType } from './../types';
import { FilterParams } from './../../Shared/Shared/form/types';


interface TenantFormProps {

}
interface TenantFormInput extends TenantType{

}

interface Validate {
    input: TenantFormInput;
    setError: (error: { name: string; message: string }) => void;
}

export const TenantForm: React.FC<TenantFormProps> = ({}) => {
 
const queryFn=({key,keyword}:QueryFnProps)=>{
    return useCollection({key:[key],
        filter:keyword,
        rqOptions:{
        select:(data)=>{
          if (keyword !== ""){
                return data.items.filter((item) => item.name.toLowerCase().includes(keyword.toLowerCase()))
            }
           
           return data.items  
        }
    }} )
}


const addTenantMutation = useMutation((vars: { coll_name: string, payload: TenantFormInput }) => {
    return client.records.create(vars.coll_name, vars.payload)
},)
const handleSubmit = async (data:TenantFormInput) => {
  console.log("input ===== ",data)
     addTenantMutation.mutate({coll_name:'tenants',payload:data})

};
console.log("query === ,query")
return (
    <div className='w-[70%] h-[80%] flex items-center justify-center b rounded-lg shadow-lg bg-slate-900'>
        <TheForm
        header={"New Tenant"}
        fields={form_input}
        submitFn={handleSubmit}
        validate={validate}
        queryFn={queryFn}
        />
 </div>
);
}

const form_input: FormOptions[] = [
{ field_name: "name", field_type: "text", default_value: "" },
{ field_name: "email", field_type: "text", default_value: "" },
{ field_name: "pic", field_type: "file", default_value: "" },
{ field_name: "token", field_type: "text", default_value: "" },
{ field_name: "shops", field_type:"fetchselect",default_value:"",misc:{coll_name:"shops"}}
]


const validate = ({ input, setError }: Validate) => {
    if (input.name === "") {
        setError({ name: "name", message: "name field required" })
        return false
    }
    if(input.email === ""){
        setError({name:"email",message:"email field required"})
    return false
    }
    if (input.pic === "") {
        setError({ name: "pic", message: "pic field required" })
        return false
    }
    return true
}




interface TenantFormProps {

}

export const TenantFormExtra: React.FC<TenantFormProps> = (props) => {
console.log("props ===",props)
return (
 <div>
     extra
 </div>
);
}
