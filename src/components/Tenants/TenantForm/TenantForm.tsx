import { useMutation } from '@tanstack/react-query';
import React from 'react'
import { client } from '../../../pocketbase/config';
import TheForm from '../../Shared/Shared/form/TheForm';
import { TenantType } from './../types';

interface TenantFormProps {

}
interface TenantFormInput extends TenantType{

}
export interface FormOptions {
    field_name: string;
    field_type: string;
    default_value: string | number
    options?: { name: string; value: string }[]
}
interface Validate {
    input: TenantFormInput;
    setError: (error: { name: string; message: string }) => void;
}

export const TenantForm: React.FC<TenantFormProps> = ({}) => {

const addTenantMutation = useMutation((vars: { coll_name: string, payload: TenantFormInput }) => {
    return client.records.create(vars.coll_name, vars.payload)
},)
    const handleSubmit = async (data:TenantFormInput) => {
        console.log("input ===== ",data)
        // updateToken(data.token)
    //   addTenantMutation.mutate({coll_name:'tenants',payload:data})

    };
return (
    <div className='w-[70%] h-[80%] flex items-center justify-center b rounded-lg shadow-lg bg-slate-900'>
        <TheForm
        header={"New Tenant"}
        fields={form_input}
        submitFn={handleSubmit}
        validate={validate}

        />
 </div>
);
}

const form_input: FormOptions[] = [
{ field_name: "name", field_type: "text", default_value: "" },
{ field_name: "email", field_type: "text", default_value: "" },
{ field_name: "pic", field_type: "file", default_value: "" },
{ field_name: "token", field_type: "text", default_value: "" },
{ field_name: "token", field_type: "text", default_value: "" },

]


const validate = ({ input, setError }: Validate) => {
    
    return true
}
