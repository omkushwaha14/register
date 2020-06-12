import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./index";

const PrivateRoute = ({ component: Component, ...rest }) => (
    // props means components passed down to this pricate route component
  

   <Route
        {...rest}
           render={props=>
               !isAuthenticated ?
                   (<Redirect to='/signin'/>
                   ):(
            <Component {...props}/>
            )
           }
    />


);

export default PrivateRoute;
