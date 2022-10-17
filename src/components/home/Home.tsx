import { User, Admin } from 'pocketbase';
import React from 'react'

interface HomeProps {
user?: User | Admin | null
}

export const Home: React.FC<HomeProps> = ({}) => {
return (
<div>
HOME
</div>
);
}
