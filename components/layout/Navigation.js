import React from 'react';
import Link from 'next/link';

const  Navigation = () => {
    return (
    <nav>
        <Link href='/'>Inicio</Link>
        <Link href='/'>Populares</Link>
        <Link href='/'>Nuevo producto</Link>
    </nav>
)
}

export default Navigation;