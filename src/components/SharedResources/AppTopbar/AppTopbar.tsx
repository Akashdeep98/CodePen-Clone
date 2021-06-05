import React from 'react';
import {Link} from "react-router-dom";



const  AppTopbar:React.FC = () => {
    return(
        <div className={"flex bg-black p-4 justify-between"}>
            <Link to={"/"} className={"text-white"}>CodePen</Link>
            <Link to={"/login"} className={"text-white"}>Login</Link>
        </div>
    )
};

export default AppTopbar;
