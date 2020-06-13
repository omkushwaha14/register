import React, { Component } from "react";
import { list } from "./apiPost";
 import Spinner from "../core/Spinner";
import { Link } from "react-router-dom";

class Posts extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            page: 1
        };
    }

    loadPosts = page => {
        list(page).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ posts: data });
            }
        });
    };

    componentDidMount() {
        this.loadPosts(this.state.page);
    }

    loadMore = number => {
        this.setState({ page: this.state.page + number });
        this.loadPosts(this.state.page + number);
    };



    renderPosts = posts => {
        return (
            <div className="row">
                {posts.map((post, i) => {
                    const posterId = post.postedBy
                        ? `/user/${post.postedBy._id}`
                        : "";
                    const posterName = post.postedBy
                        ? post.postedBy.name
                        : " Unknown";

                    return (
                        <div className="card col-md-4" key={i}>
                            <div className="card-body">
                                <Link to={`/user/${post.postedBy._id}`}>
                                     <img
                                        style={{
                                            borderRadius: "50%",
                                            border: "1px solid black"
                                        }}
                                        className="float-left mr-2"
                                        height="30px"
                                        width="30px"

                                        src={`/api/user/photo/${post.postedBy._id}`}
                                        alt={''}
                                         />


                                </Link>
                                <p className="font-italic mark">
                                    Posted by <Link to={`${posterId}`}>{posterName} </Link>
                                    on {new Date(post.created).toDateString()}
                                </p>
                                <img
                                    src={`/api/post/photo/${post._id}`}
                                    className="img-thunbnail mb-3"
                                    style={{ height: "250px", width: "100%" }}
                                    alt={''}
                                />
                                <h5 className="card-title" style={{ whiteSpace: 'pre-wrap' }}>{post.title}</h5>
                                <p className="card-text" style={{ whiteSpace: 'pre-wrap' }}>
                                    {post.body.substring(0, 200)}
                                </p>
                                <Link
                                    to={`/post/${post._id}`}
                                    className="btn btn-raised btn-primary btn-sm">
                                    Read more
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    render() {
        const { posts } = this.state;
        return (
            <div className="container">
                {!posts.length ? <Spinner/> : this.renderPosts(posts)}



                {!posts.length ?  <Spinner/>:
                    <button className="btn btn-raised btn-success mt-5 mb-5"
                        onClick={() => this.loadMore(1)}>

                        Loadmore
                    </button>


                }


            </div>
        );
    }
}

export default Posts;
