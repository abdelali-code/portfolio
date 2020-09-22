import { Button, Tooltip } from "antd";
import React from "react";
import { HomeOutlined, UserOutlined, ContactsOutlined, ShopOutlined } from "@ant-design/icons";




const iconSize = {
    fontSize: "18px"
}
const Home = () => {
    return (
        <div className="fontPage" id="home">
            <div className="frontContainer">
                <h3 className="hello">HI THERE !</h3>
                <h1>I'M <span className="name primary">ElOUDAI ABDELALI</span></h1>
                <p className="descritpion">
                    I'm a Moroccan based && full stack developer focused on crafting clean & user‑friendly experiences,
                    I am passionate about building excellent software that improves the lives of those around me.
                </p>
                <Button type="primary" className="btn more">
                    <a href="#aboutUs">more about me<UserOutlined style={iconSize} className="moreIcon" />
                    </a>
                </Button>
            </div>
            {/* navigation menu */}
            <ul className="menu">
                <Tooltip placement="leftTop" title="Home">
                    <li>

                        <a href="#home">
                            <HomeOutlined />
                        </a>
                    </li>
                </Tooltip>
                <Tooltip placement="leftTop" title="AboutUs">
                    <li>

                        <a href="#aboutUs">
                            <UserOutlined />
                        </a>
                    </li>
                </Tooltip>
                <Tooltip placement="leftTop" title="Contact">
                    <li>

                        <a href="#contactUs">
                            <ContactsOutlined />
                        </a>
                    </li>
                </Tooltip>
                <Tooltip placement="leftTop" title="Portfolio">
                    <li>

                        <a href="#portfolio">
                            <ShopOutlined />
                        </a>
                    </li>
                </Tooltip>
            </ul>
            {/* end of navigation menu */}
        </div>
    );
}

export default Home;