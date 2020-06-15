import React ,{Fragment} from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Home from "./core/Home";
import Menu from "./core/Menu";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Profile from "./user/Profile";

import EditProfile from "./user/EditProfile";
import FindPeople from "./user/FindPeople";
import NewPost from "./post/NewPost";
import EditPost from "./post/EditPost";
import SinglePost from "./post/SinglePost";
import PrivateRoute from "./auth/PrivateRoute";
import ForgotPassword from "./user/ForgotPassword";
import ResetPassword from "./user/ResetPassword";

const App = () => {
    return(
        <Router>
            <Fragment>

             
                    <Menu />
                <Switch>

                    <PrivateRoute exact path="/" component={Home} />

                    <Route exact path="/forgot-password" component={ForgotPassword} />
                    <Route exact path="/reset-password/:resetPasswordToken" component={ResetPassword}
                    />
                    <PrivateRoute exact path="/post/create" component={NewPost} />
                    <PrivateRoute exact path="/post/:postId" component={SinglePost} />
                    <PrivateRoute
                        exact
                        path="/post/edit/:postId"
                        component={EditPost}
                    />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/signin" component={Signin} />
                    <PrivateRoute exact path="/user/edit/:userId" component={EditProfile}/>
                    <PrivateRoute exact path="/findpeople" component={FindPeople} />
                    <PrivateRoute exact path="/user/:userId" component={Profile} />
                    </Switch>
             
                    </Fragment>
        </Router>

                    )
}



export default App;
