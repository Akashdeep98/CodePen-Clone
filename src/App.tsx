import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Home from "./components/Home/Home";



function App() {
   return(
       <Router>
           <Switch>
               <Route path={'/'} component={Home}/>
               <Route>404 PAGE COMING HERE</Route>
           </Switch>
       </Router>
   )
}

export default App;
