import React, { useEffect, useState } from 'react'

//file css
import style from './register.module.css'
import { useAuthentication } from '../../hooks/useAuthentication';



const Register = () => {
const [userName, setUserName] = useState('');
const [userEmail, setUserEmail] = useState('');
const [password, setPassword] = useState('');
const [passwordConfirm, setPasswordConfirm] = useState('');
const [error, setError] = useState('');

//conexão 
const {createUser, error: authError, loading } = useAuthentication();

const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(userName)
    console.log(userEmail)
    console.log(password)
    console.log(passwordConfirm)

// Validação de senha;

if(password.length < 6) {
    return setError('A senha não pode ter menos de 8 caracteres.');

} else if(password != passwordConfirm) {
    return setError('As senhas são diferentes, tente novamente.');

} else {
    const user = {
        userName,
        userEmail,
        password
    }

    setError('')
    const response = await createUser(user)
   return console.log(response);

}

}

useEffect(() => {
    if(authError) {
        setError(authError);
    }

}, authError)


  return (
    <div className={style.register}>
        <h1>Cadastre-se para postar</h1>
        <p>Crie seu usuário e compartilhe suas histórias!</p>
        <form onSubmit={handleSubmit}>
            <div className='input'>
                <label>Nome</label>
                <input type="text" placeholder='Digite seu nome'
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required/>
            </div>
        
            <div className='input'>
                <label>e-mail</label>
                <input type="email" placeholder='Digite seu e-mail'
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                required/>
            </div>

            <div className='input'>
                <label>Senha</label>
                <input type="password" placeholder='Digite sua senha' 
                value={password}
                onChange={(e) => setPassword(e.target.value)}    
                required/>
            </div>

            <div className='input'>
                <label>Confirmação de senha</label>
                <input type="password" placeholder='Digite novamente sua senha'
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required/>
            </div>
            {!loading && <button>Cadastrar</button>}
            {loading && <button className='btnDisabled' disabled>Aguarde...</button>}
            
            {error ? <p className='MsgError'>{error}</p>: ''}
        </form>

    </div>  )
}

export default Register