import React, { useState } from 'react';
import { Button, Table, Divider, Popconfirm, Breadcrumb } from 'antd';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUsers } from "../../redux/actionsCreators";
import { useDispatch } from "react-redux";


const columns = [
    {
        title: 'username',
        dataIndex: 'username',
        // render: (text, record) => <Link to={'/dashboard/users/' + record.id}>{text}</Link>,
    },
    {
        title: 'firstname',
        dataIndex: 'firstname',
    },
    {
        title: 'lastname',
        dataIndex: 'lastname',
    },
    {

        title: 'description',
        dataIndex: 'description'
    }
];


const Users = () => {

    const [selectedRow, setSelectedRow] = useState([]);

    const dispatch = useDispatch();
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRow(selectedRowKeys);
        }
    }


    const confirm = () => {
        dispatch(deleteUsers(selectedRow));
    }

    const cancel = () => {
        setSelectedRow();
    }


    const state = useSelector(state => state);
    return (
        <main className="main">
            <Breadcrumb className="breadcrumb">
                <Breadcrumb.Item>
                    <Link to="/dashboard">dashboard</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    Users
                </Breadcrumb.Item>
            </Breadcrumb>
            <div className="container">
                <h3>Users:</h3>
                <Divider />
                <div className="addNew">
                    <Popconfirm
                        title="Are you sure delete "
                        onConfirm={confirm}
                        onCancel={cancel}
                        okText="delete"
                        cancelText="No"
                    >
                        <Button className="delete">Delete</Button>
                    </Popconfirm>                </div>
                <Table
                    rowSelection={{
                        type: "checkbox",
                        ...rowSelection
                    }}
                    columns={columns}
                    dataSource={state.users.users}
                    rowKey={record => record.id}
                />
            </div>
        </main>
    );
};




export default Users;