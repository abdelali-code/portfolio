import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom"
import { addUser, loginUser } from "../redux/actionsCreators";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Form, Input, Button, Alert } from 'antd';
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useForm } from "antd/lib/form/Form";



const Login = () => {

    const dispatch = useDispatch();
    const onFinish = (values) => {
        console.log(values);
        dispatch(loginUser(values, form.resetFields));

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    const [form] = useForm();

    return (
        <section className="auth">
            <div className="container">
                <Form
                    form={form}
                    name="basic"
                    className="authForm"
                    initialValues={{
                        username: "",
                        password: ""
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        name="username"
                        className="authFormItem"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input size="large" placeholder="username" prefix={<UserOutlined />} className="authInput" />
                    </Form.Item>

                    <Form.Item
                        className="authFormItem"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password size="large" placeholder="Password" className="authInput" prefix={<LockOutlined />} />
                    </Form.Item>

                    <Form.Item >
                        <Button htmlType="submit" type="primary" className="login-form-button">
                            login
                        </Button >
                    </Form.Item>
                </Form>
                <p className="text-center">Don't have an account <Link to="/register">Register</Link></p>
            </div>
        </section>
    );
};




const validateMessages = {
    required: '${name} is required!',
    types: {
        email: 'is not validate email!'
    }
}


const Register = () => {
    const [isRegister, setIsRegister] = useState(false);

    const onFinish = (values) => {
        addUser(values, form.resetFields, setIsRegister);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    const [form] = useForm();
    return (
        <section className="auth">
            <div className="container">
                {/* alert to tell users is register successfully */}
                {isRegister ? <Alert message="Success register try log in " type="success" showIcon /> : null}
                <Form
                    form={form}
                    name="basic"
                    className="authForm"
                    initialValues={{
                        username: "",
                        password: "",
                        firstname: "",
                        lastname: "",
                        email: ""
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    validateMessages={validateMessages}
                >

                    <Form.Item
                        name="username"
                        className="authFormItem"
                        rules={[
                            {
                                required: true
                            },
                        ]}
                    >
                        <Input size="large" placeholder="username" className="authInput" />
                    </Form.Item>

                    <Form.Item
                        name="firstname"
                        className="authFormItem"
                        rules={[
                            {
                                required: true
                            },
                        ]}
                    >
                        <Input size="large" placeholder="firstname" className="authInput" />
                    </Form.Item>

                    <Form.Item
                        name="lastname"
                        className="authFormItem"
                        rules={[
                            {
                                required: true
                            },
                        ]}
                    >
                        <Input size="large" placeholder="lastname" className="authInput" />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        className="authFormItem"
                        rules={[
                            {
                                required: true,
                                type: "email"
                            },
                        ]}
                    >
                        <Input size="large" placeholder="email" className="authInput" />
                    </Form.Item>


                    <Form.Item
                        className="authFormItem"
                        name="password"
                        rules={[
                            {
                                required: true
                            },
                        ]}
                    >
                        <Input.Password size="large" placeholder="Password" className="authInput" />
                    </Form.Item>

                    <Form.Item >
                        <Button htmlType="submit" type="primary" className="login-form-button">
                            Register
                        </Button >
                    </Form.Item>
                </Form>
                <p className="text-center">have an account <Link to="/login">login</Link></p>
            </div>
        </section>
    );
}


export { Register, Login };

// const Login = (props) => {


//     const initialValues = {
//         username: '',
//         password: ''
//     }
//     const onSubmit = (values, actions) => {
//         // alert(JSON.stringify(values));
//         dispatch(loginUser(values, actions));
//     }

//     const dispatch = useDispatch();


//     const validate = values => {
//         const errors = {};
//         if (!values.username) {
//             errors.username = "required";
//         }
//         if (!values.password) {
//             errors.password = "please fill password";
//         }
//         return errors;
//     }


//     return (
//         <div className="authentication">
//             <div className="authContainer">
//                 <h3>Login</h3>
//                 <Formik
//                     initialValues={initialValues}
//                     onSubmit={onSubmit}
//                     validate={validate}>
//                     {props => (
//                         <>
//                             <Form >
//                                 <label htmlFor='username'>Username</label>
//                                 <Field type="text" id="username"
//                                     name="username" placeholder="username" />
//                                 <ErrorMessage name="username" />
//                                 <label htmlFor='password'>Password</label>
//                                 <Field type="password" id="password"
//                                     name="password"
//                                     placeholder="password" />
//                                 <ErrorMessage name="password" />
//                                 <button type="submit">log in</button>
//                             </Form>
//                             <React.Fragment>
//                                 {props.isSubmitting ? ( // isSubmitting IS A FORMIK PROPS
//                                     <progress
//                                         size={20}
//                                     />
//                                 ) : null}
//                             </React.Fragment>
//                         </>
//                     )}
//                 </Formik>
//                 <p className="question">don't have an accout <button className="switch">Register</button></p>
//             </div>
//         </div>
//     );
// }



// const Register = (props) => {
//     const [isRegister, setIsRegister] = useState(false);
//     const validate = values => {
//         const errors = {};
//         if (!values.firstname) {
//             errors.firstname = 'Required';
//         } else if (values.firstname.length > 20) {
//             errors.firstname = 'Must be 20 characters or less';
//         } else if (values.firstname.length < 3) {
//             errors.firstname = 'Must greater than 3';
//         }

//         if (!values.lastname) {
//             errors.lastname = 'Required';
//         } else if (values.lastname.length > 20) {
//             errors.lastname = 'Must be 20 characters or less';
//         } else if (values.lastname.length < 3) {
//             errors.lastname = 'Must be greater than 3';
//         }

//         if (!values.username) {
//             errors.username = 'Required';
//         } else if (values.username.length > 20) {
//             errors.email = 'Must be 20 characters or less';
//         }
//         if (!values.password) {
//             errors.password = 'Required';
//         } else if (values.password.length < 6) {
//             errors.password = 'Must greater than 6 character';
//         }

//         return errors;
//     };

//     const initialValues = {
//         username: '',
//         lastname: '',
//         firstname: '',
//         password: ''
//     }
//     const onSubmit = (values, actions) => {
//         addUser(values, actions, setIsRegister);
//     }


//     const tryLogin = _ => {
//         if (isRegister) {
//             return (
//                 <div>
//                     your are register now try log in <Link to="login">Login</Link>
//                 </div>
//             );
//         }
//         return null;
//     }


//     return (
//         <div className="authentication">
//             <div className="authContainer">
//                 {tryLogin()}
//                 <ToastContainer
//                     position="top-right"
//                     autoClose={5000}
//                     hideProgressBar={false}
//                     newestOnTop={false}
//                     closeOnClick
//                     rtl={false}
//                     pauseOnFocusLoss
//                     draggable
//                     pauseOnHover
//                 />
//                 {/* Same as */}
//                 <ToastContainer />

//                 <h3>Register</h3>
//                 <Formik initialValues={initialValues} onSubmit={onSubmit} validate={validate}>
//                     {props => (
//                         <>
//                             <Form >
//                                 <label htmlFor='username'>Username</label>
//                                 <Field type="text" id="username"
//                                     name="username" placeholder="username" />
//                                 <ErrorMessage name="username" />
//                                 <label htmlFor='firstname'>Firstname</label>
//                                 <Field type="text" id="firstname"
//                                     name="firstname" placeholder="firstname" />
//                                 <ErrorMessage name="firstname" />
//                                 <label htmlFor='lastname'>lastname</label>
//                                 <Field type="text" id="lastname"
//                                     name="lastname" placeholder="lastname" />
//                                 <ErrorMessage name="lastname" />
//                                 <label htmlFor='password'>Password</label>
//                                 <Field type="password" id="password"
//                                     name="password"
//                                     placeholder="password" />
//                                 <ErrorMessage name="password" />
//                                 <button type="submit">log in</button>
//                             </Form>
//                             <React.Fragment>
//                                 {props.isSubmitting ? ( // isSubmitting IS A FORMIK PROPS
//                                     <progress
//                                         size={20}
//                                     />
//                                 ) : null}
//                             </React.Fragment>
//                         </>
//                     )}
//                 </Formik>

//                 <p className="question">already have an accout<button className="switch">login</button></p>
//             </div>
//         </div >
//     );
// }
// const layout = {
//     wrapperCol: {
//         span: 9,
//         offset: 7
//     }
// };
// const tailLayout = {
//     wrapperCol: {
//         span: 24,
//         offset: 10
//     },
// };
