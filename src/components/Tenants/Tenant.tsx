
import React from 'react'
import { useParams } from 'react-router-dom';
import { useCollection } from '../Shared/hooks/useCollection';
import { useLocation } from 'react-router-dom';
import { User,Admin,Record} from 'pocketbase';


interface TenantProps {
    user: User | Admin | null
}

export const Tenant: React.FC<TenantProps> = ({}) => {

const params = useParams();
const location = useLocation()

const tenantsQuery = useCollection({ key: ["tenants"],rqOptions:{
  
  select: (data) => {
    return data.items.filter((item) => item.id === params.tenantId)
  }
} });
  console.log(" params === ", tenantsQuery?.data)
return (
 <div className='w-full min-h-full flex-center-col'>
   {params.tenantId}
 </div>
);
}
