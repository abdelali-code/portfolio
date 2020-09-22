import React from "react";
import { Col, Divider, List, Row, Image } from "antd";



const About = () => {
    return (
        <section className="about section" id="aboutUs">
            <div className="container">
                <h1 className="text-center tropBold">ABOUT <span className="primary">ME</span></h1>
                <h3>Personnel Info</h3>
                <Row gutter={[20, 20]} className="personnelInfo">
                    <Col lg={6} sm={12} xs={24}>
                        <List className="firstList">
                            <List.Item className="listItem"><span className="key">First Name :</span> Abdelali</List.Item>
                            <List.Item className="listItem"><span className="key">Last Name :</span> EL Ouadi</List.Item>
                            <List.Item className="listItem"><span className="key">Nationality :</span> Moroccan</List.Item>
                            <List.Item className="listItem"><span className="key">Freelance :</span> Available</List.Item>
                        </List>
                    </Col>
                    <Col lg={6} sm={12} xs={24}>
                        <List className="secondList">
                            <List.Item className="listItem"><span className="key">Address  :</span> Morocco</List.Item>
                            <List.Item className="listItem"><span className="key">Phone :</span> +2120600000000</List.Item>
                            <List.Item className="listItem"><span className="key">Email :</span> elouadiabdelali@gmail.com</List.Item>
                            <List.Item className="listItem"><span className="key">Langages  :</span> Arabe</List.Item>
                        </List>
                    </Col>
                </Row>
                <Divider orientation="left" style={{ borderColor: "#5d5d5c" }} />
                <div className="skillsContainer">
                    <h3 className="text-center">My Skills</h3>
                    <Row gutter={[24, 24]}>
                        <Col md={6} xs={12} className="skill">
                            <div>
                                <Image src="/images/sass.svg" width="100%" height="100%" />
                            </div>
                            <span className="skillName">Sass</span>
                        </Col>
                        <Col md={6} xs={12} className="skill">
                            <div>
                                <Image src="/images/css.svg" width="100%" height="100%" />
                            </div>
                            <span className="skillName">Css</span>
                        </Col>
                        <Col md={6} xs={12} className="skill">
                            <div>
                                <Image src="/images/html-5.svg" width="100%" height="100%" />
                            </div>
                            <span className="skillName">Html</span>
                        </Col>
                        <Col md={6} xs={12} className="skill">
                            <div>
                                <Image src="/images/javascript.svg" width="100%" height="100%" />
                            </div>
                            <span className="skillName">Javascript</span>
                        </Col>
                        <Col md={6} xs={12} className="skill">
                            <div>
                                <Image src="/images/nodejs.svg" width="100%" height="100%" />
                            </div>
                            <span className="skillName">NodeJs</span>
                        </Col>
                        <Col md={6} xs={12} className="skill">
                            <div>
                                <Image src="/images/mysql.svg" width="100%" height="100%" />
                            </div>
                            <span className="skillName">Mysql</span>
                        </Col>
                    </Row>
                </div>
            </div>
        </section>
    );
}


export default About;