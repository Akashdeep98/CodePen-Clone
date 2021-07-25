import React from 'react';
import AppTopbar from "../SharedResources/AppTopbar/AppTopbar";
import {
    Switch,
    Route,
} from "react-router-dom";
import Login from "../Auth/Login/Login";
import CodePlayGround from "../CodePlayGround/CodePlayGround";
import SignUp from "../Auth/SignUp/SignUp";
import {AuthProvider} from "../../Contexts/AuthContext";

const Home: React.FC = () => {

    return (
        <AuthProvider>
            <div className="flex w-full h-screen items-center justify-center">
                <div className={"flex flex-col w-full h-full"}>
                    <AppTopbar/>
                    <Switch>
                        <Route exact path={'/login'} component={Login}/>
                        <Route exact path={'/signup'} component={SignUp}/>
                        <Route exact path={'/:id'} component={CodePlayGround}/>
                        <Route exact path={'/'} component={CodePlayGround}/>
                        <Route>404 PAGE COMING HERE</Route>
                    </Switch>
                </div>
            </div>
        </AuthProvider>
    );
};

export default Home;
