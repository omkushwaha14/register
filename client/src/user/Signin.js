 import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { signin, authenticate } from "../auth";

import Spinner from "../core/Spinner";
class Signin extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            error: "",
            redirectToReferer: false,
            loading: false,

        };
    }

    handleChange = name => event => {
        this.setState({ error: "" });
        this.setState({ [name]: event.target.value });
    };


    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });
        const { email, password } = this.state;
        const user = {
            email,
            password
        };
        // console.log(user);
        if (this.state.password) {
            signin(user).then(data => {
                if (data.error) {
                    this.setState({ error: data.error, loading: false });
                } else {
                    // authenticate
                    authenticate(data, () => {
                        this.setState({ redirectToReferer: true });
                    });
                }
            });
        }
    };


    signinForm = (email, password) => (
        <form>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                    onChange={this.handleChange("email")}
                    type="email"
                    className="form-control"
                    value={email}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                    onChange={this.handleChange("password")}
                    type="password"
                    className="form-control"
                    value={password}
                />
            </div>



            <button
                onClick={this.clickSubmit}
                className="btn btn-raised btn-primary"
            >
                Submit
            </button>
        </form>
    );

    render() {
        const {
            email,
            password,
            error,
            redirectToReferer,
            loading,

        } = this.state;

        if (redirectToReferer) {
            return <Redirect to="/" />;
        }

        return (
            <div className="container">
                <h4 className="mt-5">SignIn</h4>
                <hr />
                <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>

                {loading ? (<Spinner/>
                    ) : (
                    ""
                )}

                {this.signinForm(email, password)}
<hr/>
                <p>
                    <Link
                        to="/forgot-password"
                        className="btn btn-raised btn-danger">
                        {" "}
                        Forgot Password
                    </Link>
                </p>
                <div
                    className="alert alert-info">
                    Create new account. Please{"  "}
                    <Link to="/signup">SignUp</Link>.
                </div>

<hr/>
                <footer className="page-footer font-small unique-color-dark pt-4 bg-light">


                    <div className="container">


                        <ul className="list-unstyled list-inline text-center py-4">
                            <li className="list-inline-item">
                                <Link to="/privacy"> <h6 className="mb-1">privacy policy</h6></Link>

                            </li>
                       
 
                        </ul>


                    </div>



                    <div className="footer-copyright text-center py-3">©Copyright 2020:Wordbok

                    </div>


                </footer>




            </div>
        );
    }
}

export default Signin;
