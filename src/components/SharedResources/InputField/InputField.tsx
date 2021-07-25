import React from "react";
import { Field } from 'formik';

const InputField: React.FC<any> = ({error="",...props}) => {
    return(
        <div className={"w-4/5"}>
            <Field {...props} />
            {error && (<div className={"text-red-500 text-base mt-2"}>{error}</div>)}
        </div>
    )
};

 export default InputField;