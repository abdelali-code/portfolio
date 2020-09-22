import { Col, Row, Card } from "antd";
import React from "react";
import { baseUrl } from "../shared/baseUrl";
import Loading from "./Loading";

const RenderProjects = ({ projects }) => {

    const prs = projects.map(pr => {
        return (
            <Col md={12} className="project" key={pr.id}>
                <a href={pr.siteUrl} alt={pr.title}>
                    <Card
                        className="projectCard"
                        style={{ width: "100%", height: 250 }}
                        cover={<img alt="example" src={baseUrl + pr.image} style={{ width: "100%", height: 247 }} />}
                    >
                    </Card>
                    <div className="projectHover">
                        {pr.title}
                    </div>
                </a>
            </Col>
        );
    })
    return prs;
}



const Projects = (props) => {
    const { projects, errMess, isLoading } = props;

    if (isLoading) {
        return (
            <Loading />
        );
    }
    else if (errMess) {

        return (
            <div className="text-danger text-center">
                {errMess}
            </div>
        );
    }
    else if (projects.length > 0) {
        return (
            <section className="portfolioContainer section" id="portfolio">
                <div className="container">
                    <h1 className="text-center tropBold">MY <span className="primary">PORTFOLIO</span></h1>
                    <div className="portfolio">
                        <Row gutter={[32, 32]}>
                            <RenderProjects projects={projects} />
                        </Row>
                    </div>
                </div>
            </section>
        );
    }
    else {
        return null;
    }
}

export default Projects;