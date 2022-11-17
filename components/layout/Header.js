import React from 'react';
import Search from '../ui/Search';
import Navigation from './Navigation';
import Link from 'next/link';


const Header = () => {
    return (
        <header>
            <div>
                <div>
                    <p>Parrafo</p>
                    <Search />
                    <Navigation />
                </div>

                <div>
                    <p>Hola: Alex</p>
                    <button type='button'>Cerrar sesion</button>
                    <Link href='/'>Login</Link>
                    <Link href='/'>Crear cuenta</Link>
                </div>

            </div>
        </header>
    
)
}

export default Header