import * as actionsType from "../actions";


export const commentsReducer = (state = { errMess: null, comments: [] }, action) => {
    switch (action.type) {
        case actionsType.FETCH_COMMENTS:
            return { ...state, errMess: null, comments: action.data };
        case actionsType.COMMENTS_FAILED:
            return { ...state, errMess: action.data };
        case actionsType.ADD_COMMENT:
            console.log("from reducer", action.data);
            return { ...state, comments: state.comments.concat(action.data) };
        case actionsType.REMOVE_MESSAGES:
            return { ...state, errMess: null, comments: state.comments.filter(comm => action.data.indexOf(comm.id) === -1) };
        default:
            return state;
    }
}