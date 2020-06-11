import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth';

const isActive = (history, path) => {
    if (history.location.pathname === path) return { color: '#ff2900' };
    else return { color: '#ffffff' };
};

const Menu = ({ history }) => (
    <div>
        <ul className="nav nav-tabs bg-primary">
            <li className="navbar navbar-dark bg-primary">
                <Link className="nav-link" style={isActive(history, '/')} to="/">
                    Home
                </Link>
            </li>



   <li className="navbar navbar-dark bg-primary">
                <Link className="nav-link"  style={isActive(history, '/post/create')} to="/post/create">
                     Post
                </Link>
            </li>

            {!isAuthenticated() && (
                <React.Fragment>
                    <li className="navbar navbar-dark bg-primary">
                        <Link className="nav-link" style={isActive(history, '/signin')} to="/signin">
                            Login
                        </Link>
                    </li>
                    <li className="navbar navbar-dark bg-primary">
                        <Link className="nav-link" style={isActive(history, '/signup')} to="/signup">
                            Register
                        </Link>
                    </li>
                </React.Fragment>
            )}


            {isAuthenticated() && (
                <React.Fragment>
                    <li className="navbar navbar-dark bg-primary">
                        <Link className="nav-link" style={isActive(history, '/findpeople')}  to="/findpeople" >
                            Friends
                        </Link>
                    </li>

                    <li className="navbar navbar-dark bg-primary">
                        <Link
                            to={`/user/${isAuthenticated().user._id}`}
                            style={isActive(history, `/user/${isAuthenticated().user._id}`)}
                            className="nav-link">Profile

                        </Link>
                    </li>

                    <li className="navbar navbar-dark bg-primary">
                        <span
                            className="nav-link"
                            style={{ cursor: 'pointer', color: '#fff' }}
                            onClick={() => signout(() => history.push('/'))}>
                            Logout
                        </span>
                    </li>
                </React.Fragment>
            )}
        </ul>
    </div>
);

export default withRouter(Menu);
