import React from 'react'
import TheForm from '../../Shared/Shared/form/TheForm';

interface TenantFormProps {

}
export interface FormOptions {
    field_name: string;
    field_type: string;
    default_value: string | number
    options?: { name: string; value: string }[]
}
interface Validate {
    input: { token: string | null };
    setError: (error: { name: string; message: string }) => void;
}
export const TenantForm: React.FC<TenantFormProps> = ({}) => {


return (
 <div className='w-full h-min-full flex flex-col items-center justify-center'>
        <TheForm
            header={"SIGN-IN"}
            fields={form_input}
            submitFn={handleSubmit}
            validate={validate}

        />
 </div>
);
}

const form_input: FormOptions[] = [{ field_name: "token", field_type: "text", default_value: "" },]
const handleSubmit = async (data: any) => {
    // updateToken(data.token)

};

const validate = ({ input, setError }: Validate) => {
    return true
}
