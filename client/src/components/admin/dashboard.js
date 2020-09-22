import React from "react";
import { List } from "antd";
import { Link } from "react-router-dom";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";




const deleteItem = {
    color: "red",
    fontSize: "rgb(255, 59, 59)"
}
const Dashboard = () => {

    return (

        <main className="main">
            <div className="container">
                <h3>Site Administration</h3>
                <List
                    header={<div className="tHead">availabe table</div>}
                    bordered
                    className="items"
                >
                    <List.Item >
                        <Link to="/dashboard/users">Users</Link>
                        <Link to='/dashboard/users'><DeleteOutlined style={deleteItem} />delete</Link>
                        <Link to="/dashboard/users/add"><PlusOutlined />add</Link>
                    </List.Item>

                    <List.Item >
                        <Link to="/dashboard/projects">Projects</Link>
                        <Link to='/dashboard/projects'><DeleteOutlined style={deleteItem} />delete</Link>
                        <Link to="/dashboard/projects/add"><PlusOutlined />add</Link>
                    </List.Item>

                    <List.Item>
                        <Link to="/dashboard/messages">Messages</Link>
                        <Link to='/dashboard/messages'><DeleteOutlined style={deleteItem} />delete</Link>
                        <Link to="/dashboard/messages"><PlusOutlined />add</Link>
                    </List.Item>
                </List>
            </div>
        </main>
    );
}



export default Dashboard;