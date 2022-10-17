import { Admin, User } from 'pocketbase';
import React, { ReactNode } from 'react'
import { Navigate } from 'react-router-dom';

interface ProtectedProps {
user?: User | Admin | null
children:ReactNode
}

export const Protected: React.FC<ProtectedProps> = ({user,children}) => {
if(!user?.email){
 return <Navigate to={'/login'} />
}
return (
 <div className='h-full w-full'>
  {children}
 </div>
);
}
