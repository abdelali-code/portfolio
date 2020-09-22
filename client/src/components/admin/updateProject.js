import React, { useState } from "react";
import { Form, Input, Button, Upload, Modal, Divider, Select, Breadcrumb } from "antd";
import { useForm } from "antd/lib/form/Form";
import { PlusOutlined } from "@ant-design/icons";
import { updatePr } from "../../redux/actionsCreators";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { baseUrl } from "../../shared/baseUrl";


const validateMessages = {
    required: '${name} is required!',
}


const tailLayout = {
    wrapperCol: {
        xs: { span: 24 },
        md: { span: 16 }
    }
};


function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}



const UpdateProject = (props) => {
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [fileList, setFile] = useState([]);
    const dispatch = useDispatch();



    const handleCancel = () => setPreviewVisible(false);


    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
    };

    const handleChange = ({ fileList }) => {
        setFile(fileList)
    };




    // const dispatch = useDispatch();
    const onFinish = (values) => {
        console.log("values ", values);
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("siteUrl", values.siteUrl);
        formData.append("technologies", values.technologies);
        if (fileList.length > 0) {
            formData.append("image", fileList[0].originFileObj);
        }
        formData.append("CategoryId", values.CategoryId);
        dispatch(updatePr(formData, props.project.id));
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const [form] = useForm();


    return (
        <section className="addProject">
            <Breadcrumb className="breadcrumb">
                <Breadcrumb.Item>
                    <Link to="/dashboard">dashboard</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to="/dashboard/projects">projects</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    update
                </Breadcrumb.Item>
            </Breadcrumb>
            <div className="container main">
                <h3>Update Project:</h3>
                <Divider />
                <Form
                    layout="vertical"
                    className="form"
                    form={form}
                    initialValues={props.project}
                    wrapperCol={{
                        xs: { span: 24 },
                        md: { span: 24 }
                    }}
                    name="addPr"

                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    validateMessages={validateMessages}
                >
                    <Form.Item
                        {...tailLayout}
                        label="title"
                        name="title"
                        rules={[
                            {
                                required: true
                            },
                        ]}
                    >
                        <Input placeholder="project title" className="form-control" />
                    </Form.Item>

                    <Form.Item
                        {...tailLayout}
                        label="project description"
                        name="description"
                    // rules={[
                    //     {
                    //         required: true
                    //     },
                    // ]}
                    >
                        <Input.TextArea placeholder="project description" rows={6} className="form-control" />
                    </Form.Item>

                    <Form.Item
                        {...tailLayout}
                        name="siteUrl"
                        label="project or github link"
                        rules={[
                            {
                                required: true
                            }
                        ]}
                    >
                        <Input placeholder="site Url or github link" className="form-control" />
                    </Form.Item>

                    <Form.Item
                        {...tailLayout}
                        name="technologies"
                        label="technologies used seperate by ','"
                        rules={[
                            {
                                required: true
                            },
                        ]}
                    >
                        <Input placeholder="technologie used separated by ','" className="form-control" />
                    </Form.Item>

                    <Form.Item
                        {...tailLayout}
                        name="CategoryId"
                        label="category"
                        rules={[
                            {
                                required: true
                            },
                        ]}
                    >
                        <Select>
                            {props.categories.map((cat) => (
                                <Select.Option key={cat.id} value={cat.id}>{cat.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    {/* image  */}
                    <Form.Item
                        {...tailLayout}
                    >
                        <Upload
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                            beforeUpload={() => false} // return false so that antd doesn't upload the picture right away
                        >
                            {fileList.length >= 1 ? null : <div> <PlusOutlined /><div style={{ marginTop: 8 }}>image</div></div>}
                        </Upload>


                        <Modal
                            visible={previewVisible}
                            footer={null}
                            onCancel={handleCancel}
                        >
                            <img alt="project" style={{ width: "100%" }} src={previewImage} />
                        </Modal>
                    </Form.Item>

                    {/* ************ */}
                    <Form.Item
                        {...tailLayout}
                    >
                        <Button htmlType="submit" type="primary">
                            add
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </section>
    );
}



export default UpdateProject;