import { data } from '../firebase/config';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth'

import { useEffect, useState } from 'react';

export const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null)

    //cleanup
    const [cancelled, setCancelled] = useState(false);

    const auth = getAuth();

    function checkIfIsCancelled() {
        if(cancelled) {
            return;

        }
    }

    const createUser = async (data) => {
        checkIfIsCancelled();
        setLoading(true);
        setError(null)

        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.userEmail,
                data.password ,

            )

            await updateProfile(user, {
                displayName: data.userName,
                
            })
            
        } catch (error) {

            let systemErrorMessage; 

            if(error.message.includes('Password')) {
                systemErrorMessage = "A senha precisa conter ao menos 6 caracteres.";

            } else if (error.message.includes('email-already')) {
                systemErrorMessage = "e-mail já cadastrado.";

            } else {
                systemErrorMessage = 'Ocorreu um erro, por favor tente mais tarde.'

            }
            setError(systemErrorMessage)
            
        }

        setLoading(false)
    };

// Login 

const login = async (data) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(false);

    try {
        await signInWithEmailAndPassword(auth, data.userEmail, data.password);
        setLoading(false);

    } catch (error) {

        let systemErrorMessage; 
        if(error.message.includes("user-not-found")) {
            systemErrorMessage = "Usuário não encontrado.";

        } else if(error.message.includes('wrong-password')) {
            systemErrorMessage = "Usuário ou senha incorreto.";

        } else {
            systemErrorMessage ="Ocorreu um erro, por favor tente mais tarde."

        }
        setError(systemErrorMessage);
        setLoading(false);
    }
}


    const logout = () => {
        checkIfIsCancelled()
        signOut(auth)
    }

    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login

    }

}