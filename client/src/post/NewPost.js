import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { create } from "./apiPost";
import { Redirect } from "react-router-dom";
import Spinner from "../core/Spinner";
class NewPost extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            body: "",
            photo: "",
            error: "",
            user: {},
            fileSize: 0,
            loading: false,
            redirectToProfile: false
        };
    }

    componentDidMount() {
        this.postData = new FormData();
        this.setState({ user: isAuthenticated().user });
    }

    isValid = () => {
        const { title, body, fileSize } = this.state;
        if (fileSize > 100000) {
            this.setState({
                error: "File size should be less than 100kb",
                loading: false
            });
            return false;
        }      if (title.length === 0 || body.length === 0) {
            this.setState({ error: "Body,title fields is required", loading: false });
            return false;
        }
        return true;


    };

    handleChange = name => event => {
        this.setState({ error: "" });
        const value =
            name === "photo" ? event.target.files[0] : event.target.value;

        const fileSize = name === "photo" ? event.target.files[0].size : 0;
        this.postData.set(name, value);
        this.setState({ [name]: value, fileSize });
    };

    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });

        if (this.isValid()) {
            const userId = isAuthenticated().user._id;
            const token = isAuthenticated().token;

            create(userId, token, this.postData).then(data => {
                if (data.error) this.setState({ error: data.error });
                else {
                    this.setState({
                        loading: false,
                        title: "",
                        body: "",
                        redirectToProfile: true
                    });
                }
            });
        }
    };

    newPostForm = (title, body) => (
        <form>

            <div className="form-group">
                <label className="text-muted">Title</label>
                <input
                    onChange={this.handleChange("title")}
                    type="text"
                    className="form-control"
                    value={title}
                />
                <small className="feedback">
                    write title for post here /leave if you dont have
                </small>
            </div>

            <div className="mb-3" >
                <textarea className="form-control "   type="text"
                          onChange={this.handleChange("body")}
                          placeholder="write here..." value={body} style={{ height: "200px", width: "100%" }} />
                <small className="feedback">
                     you can write blogs/quote anything you like.
                </small>
            </div>

            <div className="form-group">
                <label className="text-muted">Post Photo</label>
                <input
                    onChange={this.handleChange("photo")}
                    type="file"
                    accept="image/*"
                    className="form-control"/>

                <small className="feedback">
                    you can upload blogs pic/ meme anything picture u like.
                </small>
            </div>


            <button onClick={this.clickSubmit}
                className="btn btn-raised btn-primary">submit
            </button>
        </form>
    );

    render() {
        const {
            title,
            body,
            error,
            loading,
            redirectToProfile
        } = this.state;

        if (redirectToProfile) {
            return <Redirect to='/' />;
        }

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Create a new post</h2>
                <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}>
                    {error}
                </div>

                {loading ? (<Spinner/>

                ) : (
                    this.newPostForm(title, body)
                )}


            </div>
        );
    }
}

export default NewPost;
