import { Admin,User } from 'pocketbase';
import React from 'react'
import { useParams } from 'react-router-dom';

interface TenantProps {
    user: User | Admin | null
}

export const Tenant: React.FC<TenantProps> = ({}) => {
const { tenantId } = useParams();
return (
 <div className='w-full min-h-full flex-center-col'>
   {tenantId}
 </div>
);
}
