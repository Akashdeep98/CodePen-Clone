import React from 'react';
import './Login.scss';
import InputField from "../../SharedResources/InputField/InputField";
import {Form, Formik, FormikHelpers} from "formik";
import {useAuth} from "../../../Contexts/AuthContext";
import {
    Link,
    useHistory
} from "react-router-dom";
import {Button} from 'antd';
import * as Yup from 'yup';

const LoginValidationSchema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().min(8).required()
    }
);

const Login: React.FC = () => {
    const {login} = useAuth();
    const history = useHistory();

    const handleSubmit = async (
        values: any,
        {setSubmitting}: FormikHelpers<any>
    ) => {
        try {
            await login(values.email, values.password);
            setSubmitting(false);
            history.push("/");
        } catch (e) {
            alert(e.message);
        }
    };

    return (
        <div className="flex w-full h-full items-center justify-center p-4 blue-radial-background">
            <div
                className={"flex w-full h-full border-4 border-white border-double max-w-850px justify-center items-center flex-col"}>
                <h1 className={"text-white text-4xl p-4 font-bold mb-12"}>Login</h1>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    validationSchema={LoginValidationSchema}
                    onSubmit={handleSubmit}
                >
                    {(formProps) => (
                        <Form className={"flex w-full items-center justify-center flex-col"}>
                            <div className={"p-4 w-full flex items-center justify-center flex-col"}>
                                <label className={"text-white text-lg pb-2"} htmlFor="firstName">Email</label>
                                <InputField id="email" className={"w-full p-2"} name="email"
                                            placeholder="Enter your Email"
                                            error={formProps.touched.email && formProps.errors.email}
                                            onChange={formProps.handleChange}/>
                            </div>
                            <div className={"px-4 pb-4 w-full flex items-center justify-center flex-col"}>
                                <label className={"text-white text-lg pb-2"} htmlFor="password">Password</label>
                                <InputField id="password" type={"password"} name="password" className={"w-full p-2"}
                                            placeholder="Enter your Password"
                                            error={formProps.touched.password && formProps.errors.password}
                                            onChange={formProps.handleChange}/>
                            </div>
                            <Button type="primary" className={"mt-4"}
                                    htmlType={'submit'}
                                    disabled={formProps.isSubmitting}>Login</Button>
                            <Link to={"/signup"} className={"text-white mt-4"}>Don't have an account ? Click Here</Link>
                        </Form>)
                    }
                </Formik>
            </div>
        </div>
    )
};

export default Login;