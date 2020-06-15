import React, { Component } from "react";
import { signup } from "../auth";
import { Link } from "react-router-dom";



class Signup extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            error: "",
            open: false,

        };
    }

    handleChange = name => event => {
        this.setState({ error: "" });
        this.setState({ [name]: event.target.value });
    };


    clickSubmit = event => {
        event.preventDefault();
        const { name, email, password } = this.state;
        const user = {
            name,
            email,
            password
        };
        // console.log(user);
        if (this.state.password) {
            signup(user).then(data => {
                if (data.error) this.setState({ error: data.error });
                else
                    this.setState({
                        error: "",
                        name: "",
                        email: "",
                        password: "",
                        open: true
                    });
            });
        }
    };

    signupForm = (name, email, password) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    onChange={this.handleChange("name")}
                    type="text"
                    className="form-control"
                    value={name}
                />
            </div>
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
                className="btn btn-raised btn-primary">
                Submit
            </button>
        </form>
    );

    render() {
        const { name, email, password, error, open  } = this.state;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Signup</h2>

                <hr />
                <br />

                <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}>
                    {error}
                </div>

                <div
                    className="alert alert-info"
                    style={{ display: open ? "" : "none" }}>
                    New account is successfully created. Please{" "}
                    <Link to="/signin">Sign In</Link>.
                </div>

                {this.signupForm(name, email, password )}

                <hr/>
                <footer className="page-footer font-small unique-color-dark pt-4 bg-light">


                    <div className="container">


                        <ul className="list-unstyled list-inline text-center py-4">
                            <li className="list-inline-item">
                                <Link to="/signup"> <h6 className="mb-1">privacy</h6></Link>

                            </li>
                            <li className="list-inline-item">
                                <Link to="/signup"> <h6 className="mb-1">what is wordbok?</h6></Link>

                            </li>
                            <li className="list-inline-item">
                                <Link to="/signup"> <h6 className="mb-1">Terms and condition</h6></Link>

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

export default Signup;
