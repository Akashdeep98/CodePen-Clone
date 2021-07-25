import React from 'react';
import InputField from "../../SharedResources/InputField/InputField";
import {Form, Formik, FormikHelpers} from "formik";
import {useAuth} from "../../../Contexts/AuthContext";
import {
    Link,
    useHistory
} from "react-router-dom";
import {Button} from "antd";
import * as Yup from "yup";

const SignUpValidationSchema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().min(8).required(),
        confirmPassword: Yup.string().required("Confirm Password is required").oneOf([Yup.ref('password'), null], 'Passwords must match')
    }
);

const SignUp: React.FC = () => {
    const {signup} = useAuth();
    const history = useHistory();
    return (
        <div className="flex w-full h-full items-center justify-center p-4 blue-radial-background">
            <div
                className={"flex w-full h-full border-4 border-white border-double max-w-850px justify-center items-center flex-col"}>
                <h1 className={"text-white text-4xl p-4 font-bold mb-12"}>Sign Up</h1>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                        confirmPassword: ''
                    }}
                    onSubmit={async (
                        values: any,
                        {setSubmitting}: FormikHelpers<any>
                    ) => {
                        try {
                            await signup(values.email, values.password);
                            setSubmitting(false);
                            history.push("/");
                        } catch (e) {
                            alert(e.message);
                        }
                    }}
                    validationSchema={SignUpValidationSchema}
                >
                    {(formProps) => (
                        <Form className={"flex w-full items-center justify-center flex-col"}>
                            <div className={"p-4 w-full flex items-center justify-center flex-col"}>
                                <label className={"text-white text-lg pb-2"} htmlFor="firstName">Email</label>
                                <InputField id="email" className={"w-full p-2"} name="email"
                                            placeholder="Enter your Email" onChange={formProps.handleChange}
                                            error={formProps.touched.email && formProps.errors.email}/>
                            </div>
                            <div className={"p-4 w-full flex items-center justify-center flex-col"}>
                                <label className={"text-white text-lg pb-2"} htmlFor="password">Password</label>
                                <InputField id="password" type="password" className={"w-full p-2"} name="password"
                                            placeholder="Enter your Password"
                                            error={formProps.touched.password && formProps.errors.password}
                                            onChange={formProps.handleChange}/>
                            </div>
                            <div className={"p-4 w-full flex items-center justify-center flex-col"}>
                                <label className={"text-white text-lg pb-2"} htmlFor="password">Confirm Password</label>
                                <InputField id="confirmPassword" type="password" className="w-full p-2" name="confirmPassword"
                                            placeholder="Enter your Password Again"
                                            error={formProps.touched.confirmPassword && formProps.errors.confirmPassword}
                                            onChange={formProps.handleChange}/>
                            </div>
                            <Button type="primary" className={"mt-4"} htmlType={'submit'}
                                    disabled={formProps.isSubmitting}>Sign Up</Button>
                            <Link to={"/login"} className={"text-white mt-4"}>Already have an account? Click Here</Link>
                        </Form>
                    )
                    }
                </Formik>
            </div>
        </div>
    )
};

export default SignUp;