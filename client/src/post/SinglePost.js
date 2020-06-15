import React, { Component } from 'react';
import { singlePost, remove, like, unlike } from './apiPost';
import Spinner from "../core/Spinner";
import { Link, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import Comment from './Comment';

class SinglePost extends Component {
    state = {
        post: '',
        redirectToHome: false,
        redirectToSignin: false,
        like: false,
        likes: 0,
        comments: []
    };

    checkLike = likes => {
        const userId = isAuthenticated() && isAuthenticated().user._id;
        let match = likes.indexOf(userId) !== -1;
        return match;
    };

    componentDidMount = () => {
        const postId = this.props.match.params.postId;
        singlePost(postId).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({
                    post: data,
                    likes: data.likes.length,
                    like: this.checkLike(data.likes),
                    comments: data.comments
                });
            }
        });
    };

    updateComments = comments => {
        this.setState({ comments });
    };

    likeToggle = () => {
        if (!isAuthenticated()) {
            this.setState({ redirectToSignin: true });
            return false;
        }
        let callApi = this.state.like ? unlike : like;
        const userId = isAuthenticated().user._id;
        const postId = this.state.post._id;
        const token = isAuthenticated().token;

        callApi(userId, token, postId).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({
                    like: !this.state.like,
                    likes: data.likes.length
                });
            }
        });
    };

    deletePost = () => {
        const postId = this.props.match.params.postId;
        const token = isAuthenticated().token;
        remove(postId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ redirectToHome: true });
            }
        });
    };

    deleteConfirmed = () => {
        let answer = window.confirm('Are you sure you want to delete your post?');
        if (answer) {
            this.deletePost();
        }
    };

    renderPost = post => {
        const posterId = post.postedBy ? `/user/${post.postedBy._id}` : '';
        const posterName = post.postedBy ? post.postedBy.name : ' Unknown';

        const { like, likes } = this.state;

        return (
            <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
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
                <img src={`/api/post/photo/${post._id}`} style={{ height: "300px", width: "auto" }}
                     alt={''}
                />

                <p className="card-text"  style={{ whiteSpace: 'pre-wrap' }}>{post.body}</p>
                <br />

                <div className="d-inline-block">
                    <Link to={`/`} className="btn btn-raised btn-primary btn-sm mr-4">Back to posts</Link>

                    {isAuthenticated().user && isAuthenticated().user._id === post.postedBy._id && (
                        <>
                            <Link to={`/post/edit/${post._id}`} className="btn btn-raised btn-warning btn-sm mr-4">Edit Post</Link>
                            <button onClick={this.deleteConfirmed} className="btn btn-raised btn-danger btn-sm mr-4">Delete Post</button>
                        </>
                    )}

                    <div>
                        {like ? (
                            <h3 onClick={this.likeToggle}>
                                <i
                                    className="fa fa-thumbs-up"
                                    style={{ padding: '10px', borderRadius: '50%' }}
                                />{' '}
                                {likes} likes
                            </h3>
                        ) : (
                            <h4 onClick={this.likeToggle}>
                                <i
                                    className="fa fa-thumbs-up "
                                    style={{ padding: '10px', borderRadius: '50%' }}
                                />{' '}
                                {likes} likes
                            </h4>
                        )}
                        <Comment postId={post._id} comments={this.state.comments.reverse()} updateComments={this.updateComments} />
                    </div>
                </div>
            </div>
        );
    };

    render() {
        const { post, redirectToHome, redirectToSignin} = this.state;

        if (redirectToHome) {
            return <Redirect to={`/`} />;
        } else if (redirectToSignin) {
            return <Redirect to={`/signin`} />;
        }

        return (
            <div className="container">


                {!post ? <Spinner/> : this.renderPost(post)}

            </div>
        );
    }
}

export default SinglePost;
