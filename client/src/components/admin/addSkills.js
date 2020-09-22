import React, { useState } from "react";
import { Form, Input, Button, Upload, Modal, Select, Breadcrumb, Divider } from "antd";
import { useForm } from "antd/lib/form/Form";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addSkill } from "../../redux/actionsCreators";

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



const AddSkill = (props) => {

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
        console.log(fileList[0].originFileObj);
    };




    // const dispatch = useDispatch();
    const onFinish = (values) => {
        console.log(values);
        const formData = new FormData();
        formData.append("name", values.name);
        if (fileList.length > 0) {
            formData.append("image", fileList[0].originFileObj);
        }
        dispatch(addSkill(formData, form.resetFields, setFile));
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const [form] = useForm();



    return (
        <section className="main">
            <Breadcrumb className="breadcrumb">
                <Breadcrumb.Item>
                    <Link to="/dashboard">dashboard</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to="/dashboard/skills">skills</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    add
                </Breadcrumb.Item>
            </Breadcrumb>
            <div className="container">
                <h3>add skills</h3>
                <Divider />
                <Form
                    layout="vertical"
                    className="form"
                    form={form}
                    wrapperCol={{
                        xs: { span: 24 },
                        md: { span: 24 }
                    }}
                    name="addSkill"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    validateMessages={validateMessages}
                >
                    <Form.Item
                        {...tailLayout}
                        label="name"
                        name="name"
                        rules={[
                            {
                                required: true
                            },
                        ]}
                    >
                        <Input placeholder="skill name" className="form-control" />
                    </Form.Item>

                    {/* image  */}
                    <Form.Item
                        {...tailLayout}
                        name="image"
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
                            <img alt="example" style={{ width: "100%" }} src={previewImage} />
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



export default AddSkill;