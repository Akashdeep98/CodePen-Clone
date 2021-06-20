import React from "react";
import { Field } from 'formik';

const InputField: React.FC<any> = ({error="",...props}) => {
    return(
        <div>
            <Field {...props} />
            {error && (<div>{error}</div>)}
        </div>
    )
};

 export default InputField;