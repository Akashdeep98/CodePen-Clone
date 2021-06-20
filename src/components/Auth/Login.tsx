import React from 'react';
import './Login.scss';
import InputField from "../SharedResources/InputField/InputField";
import {Form, Formik, FormikHelpers} from "formik";

const Login:React.FC = () => {
    return(
        <div className="flex w-full h-full items-center justify-center p-4 blue-radial-background">
            <div className={"flex w-full h-full border-4 border-white border-double max-w-850px justify-center items-center flex-col"}>
                <h1 className={"text-white text-4xl p-4"}>Login</h1>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    onSubmit={(
                        values: any,
                        { setSubmitting }: FormikHelpers<any>
                    ) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                        }, 500);
                    }}
                >
                    <Form>
                        <div className={"p-4"}>
                        <label className={"text-white"} htmlFor="firstName">Email</label>
                        <InputField id="firstName" name="firstName" placeholder="Enter your Email" />
                        </div>
                        <div className={"px-4 pb-4"}>
                        <label className={"text-white"} htmlFor="password">Password</label>
                        <InputField id="password" name="password" placeholder="Enter your Password" />
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    )
};

export default Login;