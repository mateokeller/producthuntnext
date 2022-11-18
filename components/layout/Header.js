import React from 'react';
import Search from '../ui/Search';
import Navigation from './Navigation';
import Link from 'next/link';
import Button from '../ui/Button';


const Header = () => {
    return (
        <header>
            <div className='header-container'>
                <div>
                    <Link href={'/'}>
                        <p className='logo'>P</p>
                    </Link>
                    
                    <Search />
                    <Navigation />
                </div>

                <div>
                    <p>Hola: Usuario</p>
                        <Button type='button' bgColor='true'>Cerrar sesion</Button>
                            <Link href='/'>
                                <Button bgColor='true'>Login</Button>
                            </Link>
                            <Link href='/'>
                                <Button>Crear cuenta</Button>
                            </Link>
                </div>
            </div>
        </header>
    
)
}

export default Header