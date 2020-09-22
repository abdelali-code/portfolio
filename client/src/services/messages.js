import axios from 'axios';
import { useReducer, useEffect } from "react";
const baseUrl = 'http://localhost:3001/';



// reducer
function messageFetchreducer(state, action) {
    switch (action.type) {
        case "FETCH_INIT":
            return { ...state, isLoading: true }
        case 'ADD_MESSAGES':
            return { ...state, errMess: null, isLoading: false, messages: action.payload }
        case "FAILED":
            return { ...state, isLoading: false, errMess: action.payload }
        default:
            throw new Error();
    }
}

const initialMessagesState = {
    isLoading: false,
    errMess: null,
    messages: [],
}

// gloabal state



const useFetchMessages = () => {
    // return axios.get(baseUrl + "PROJECTS");
    const [state, dispatch] = useReducer(messageFetchreducer, initialMessagesState);


    // useEffect(() => {
    //     dispatch({ type: "FETCH_INIT" });
    //     axios.get(baseUrl + "MESSAGES")
    //         .then((responce) => {
    //             dispatch({ type: "ADD_MESSAGES", payload: responce.data });
    //         })
    //         .catch(err => {
    //             dispatch({ type: "FAILED", payload: err.message });
    //         })
    // }, [])
    return [state, dispatch];
}

export const [state, dispatch] = useFetchMessages();


export const fetchMessages = () => () => {
    dispatch({ type: "FETCH_INIT" });
    axios.get(baseUrl + "MESSAGES")
        .then((responce) => {
            dispatch({ type: "ADD_MESSAGES", payload: responce.data });
        })
        .catch(err => {
            dispatch({ type: "FAILED", payload: err.message });
        })
}


// export const fetchArticles = () => {
//     return axios.get(baseUrl + "ARTICLES");
// }

