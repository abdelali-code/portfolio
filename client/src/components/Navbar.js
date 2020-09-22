import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actionsCreators";
import { Layout, Menu } from "antd";
import { HomeOutlined, ShopOutlined, LoginOutlined, LogoutOutlined } from "@ant-design/icons";





/*

page structure 
const {Header, Content, Footer} = layout;



*/



const { Header } = Layout;


const iconSize = {
    fontSize: "20px"
}
const Navbar = (props) => {

    // to set the current active nav
    const [activeNav, setActiveNav] = useState("home");
    const handleClick = e => {
        setActiveNav(e.key);
    };


    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
    }
    return (
        <Header className="header">
            <div className="logo">logo</div>
            {/* render this is the login users are not admin */}
            {!state.authentication.isAdmin ?
                <Menu mode="horizontal" onClick={handleClick} selectedKeys={[activeNav]} className="nav-list" theme="dark">
                    <Menu.Item key="home" className="link-item">
                        <Link to="/" >
                            <HomeOutlined style={iconSize} />
                            <span className="links"> Home</span>
                        </Link>
                    </Menu.Item>

                    {/* <Menu.Item key="home" className="link-item">
                        <Link to="/" >
                            <HomeOutlined style={iconSize} />
                            <span className="links"> Home</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="about" className="link-item">
                        <Link to={`/#aboutUs`}>
                            <UserOutlined style={iconSize} />
                            <span className="links">AboutUs</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="contact" className="link-item">
                        <a href="#contactUs">
                            <ContactsOutlined style={iconSize} />
                            <span className="links">ContactUs</span>
                        </a>
                    </Menu.Item>
                    <Menu.Item key='portfolio' className="link-item">
                        <a href="#portfolio">
                            <ShopOutlined style={iconSize} />
                            <span className="links">Portfolio</span>
                        </a>
                    </Menu.Item> */}
                    <Menu.Item key='blog' className="link-item">
                        <Link to="/blog">
                            <ShopOutlined style={iconSize} />
                            <span className="links">Blog</span>
                        </Link>
                    </Menu.Item>
                    {!state.authentication.isAuthenticated
                        ?
                        <Menu.Item key='login' className="link-item">
                            <Link to="/login">
                                <LoginOutlined style={iconSize} />
                                <span className="links">Login</span>
                            </Link>
                        </Menu.Item>
                        :
                        <Menu.Item key='logout' className="link-item" onClick={handleLogout}>

                            <LogoutOutlined style={iconSize} />
                            <span className="links">logout</span>

                        </Menu.Item>}
                </Menu>
                :
                // render this if user is admin
                <AdminNav handleClick={handleClick} activeNav={activeNav} handleLogout={handleLogout} state={state} />
            }
        </Header>
    );
}


const AdminNav = ({ handleClick, activeNav, handleLogout, state }) => {

    if (state.authentication.isAdmin) {
        return (
            <Menu mode="horizontal" onClick={handleClick} selectedKeys={[activeNav]} className="nav-list" theme="dark">
                <Menu.Item key="home" className="link-item">
                    <Link to="/" >
                        <HomeOutlined style={iconSize} />
                        <span className="links"> Home</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key='portfolio' className="link-item">
                    <Link to="/dashboard">
                        <ShopOutlined style={iconSize} />
                        <span className="links">Dashboard</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key='logout' className="link-item" onClick={handleLogout}>
                    <LogoutOutlined style={iconSize} />
                    <span className="links">logout</span>
                </Menu.Item>
            </Menu>

        );
    }
    else return null
}

export default Navbar;