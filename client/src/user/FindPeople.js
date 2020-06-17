import React, { Component } from "react";
import { findPeople, follow } from "./apiUser";
import DefaultProfile from "../images/avatar.jpg";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import Spinner from "../core/Spinner";

class FindPeople extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            error: "",
            open: false
        };
    }

    componentDidMount() {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;

        findPeople(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ users: data });
            }
        });
    }

    clickFollow = (user, i) => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;

        follow(userId, token, user._id).then(data => {
            if (data.error) {
                this.setState({ error: data.error });
            } else {
                let toFollow = this.state.users;
                toFollow.splice(i, 1);
                this.setState({
                    users: toFollow,
                    open: true,
                    followMessage: `Following ${user.name}`
                });
            }
        });
    };

    renderUsers = users => (
        <div className="row">
            {users.map((user, i) => (
                <div className="card col-md-4" key={i}>
                    <div className="card-body">
                    <img
                        style={{ height: "300px", width: "300px", borderRadius: "50%",verticalAlign:"middle" }}
                        className="avatar"
                        src={`/api/user/photo/${
                            user._id
                        }`}
                        onError={i => (i.target.src = `${DefaultProfile}`)}
                        alt={user.name}/>

                        <h5 className="card-title">{user.name}</h5>
                        <hr/>
                        <Link
                            to={`/user/${user._id}`}
                            className="btn btn-raised btn-primary btn-sm">View Profile
                        </Link>

                        <button
                            onClick={() => this.clickFollow(user, i)}
                            className="btn btn-raised btn-info float-right btn-sm">Follow
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );

    render() {
        const { users, open, followMessage } = this.state;
        return (
            <div className="container">
                <h3 className="mt-5 mb-5">Friends you may know</h3>

                {open && (
                    <div className="alert alert-success">{followMessage}</div>
                )}
                {!users.length ? <Spinner/> : this.renderUsers(users)}



            </div>
        );
    }
}

export default FindPeople;
