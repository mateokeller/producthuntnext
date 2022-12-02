import React from 'react';
import Link from 'next/link';

const  Navigation = () => {
    return (
    <nav>
        <Link href='/'>Inicio</Link>
        <Link href='/populars'>Populares</Link>
        <Link href='/newProduct'>Nuevo producto</Link>
    </nav>
)
}

export default Navigation;