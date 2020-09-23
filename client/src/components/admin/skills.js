import React, { useState } from 'react';
import { Button, Table, Divider, Popconfirm, Space, Tag, Breadcrumb } from 'antd';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { deleteSkills } from "../../redux/actionsCreators";
import { baseUrl } from "../../shared/baseUrl";



const columns = [
    {
        title: 'name',
        dataIndex: 'name',
        // render: (text, record) => <Link to={'/dashboard/users/' + record.id}>{text}</Link>,
    },
    {
        title: "image",
        dataIndex: "image",
        render: (text, record) => (
            <img
                width={128}
                height={150}
                alt="logo"
                src={baseUrl + record.image}
            />
        )
    }
];


const SkillsList = () => {

    const [selectedRow, setSelectedRow] = useState([]);
    const dispatch = useDispatch();
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRow(selectedRowKeys);
        }
    }


    const confirm = () => {
        dispatch(deleteSkills(selectedRow));
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
                    Skills
                </Breadcrumb.Item>
            </Breadcrumb>
            <div className="container">
                <div className="pageTitle">
                    <h3>skills List : </h3>
                    <Button type="primary">
                        <Link to='/dashboard/skills/add'>
                            add New
                    </Link>
                    </Button>
                </div>
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

                    </Popconfirm>
                </div>
                <Table
                    rowSelection={{
                        type: "checkbox",
                        ...rowSelection
                    }}
                    columns={columns}
                    dataSource={state.skills.skills}
                    rowKey={record => record.id}
                />
            </div>
        </main>
    );
};




export default SkillsList;