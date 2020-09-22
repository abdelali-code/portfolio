import * as actionsType from "../actions";


export const Auth = (state = {
    isLoading: false,
    isAuthenticated: localStorage.getItem('token') ? true : false,
    token: localStorage.getItem('token'),
    user: localStorage.getItem('username') ? localStorage.getItem('username') : null,
    errMess: null,
    isAdmin: localStorage.getItem('admin') ? localStorage.getItem('admin') : false,
}, action) => {
    switch (action.type) {
        case actionsType.REQUEST_LOGIN:
            return {
                ...state,
                isLoading: true,
                isAuthenticated: false,
                user: action.data
            }
        case actionsType.LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                errMess: '',
                token: action.data.token,
                isAdmin: action.data.admin
            };
        case actionsType.LOGIN_FAILED:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
                errMess: action.data,
                user: null,
                isAdmin: false
            }
        case actionsType.REQUEST_LOGOUT:
            return {
                ...state,
                isLoading: true
            }
        case actionsType.SUCCESS_LOGOUT:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
                errMess: '',
                user: null,
                token: '',
                isAdmin: false
            }
        default:
            return state;
    }
}