import * as Actions from "./actions";
import { baseUrl } from "../shared/baseUrl";
// import axios from "axios";
import { fetch } from "cross-fetch";
import { successInfo, warningInfo } from "../shared/notifications"
import history from "../shared/history";



const projectsLoading = () => ({
    type: Actions.LOAD_PROJECTS
})

const projectsFailed = (err) => ({
    type: Actions.FAILED_PROJECTS,
    data: err
})


const addProjects = projects => ({
    type: Actions.ADD_PROJECTS,
    data: projects
})

export function fetchProjects() {
    return function (dispatch) {
        dispatch(projectsLoading());
        return fetch(baseUrl + "PROJECTS")
            .then((result) => {
                if (!result.ok) {
                    console.log(result);
                    let err = new Error("Error " + result.statusText + " " + result.status);
                    throw err;
                }

                return result.json();
            })
            .then(responce => {

                dispatch(addProjects(responce));
            })
            .catch(err => {
                dispatch(projectsFailed(err.message));
            })
    }
}

const addSinglePrj = (data) => ({
    type: Actions.ADD_PRJ,
    data: data
})

const updateProject = (data) => ({
    type: Actions.UPDATE_PRJ,
    data: data
})


export const addPrj = (data, resetFields, setFile) => dispatch => {
    const token = localStorage.getItem("token");
    return fetch(baseUrl + "projects", {
        method: "POST",
        headers: {

            Authorization: 'Bearer ' + token // if you use token
        },
        body: data

    })
        .then((result) => {
            if (!result.ok) {
                console.log(result);
                let err = new Error("Error " + result.statusText + " " + result.status);
                throw err;
            }
            // clear input field;
            resetFields();
            return result.json();
        })
        .then((res) => {
            dispatch(addSinglePrj(res));
            setFile([]);
            successInfo("Project added successfuly");
        })
        .catch(err => { warningInfo(err.message) });
}

// update a project
export const updatePr = (data, projectId) => dispatch => {
    const token = localStorage.getItem("token");
    return fetch(baseUrl + "projects/" + projectId, {
        method: "PUT",
        headers: {
            Authorization: 'Bearer ' + token // if you use token
        },
        body: data

    }).then((res) => {
        if (res.ok) {
            return res.json();
        }
        let err = new Error("Error " + res.statusText + " " + res.status);
        throw err;
    })
        .then((res) => {
            console.log("updated ", res);
            dispatch(updateProject(res));
            successInfo("Project updated successfuly");
        })
        .catch(err => {
            warningInfo(err.message);
        })
}

const deleteSinglePr = (data) => ({
    type: Actions.DELETE_PR,
    data: data
});
export const deleteProjects = (projectId) => dispatch => {
    const token = localStorage.getItem("token");
    return fetch(baseUrl + "projects/" + projectId, {
        method: "DELETE",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token // if you use token
        }
    }).then((res) => {
        if (res.ok) {
            return res.json();
        }
        let err = new Error("Error " + res.statusText + " " + res.status);
        throw err;
    }).then(() => {
        dispatch(deleteSinglePr(projectId));
        successInfo("project deleted successfully");
    })
        .catch((err) => warningInfo(err.message));
}



// comments
const addComment = (comment) => ({
    type: Actions.ADD_COMMENT,
    data: comment
})


export const postComment = (message) => dispatch => {
    return fetch(baseUrl + "messages", {
        method: "POST",
        body: JSON.stringify(message),
        headers: {
            "Content-Type": "application/json"
        },
    })
        .then(responce => {
            if (responce.status >= 200 && responce.status < 300) {
                return responce;
            } else {
                let err = new Error("Error : " + responce.status + " " + responce.statusText);
                throw err;
            }
        })
        .then((responce) => {
            // dispatch(addComment(responce.data));
            successInfo("Your comment added successfully");
        })
        .catch(err => {
            warningInfo(err.message);
        })
}

const addComments = (data) => ({
    type: Actions.FETCH_COMMENTS,
    data: data
})

