import React, { useState } from 'react';
import { Button, Table, Divider, Popconfirm, Space, Tag, Breadcrumb } from 'antd';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { deleteComments } from "../../redux/actionsCreators";




const columns = [
    {
        title: 'name',
        dataIndex: 'name',
        // render: (text, record) => <Link to={'/dashboard/users/' + record.id}>{text}</Link>,
    },
    {
        title: 'email',
        dataIndex: 'email',
    },
    {
        title: 'message',
        dataIndex: 'message',
        render: (text, record) => (
            <Space size="middle">
                {text}
                {(((Date.now() - Date.parse(record.createdAt)) / 1000) / 3600) < 24 ? <Tag color="red">new</Tag> : null}
            </Space>
        )
    }
];


const Comments = () => {

    const [selectedRow, setSelectedRow] = useState([]);
    const dispatch = useDispatch();
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRow(selectedRowKeys);
        }
    }


    const confirm = () => {
        dispatch(deleteComments(selectedRow));
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
                    Messages
                </Breadcrumb.Item>
            </Breadcrumb>
            <div className="container">
                <h3>messages:</h3>
                <Divider />
                <div>
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
                    dataSource={state.comments.comments}
                    rowKey={record => record.id}
                />
            </div>
        </main>
    );
};




export default Comments;