import React from 'react'
import Layout from '../components/layout/Layout';

const CreateAccount = () => (
    <div>
        <Layout>
            <>
                <h1 className='create-account-title text-center'>Crear Cuenta</h1>
                <form>
                    <div className='form-field'>
                        <label htmlFor="name">Nombre</label>
                        <input
                            type="text" 
                            id='name'
                            placeholder='Tu nombre'
                            name='name'
                        />
                    </div>

                    <div className='form-field'>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email" 
                            id='email'
                            placeholder='Tu email'
                            name='email'
                        />
                    </div>

                    <div className='form-field'>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id='password'
                            placeholder='Tu Password'
                            name='password'
                        />
                    </div>

                    <input className='form-btn' type="submit"
                    value='Crear Cuenta'
                    />
                </form>
            </>
            
        </Layout>
    </div>
)

export default CreateAccount;