const commentFailed = (err) => ({
    type: Actions.COMMENTS_FAILED,
    data: err
})
export const fetchComments = () => dispatch => {
    const token = localStorage.getItem("token");
    return fetch(baseUrl + "messages", {
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token // if you use token
        }
    })
        .then((responce) => {
            if (responce.ok) {
                return responce.json();
            }
            else {
                let err = new Error("Error :" + responce.status + " : " + responce.statusText);
                throw err;
            }

        }).then((res) => {
            console.log(res);
            dispatch(addComments(res));
        })
        .catch(err => dispatch(commentFailed(err.message)));
}


const removeMessages = (ids) => ({
    type: Actions.REMOVE_MESSAGES,
    data: ids
})

export const deleteComments = (ids) => dispatch => {
    const token = localStorage.getItem("token");
    return fetch(baseUrl + "messages", {
        method: "DELETE",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token // if you use token
        },
        body: JSON.stringify(ids)
    })
        .then((responce) => {
            if (responce.ok) {
                return responce.json();
            }
            else {
                let err = new Error("Error :" + responce.status + " : " + responce.statusText);
                throw err;
            }

        }).then((res) => {
            if (res > 0) {
                dispatch(removeMessages(ids));
                successInfo("messages deleted successfully");
            }
            else {
                warningInfo("please select message from table");
            }
        })
        .catch(err => warningInfo(err.message));
};

// categories



const categoriesFailed = (err) => ({
    type: Actions.FAILED_CATEGORIES,
    data: err
});
const addCategories = (data) => ({
    type: Actions.ADD_CATEGORIES,
    data: data
})
export const fetchCategories = () => dispatch => {
    const token = localStorage.getItem("token");
    return fetch(baseUrl + "categories", {
        method: "GET",
        headers: {
            Authorization: 'Bearer ' + token // if you use token
        }
    })
        .then((responce) => {
            if (responce.ok) {
                return responce.json();
            }
            else {
                let err = new Error("Error :" + responce.status + " : " + responce.statusText);
                throw err;
            }

        }).then((res) => {
            dispatch(addCategories(res));
        })
        .catch(err => dispatch(categoriesFailed(err.message)));
}



