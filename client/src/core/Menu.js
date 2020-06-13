import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth';
import Spinner from "./Spinner";

const isActive = (history, path) => {
    if (history.location.pathname === path) return { color: '#000000' };
    else return { color: '#ffffff' };
};

const Menu = ({ history }) => (
    <div>
        <nav className="navbar navbar-dark bg-primary">
            <a>
                <Link className="nav-link" style={isActive(history, '/')} to="/">Home</Link>
            </a>



            <a >
                <Link className="nav-link"  style={isActive(history, '/post/create')} to="/post/create">Post</Link>
            </a>

            {!isAuthenticated() && (
                <React.Fragment>
                    <a >

                        <Link className="nav-link" style={isActive(history, '/signin')} to="/signin">Login</Link>
                    </a>
                    <a >
                        <Link className="nav-link" style={isActive(history, '/signup')} to="/signup">
                            Register
                        </Link>
                    </a>

                </React.Fragment>
            )}


            {isAuthenticated() && (
                <React.Fragment>
                    <a>
                        <Link className="nav-link"  style={isActive(history, `/findpeople`)}
                              to="/findpeople">
                            Friends
                        </Link>
                    </a>

                    <a >
                        <Link
                            to={`/user/${isAuthenticated().user._id}`}
                            style={isActive(history, `/user/${isAuthenticated().user._id}`)}
                            className="nav-link">Profile

                        </Link>
                    </a>

                    <a >
                        <span
                            className="nav-link"
                            style={{ cursor: 'pointer', color: '#fff' }}
                            onClick={() => signout(() => history.push('/'))}>
                            Logout
                        </span>
                    </a>
                </React.Fragment>
            )}
        </nav>
    </div>
);

export default withRouter(Menu);
