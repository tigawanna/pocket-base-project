import { Admin,User } from 'pocketbase';
import React from 'react'
import { useParams } from 'react-router-dom';
import { useCollection } from '../Shared/hooks/useCollection';
import { useLocation } from 'react-router-dom';

interface TenantProps {
    user: User | Admin | null
}

export const Tenant: React.FC<TenantProps> = ({}) => {
const tenantsQuery = useCollection({ key: ["tenants"] });

const params = useParams();
const location = useLocation()
console.log(" params === ",params,location)
return (
 <div className='w-full min-h-full flex-center-col'>
   {params.tenantId}
 </div>
);
}