// authentication
export const addUser = (creds, resetFields, setIsRegister) => {
    return fetch(baseUrl + "users/signup", {
        method: "POST",
        body: JSON.stringify(creds),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((res) => {
            if (res.ok) {
                resetFields();
            }
            return res.json();
        }).then((res) => {
            // let tstatus = (res.success) ? "success" : "warning";
            if (res.success) {
                setIsRegister(true);

            }
            else {
                warningInfo(res.message);
            }
        }).catch(err => {
            warningInfo(err.message)
        })
}


const removeUser = (ids) => ({
    type: Actions.REMOVE_USER,
    data: ids
})
// delete users
export const deleteUsers = (ids) => dispatch => {
    console.log("ids ", ids);
    const token = localStorage.getItem("token");
    return fetch(baseUrl + "users", {
        method: "DELETE",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token // if you use token
        },
        body: JSON.stringify(ids)
    }).then((res) => {
        if (res.ok) {
            return res.json();
        }
        let err = new Error("Error " + res.statusText + " " + res.status);
        throw err;
    }).then((res) => {
        if (res > 0) {
            dispatch(removeUser(ids));
            successInfo("users deleted successfully");
        }
        else {
            warningInfo("please select user from table");
        }
    })
        .catch((err) => warningInfo(err.message));
}



// login process
const sendLoginRequest = (creds) => ({
    type: Actions.REQUEST_LOGIN,
    data: creds
})


const loginReceved = (data) => ({
    type: Actions.LOGIN_SUCCESS,
    data: data
})

const loginFailed = (errMess) => ({
    type: Actions.LOGIN_FAILED,
    data: errMess
})

export const loginUser = (credentiels, resetForm) => dispatch => {
    dispatch(sendLoginRequest(credentiels.username));
    // console.log(credentiels.username);

    return fetch(baseUrl + "users/login", {
        method: "POST",
        body: JSON.stringify(credentiels),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((res) => {
        console.log(res);
        if (res.status >= 200 && res.status < 300) {
            return res;
        }
        else if (res.status === 401) {
            let err = new Error("username or password are incorrect");
            throw err;
        }
        let err = new Error("Error :" + res.status + " : " + res.statusText);
        throw err;
    }).then((response) => {
        console.log(response)
        return response.json();
    }).then((res) => {
        if (res.success) {
            localStorage.setItem("token", res.token);
            localStorage.setItem("admin", res.admin);
            localStorage.setItem("username", credentiels.username);
            console.log(localStorage.getItem('username'));
            dispatch(loginReceved(res));
            resetForm();
        }
        else {
            let err = new Error("Error", res.message);
            throw err;
        }
    }).catch(err => warningInfo(err.message));
}


// logout process
const requestLogout = () => ({
    type: Actions.REQUEST_LOGOUT
})

const successLogout = () => ({
    type: Actions.SUCCESS_LOGOUT
})



export const logout = () => dispatch => {
    dispatch(requestLogout());
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    localStorage.removeItem("username");
    history.push("/login");

    dispatch(successLogout());
    // redirect to home page
}



// fetch users
const usersLoading = () => ({
    type: Actions.LOAD_USERS
})

const addUsers = (users) => ({
    type: Actions.FETCH_USERS,
    data: users
})
const usersFailed = (err) => ({
    type: Actions.USERS_FAILED,
    data: err
})


export const fetchUsers = () => dispatch => {
    dispatch(usersLoading());
    const token = localStorage.getItem("token");

    return fetch(baseUrl + "users", {
        method: "GET",
        headers: {
            Authorization: 'Bearer ' + token // if you use token
        }
    })
        .then((res) => {
            if (res.status >= 200 && res.status < 300) {
                return res.json();
            }
            else {
                let err = new Error("Error :" + res.status + " : " + res.statusText);
                throw err;
            }
        }).then((users) => {
            dispatch(addUsers(users));
        }).catch(err => {
            dispatch(usersFailed(err));
        })
}


// skills

const skillsLoading = () => ({
    type: Actions.LOAD_SKILLS
})

const skillsFailed = (err) => ({
    type: Actions.FAILED_SKILLS,
    data: err
})


const addSkills = projects => ({
    type: Actions.ADD_SKILLS,
    data: projects
})

export function fetchSkills() {
    return function (dispatch) {
        dispatch(skillsLoading());
        return fetch(baseUrl + "skills")
            .then((result) => {
                if (!result.ok) {
                    console.log(result);
                    let err = new Error("Error " + result.statusText + " " + result.status);
                    throw err;
                }

                return result.json();
            })
            .then(responce => {

                dispatch(addSkills(responce));
            })
            .catch(err => {
                dispatch(skillsFailed(err.message));
            })
    }
}


const addSingleSkill = (data) => ({
    type: Actions.ADD_SKILL,
    data: data
})

const updateSkill = (data) => ({
    type: Actions.UPDATE_SKILL,
    data: data
})


export const addSkill = (data, resetFields, setFile) => dispatch => {
    const token = localStorage.getItem("token");
    return fetch(baseUrl + "skills", {
        method: "POST",
        headers: {
            Authorization: 'Bearer ' + token // if you use token
        },
        body: data

    })
        .then((result) => {
            if (!result.ok) {
                console.log(result);
                let err = new Error("Error " + result.statusText + " " + result.status);
                throw err;
            }
            // clear input field;
            resetFields();
            return result.json();
        })
        .then((res) => {
            dispatch(addSingleSkill(res));
            setFile([]);
            successInfo("skill added successfuly");
        })
        .catch(err => { warningInfo(err.message) });
}

const removeSkills = (data) => ({
    type: Actions.DELETE_SKILL,
    data: data
})


export const deleteSkills = (ids) => dispatch => {
    console.log("ids ", ids);
    const token = localStorage.getItem("token");
    return fetch(baseUrl + "skills", {
        method: "DELETE",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token // if you use token
        },
        body: JSON.stringify(ids)
    }).then((res) => {
        if (res.ok) {
            return res.json();
        }
        let err = new Error("Error " + res.statusText + " " + res.status);
        throw err;
    }).then((res) => {
        console.log(res);
        if (res > 0) {
            dispatch(removeSkills(ids));
            successInfo("skills deleted successfully");
        }
        else {
            warningInfo("please select user from table");
        }
    })
        .catch((err) => warningInfo(err.message));
}
