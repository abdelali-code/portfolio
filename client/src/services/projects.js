import axios from 'axios';
import { useReducer, useEffect } from "react";
const baseUrl = 'http://localhost:3001/';



// reducer
function projectFetchreducer(state, action) {
    switch (action.type) {
        case "FETCH_INIT":
            return { ...state, isLoading: true }
        case 'ADD_PROJECTS':
            return { ...state, errMess: null, isLoading: false, projects: action.payload }
        case "FAILED":
            return { ...state, isLoading: false, errMess: action.payload }
        default:
            throw new Error();
    }
}

const initialProjectState = {
    isLoading: false,
    errMess: null,
    projects: [],
}


export const useFetchPorjects = () => {
    // return axios.get(baseUrl + "PROJECTS");
    const [state, dispatch] = useReducer(projectFetchreducer, initialProjectState);


    useEffect(() => {
        dispatch({ type: "FETCH_INIT" });
        axios.get(baseUrl + "PROJECTS")
            .then((responce) => {
                dispatch({ type: "ADD_PROJECTS", payload: responce.data });
            })
            .catch(err => {
                dispatch({ type: "FAILED", payload: err.message });
            })
    }, [])
    return [state, dispatch];
}


// export const fetchArticles = () => {
//     return axios.get(baseUrl + "ARTICLES");
// }

