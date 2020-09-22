import React from "react";
import { useDispatch } from "react-redux";
import { postComment } from "../redux/actionsCreators"

import { MailFilled, LinkedinFilled, PhoneFilled } from "@ant-design/icons";
import { Form, Input, Button, Col, Row } from 'antd';
import { useForm } from "antd/lib/form/Form";



const validateMessages = {
    required: '${name} is required!',
    types: {
        email: '${name} is not validate email!'
    }
}


const tailLayout = {
    wrapperCol: {
        xs: { span: 24 },
        md: { span: 20, offset: 2 }
    },
};

const Contact = () => {

    const dispatch = useDispatch();
    const onFinish = (values) => {
        console.log('Success:', values);
        dispatch(postComment(values));
        form.resetFields();
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const [form] = useForm();
    return (
        <section className="contactContainer section" id="contactUs">
            <div className="container">

                <h1 className="text-center tropBold">GET IN <span className="primary">TOUCH</span></h1>
                <SocialMedia />
                <h4>
                    Feel free to send me a message:
                </h4>
                <Form
                    className="form"
                    form={form}
                    wrapperCol={{
                        xs: { span: 24 },
                        md: { span: 24 }
                    }}
                    name="contact"
                    initialValues={{
                        name: "",
                        email: "",
                        message: ""
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    validateMessages={validateMessages}
                >
                    <Form.Item
                        {...tailLayout}
                        name="name"
                        rules={[
                            {
                                required: true
                            },
                        ]}
                    >
                        <Input placeholder="Your name" className="form-control" />
                    </Form.Item>

                    <Form.Item
                        {...tailLayout}
                        name="email"
                        rules={[
                            {
                                required: true,
                                type: "email"
                            },
                        ]}
                    >
                        <Input placeholder="Your email" className="form-control" />
                    </Form.Item>

                    <Form.Item
                        {...tailLayout}
                        name="message"
                        rules={[
                            {
                                required: true
                            },
                        ]}
                    >
                        <Input.TextArea placeholder="your message" rows={6} className="form-control" />
                    </Form.Item>

                    <Form.Item
                        {...tailLayout}
                    >
                        <Button type="primary" htmlType="submit" className="btn">
                            Send Message
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </section>
    );
}



const SocialMedia = () => {
    return (
        <Row className="socialMediaContact">
            <Col span={8}>
                <span>Mail me</span>
                <MailFilled className="icon" />
                <span>elouadi.abdelali@gmail.com</span>
            </Col>
            <Col span={8}>
                <span>Call me</span>
                <PhoneFilled className="icon" fill="red" />
                <span>+21206060606</span>
            </Col>
            <Col span={8}>
                <span>Contact me</span>
                <LinkedinFilled className="icon" />
                <span>On Linkden</span>
            </Col>
        </Row>

    );
}







// const Contact = () => {
//     const [state, setValue] = useState({ name: "", email: "", message: "" });

//     const dispatch = useDispatch();


//     const handleChange = (event) => {
//         const target = event.target;
//         const { name, value } = target

//         setValue(prev => ({
//             ...prev,
//             [name]: value
//         }))
//     }

//     const handleSubmit = e => {
//         e.preventDefault();
//         dispatch(postComment(state.name, state.email, state.email))
//         // reset initial state;
//         setValue({
//             name: '',
//             email: '',
//             message: ''
//         })

//     }

//     return (
//         <div className="contact">
//             <ToastContainer
//                 position="top-right"
//                 autoClose={5000}
//                 hideProgressBar={false}
//                 newestOnTop={false}
//                 closeOnClick
//                 rtl={false}
//                 pauseOnFocusLoss
//                 draggable
//                 pauseOnHover
//             />
//             {/* Same as */}
//             <ToastContainer />
//             <div className="contactInfo">
//                 <h3 className="title">Contact Us</h3>
//                 <form onSubmit={handleSubmit}>
//                     <div className="form-group">
//                         <label htmlFor="name">Name</label>
//                         <input name="name" type="text" placeholder="your name"
//                             id="name" className="form-control"
//                             value={state.name}
//                             onChange={handleChange} />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="email">Email</label>
//                         <input name="email" type="text" placeholder="your email"
//                             id="email" className="form-control"
//                             value={state.email}
//                             onChange={handleChange} />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="message">Message</label>
//                         <textarea name="message" id="message"
//                             className="form-control" rows='6'
//                             value={state.message}
//                             onChange={handleChange}>
//                         </textarea>
//                     </div>
//                     <div className="form-group">
//                         <button className="btn">
//                             send Message
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }


export default Contact;