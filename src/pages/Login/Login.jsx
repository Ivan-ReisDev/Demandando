import React, { useEffect, useState } from 'react'
import { useAuthentication } from '../../hooks/useAuthentication';

//css 
import style from './login.module.css'

const Login = () => {
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    //conexão 
    const { login, error: authError, loading } = useAuthentication();

    const handleSubmit = async (e) => {
        e.preventDefault()

        const user = {
            userEmail,
            password
        }

        setError('')
        const response = await login(user);
        setPassword('')
        return console.log(response);

    }

    useEffect(() => {
        if (authError) {
            setError(authError);
        }
    }, [authError]);
    
    return (
        <div className={style.login}>
            <h1>Entrar</h1>
            <p>Faça o login para poder utilizar o sistema.</p>
            <form onSubmit={handleSubmit}>

                <div className='input'>
                    <label>e-mail</label>
                    <input type="email" placeholder='Digite seu e-mail'
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        required />
                </div>

                <div className='input'>
                    <label>Senha</label>
                    <input type="password" placeholder='Digite sua senha'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                </div>

                {!loading && <button>Entrar</button>}
                {loading && <button className='btnDisabled' disabled>Aguarde...</button>}
                {error ? <p className='MsgError'>{error}</p> : ''}
            </form>
        </div>
    )
}

export default Login