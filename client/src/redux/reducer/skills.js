import * as actionsType from "../actions";


export const skillsReducer = (state = { errMess: null, isLoading: false, skills: [] }, action) => {
    switch (action.type) {
        case actionsType.ADD_SKILLS:
            return { ...state, errMess: null, isLoading: false, skills: action.data };
        case actionsType.LOAD_SKILLS:
            return { ...state, isLoading: true };
        case actionsType.FAILED_SKILLS:
            return { ...state, isLoading: false, errMess: action.data };
        case actionsType.ADD_SKILL:
            let skills = state.skills.concat(action.data);
            return { ...state, skills: skills };
        case actionsType.UPDATE_SKILL:
            return { ...state, skills: state.skills.filter(pr => pr.id !== action.data.id).concat(action.data) };
        case actionsType.DELETE_SKILL:
            return { ...state, skills: state.skills.filter(pr => pr.id !== action.data) };
        default:
            return state;
    }
}
