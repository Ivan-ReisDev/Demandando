import { useState, useEffect, useReducer } from "react";
import { data } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const initialState = {
    loading: null,
    error: null

}

const insertReduce = (state, action) => {
    switch (action.type) {
        case "LOADING":
            return { loading: true, error: null }

        case "INSERTED_DOC":
            return { loading: false, error: null }

        case "ERROR":
            return { loading: false, error: action.payload }

        default:
            return state;

    }


}

export const useInsertDocument = (docCollection) => {

    const [response, dispatch] = useReducer(insertReduce, initialState);

    const [cancelled, setcancelled] = useState(false);

    const checkCancelBeforeDispatch = (action) => {
        if (!cancelled) {
            dispatch(action)
        }
    }

    const insertDocument = async (document) => {
        checkCancelBeforeDispatch({
            type: "LOADING",

        })

        try {
            const newDocument = { ...document, createdAt: Timestamp.now() }

            const insertedDocument = await addDoc(
                collection(data, docCollection), newDocument
            )

            checkCancelBeforeDispatch({
                type: "INSERTED_DOC",
                payload: insertedDocument,
            });

        } catch (error) {           
            checkCancelBeforeDispatch({
                type: "ERROR",
                payload: error.message,
            });

        }

    }

    useEffect(() => {
        return () => setcancelled(true)
    }, [])

    return {insertDocument, response}

}