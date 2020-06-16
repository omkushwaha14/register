import React, { Component } from "react";
import { Link } from "react-router-dom";
import DefaultProfile from "../images/avatar.jpg";
import Spinner from "../core/Spinner";

class ProfileTabs extends Component {
    render() {
        const { following, followers, posts } = this.props;
        return (
            <div>
                <div className="row">
                    <div className="col-md-4">

                        <hr/>

                        {!followers.length ? <Spinner/> :


                                followers.map((person, i) => (
                                    <div key={i}>
                                        <div>
                                            <h4 >
                                                {followers.length} Followers

                                            </h4>
                                            <Link to={`/user/${person._id}`}>
                                                <img
                                                    style={{
                                                        borderRadius: "80%",
                                                        border: "1px solid black"
                                                    }}
                                                    className="float-left mr-2"
                                                    height="30px"
                                                    width="30px"
                                                    onError={i =>
                                                        (i.target.src = `${DefaultProfile}`)
                                                    }
                                                    src={`/api/user/photo/${person._id}`}
                                                    alt={person.name}
                                                />
                                                <div>
                                                    <h6>
                                                        {person.name}
                                                    </h6>

                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                ))
                            }




                    </div>


                    <div className="col-md-4">

                        <hr />
                        {!following.length ? <Spinner/> :  following.map((person, i) => (
                                <div key={i}>
                                    <div>
                                        <h4 >
                                            {following.length} Following
                                        </h4>
                                        <Link to={`/user/${person._id}`}>
                                            <img
                                                style={{
                                                    borderRadius: "50%",
                                                    border: "1px solid black"
                                                }}
                                                className="float-left mr-2"
                                                height="30px"
                                                width="30px"
                                                onError={i =>
                                                    (i.target.src = `${DefaultProfile}`)
                                                }
                                                src={`/api/user/photo/${person._id}`}
                                                alt={person.name}
                                            />
                                            <div>
                                                <h6>
                                                    {person.name}
                                                </h6>
                                                <hr/>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            ))}

                    </div>

                    <div className="col-md-4">
                     
                        <hr />

                        {!posts.length ? <Spinner/> :posts.map((post, i) => (
                                <div key={i}>
                                        <h4 >{posts.length} Posts</h4>
                                        <Link to={`/post/${post._id}`}> </Link>

                                                <div className="card-body">
                                                <img src={`/api/post/photo/${post._id}`}
                                                    className="img-thunbnail mb-4"
                                                    style={{ height: "300px", width: "107%" }}
                                                    alt={''}
                                                />
                                                <Link to={`/post/${post._id}`}>
                                                    <h5 className="card-title">{post.title}</h5></Link>

                                                <p className="card-text">
                                                    {post.body.substring(0, 150)}
                                                </p>
                                                <Link
                                                    to={`/post/${post._id}`}
                                                    className="btn btn-raised btn-primary btn-sm">
                                                    Read more
                                                </Link>
                                                    <hr/>
                                            </div>


                                </div>
                            ))}


                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileTabs;
