import React from 'react';
import {Link} from "react-router-dom";
import {useAuth} from "../../../Contexts/AuthContext";
import {defaultKeyPrefix} from "../../../hooks/useLocalStorage";
import {database} from "../../../firebase";
import {
    useHistory, matchPath
} from "react-router-dom";
import { Button } from 'antd';


const AppTopbar: React.FC = () => {
    const {currentUser, logout} = useAuth();
    const history = useHistory();
    const params: any = matchPath(window.location.pathname, {
        path: "/:id",
    })?.params || {};

    const onSave = () => {
        const html = localStorage.getItem(defaultKeyPrefix + params.id + "-html");
        const css = localStorage.getItem(defaultKeyPrefix + params.id + "-css");
        const js = localStorage.getItem(defaultKeyPrefix + params.id + "-js");
        const dbRef = database.ref("codebase");
        const key = params.id ? params.id : dbRef.push().key;
        dbRef.update({
            [key as string]: {
                html: html,
                css: css,
                js: js
            }
        }).then(() => {
            if (!params.id) {
                localStorage.removeItem(defaultKeyPrefix + params.id + "-html");
                localStorage.removeItem(defaultKeyPrefix + params.id + "-css");
                localStorage.removeItem(defaultKeyPrefix + params.id + "-js");
                history.push(`/${key}`);
            }
        }).catch((e) => {
            alert("some error occurred" + e)
        })
    };

    return (
        <div className={"flex bg-black p-4 justify-between"}>
            <Link to={"/"} className="text-white font-bold">CodeShelf</Link>
            {currentUser ? <div><Button type={"primary"} onClick={onSave}>Save</Button>
                <Button className={"ml-4"} onClick={() => logout()}>Logout</Button>
            </div> : !(window.location.pathname.includes("login")) &&
                <Link to={"/login"} className={"text-white font-bold"}>Login</Link>}
        </div>
    )
};

export default AppTopbar;
