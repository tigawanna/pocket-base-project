import { User, Admin } from 'pocketbase';
import React from 'react'

interface HomeProps {
user?: User | Admin | null
}

export const Home: React.FC<HomeProps> = ({}) => {
return (
<div className='w-full h-full bg-purple-500 flex-center'>
        <div className='w-[30%] h-[20%] bg-purple-900 flex-center text-4xl rounded-md font-bold'>
            HOME
        </div>

</div>
);
}
