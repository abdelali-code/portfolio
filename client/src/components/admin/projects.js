import React from "react";
import { List, Popconfirm, Divider, Button, Breadcrumb } from "antd";
import { Link } from 'react-router-dom';
import { baseUrl } from "../../shared/baseUrl";
import { useDispatch } from "react-redux";
import { deleteProjects } from "../../redux/actionsCreators";

const ProjectsLit = (props) => {

    const dispatch = useDispatch();
    const confirm = (id) => {
        dispatch(deleteProjects(id));
    }
    return (
        <main className="main">
            <Breadcrumb className="breadcrumb">
                <Breadcrumb.Item>
                    <Link to="/dashboard">dashboard</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    projects
                </Breadcrumb.Item>
            </Breadcrumb>
            <div className="container">
                <div className="pageTitle">
                    <h3>projects List : </h3>
                    <Button type="primary">
                        <Link to='/dashboard/projects/add'>
                            add New
                    </Link>
                    </Button>
                </div>
                <Divider />
                <List
                    className="demo-loadmore-list"
                    loading={props.projects.isLoading}
                    itemLayout="horizontal"
                    dataSource={props.projects.projects}
                    renderItem={item => (
                        <List.Item
                            actions={[
                                <Link to={`/dashboard/projects/update/${item.id}`} key={`edit${item.id}`}>
                                    <Button type="primary">edit</Button>
                                </Link>,
                                <div key={`delete${item.id}`}>
                                    <Popconfirm
                                        placement="topRight"
                                        title={`are you sure to want to delete "${item.title}"`}
                                        onConfirm={() => confirm(item.id)}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button className="delete">delete</Button>
                                    </Popconfirm>
                                </div>
                            ]}
                            extra={
                                <img
                                    width={272}
                                    height={150}
                                    alt={item.title}
                                    src={baseUrl + item.image}
                                />
                            }
                        >
                            <List.Item.Meta
                                title={<Link to={`/dashboard/projects/update/${item.id}`}>{item.title}</Link>}
                            />
                        </List.Item>
                    )}
                />
            </div>
        </main>
    );
}


export default ProjectsLit;