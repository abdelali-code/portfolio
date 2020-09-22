import React, { Component, useEffect } from "react";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Footer from "./Footer";
import Projects from "./Projects";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects, fetchCategories, fetchUsers, fetchComments, fetchSkills } from "../redux/actionsCreators";
import { Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import AddProject from "./admin/addProject";
import Dashboard from './admin/dashboard';
import { Register, Login } from "./Authentication";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import Users from "./admin/users";
import UpdateProject from "./admin/updateProject";
import Comments from "./admin/messages";
import addSkill from "./admin/addSkills";
import ProjectsLit from "./admin/projects";
import SkillList from "./admin/skills";

const Main = () => {

    const dispatch = useDispatch();
    const state = useSelector(state => state);
    console.log(state.authentication.isAdmin);
    useEffect(() => {
        dispatch(fetchProjects());
        dispatch(fetchCategories());
        dispatch(fetchSkills());
        if (state.authentication.isAdmin) {
            dispatch(fetchUsers())
            dispatch(fetchComments());
        }
    }, [dispatch, state.authentication.isAdmin]);

    const FrontPage = () => {
        return (
            <>
                <Home />
                <About />
                <Contact />
                <Projects projects={state.projects.projects}
                    errMess={state.projects.errMess}
                    isLoading={state.projects.isLoading} />
                {/* <LatestArticles articles={(articles.articles.length > 3) ? articles.articles.slice(0, 3) : articles.articles}
                errMess={articles.errMess}
                isLoading={articles.isLoading} /> */}
            </>
        );
    }

    const UpdateProjectWithId = ({ match }) => {
        // console.log("params ", match.params.prId);
        // if (state.authentication.isAdmin) {
        return (
            <UpdateProject project={state.projects.projects.filter((pro) => pro.id === Number(match.params.prId))[0]}
                categories={state.categories.categories} />
        );
        // } else {
        //     return null;
        // }
    }


    const ProtectedUserRoute = ({ component: Component, ...rest }) => (
        <Route {...rest} render={(props) => (
            !state.authentication.isAuthenticated
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/',
                    state: { from: props.location }
                }} />
        )} />
    )






    const ProtectedAdminRoute = ({ component: Component, ...rest }) => (

        < Route {...rest} render={(props) => (

            state.authentication.isAdmin
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                }} />
        )} />
    )
    // based the current if sign in or not



    return (
        <div className="App">
            <Navbar />
            <Switch>
                <Route exact path="/" component={FrontPage} />
                <ProtectedUserRoute exact path="/login" component={Login} />
                <ProtectedUserRoute exact path="/register" component={Register} />
                <ProtectedAdminRoute exact path="/dashboard" component={Dashboard} />
                <ProtectedAdminRoute exact path="/dashboard/users" component={Users} />
                <ProtectedAdminRoute exact path="/dashboard/projects" component={() => <ProjectsLit projects={state.projects} />} />
                <ProtectedAdminRoute exact path="/dashboard/messages" component={Comments} />
                <ProtectedAdminRoute exact path="/dashboard/messages" component={Comments} />
                <ProtectedAdminRoute exact path="/dashboard/skills" component={SkillList} />
                <ProtectedAdminRoute exact path="/dashboard/skills/add" component={addSkill} />
                <ProtectedAdminRoute exact path="/dashboard/projects/add"
                    component={() => <AddProject categories={state.categories.categories} />} />
                {/* <Route exact path="/dashboard/projects/update/:prId" component={UpdateProjectWithId} /> */}
                <ProtectedAdminRoute exact path="/dashboard/projects/update/:prId" component={UpdateProjectWithId} />
                <Route path="*" component={() => "404 not found"} />
            </Switch>
            <Footer />
        </div>
    );
}



export default Main;