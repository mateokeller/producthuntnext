import React from 'react';
import Search from '../ui/Search';
import Navigation from './Navigation';
import Link from 'next/link';
import Button from '../ui/Button';


const Header = () => {

    const user = false;

    return (
        <header>
            <div className='header-container'>
                <div className='nav-container'>
                    <Link href={'/'}>
                        <p className='logo'>P</p>
                    </Link>
                    <Search />
                    <Navigation />
                </div>

                <div className='user-config-container'>
                    {user ? 
                    <>
                        <p className='user-name'>Hola: Usuario</p>
                        <Button type='button' bgColor='true'>Cerrar sesion</Button>
                    </>
                    :<>
                        <Link href='/login'>
                            <Button bgColor='true'>Login</Button>
                        </Link>
                        <Link href='/createAccount'>
                            <Button>Crear cuenta</Button>
                        </Link>
                    </>
                    }
                </div>
            </div>
        </header>
    
)
}

export default Header