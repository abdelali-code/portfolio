import * as actionsType from "../actions";


export const usersReducer = (state = { errMess: null, isLoading: false, users: [] }, action) => {
    switch (action.type) {
        case actionsType.FETCH_USERS:
            return { ...state, isLoading: false, errMess: null, users: action.data };
        case actionsType.LOAD_USERS:
            return { ...state, errMess: null, isLoading: true };
        case actionsType.USERS_FAILED:
            return { ...state, errMess: action.data, isLoading: false }
        case actionsType.REMOVE_USER:
            return { ...state, errMess: null, isLoading: false, users: state.users.filter(usr => action.data.indexOf(usr.id) === -1) };
        default:
            return state;
    }
}