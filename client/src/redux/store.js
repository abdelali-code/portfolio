import { projectReducer, categoryreducer } from "./reducer/projects";
import { commentsReducer } from "./reducer/comments";
import { Auth } from "./reducer/auth";
import { usersReducer } from "./reducer/users";
import { skillsReducer } from "./reducer/skills";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

export const cofigureStore = () => {
    const store = createStore(
        combineReducers(
            {
                projects: projectReducer,
                comments: commentsReducer,
                categories: categoryreducer,
                authentication: Auth,
                users: usersReducer,
                skills: skillsReducer
            }),
        applyMiddleware(thunk));
    return store;
}