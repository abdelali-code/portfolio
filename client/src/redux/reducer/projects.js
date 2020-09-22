import * as actionsType from "../actions";


export const projectReducer = (state = { errMess: null, isLoading: false, projects: [] }, action) => {
    switch (action.type) {
        case actionsType.ADD_PROJECTS:
            return { ...state, errMess: null, isLoading: false, projects: action.data };
        case actionsType.LOAD_PROJECTS:
            return { ...state, isLoading: true };
        case actionsType.FAILED_PROJECTS:
            return { ...state, isLoading: false, errMess: action.data };
        case actionsType.ADD_PRJ:
            let projects = state.projects.concat(action.data);
            return { ...state, projects: projects };
        case actionsType.UPDATE_PRJ:
            return { ...state, projects: state.projects.filter(pr => pr.id !== action.data.id).concat(action.data) };
        case actionsType.DELETE_PR:
            return { ...state, projects: state.projects.filter(pr => pr.id !== action.data) };
        default:
            return state;
    }
}



export const categoryreducer = (state = { errMess: null, categories: [] }, action) => {
    switch (action.type) {
        case actionsType.ADD_CATEGORIES:
            return { ...state, errMess: null, categories: action.data };
        case actionsType.FAILED_CATEGORIES:
            return { ...state, errMess: action.data };
        default:
            return state;
    }
}