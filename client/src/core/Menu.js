 import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth';


const isActive = (history, path) => {
    if (history.location.pathname === path) return { color: '#000000' };
    else return { color: '#ffffff' };
};

const Menu = ({ history }) => (
    <div>
        <nav className="navbar navbar-dark bg-success">

                <Link className="nav-link" style={isActive(history, '/')} to="/">Home</Link>

               <Link className="nav-link"  style={isActive(history, '/post/create')} to="/post/create">AddPost</Link>


            {!isAuthenticated() && (
                <React.Fragment>


                        <Link className="nav-link" style={isActive(history, '/signin')} to="/signin">Login</Link>



                </React.Fragment>
            )}


            {isAuthenticated() && (
                <React.Fragment>

                        <Link className="nav-link"  style={isActive(history, `/findpeople`)}
                              to="/findpeople">
                            Friends
                        </Link>



                        <Link
                            to={`/user/${isAuthenticated().user._id}`}
                            style={isActive(history, `/user/${isAuthenticated().user._id}`)}
                            className="nav-link">Profile

                        </Link>



                        <span
                            className="nav-link"
                            style={{ cursor: 'pointer', color: '#fff' }}
                            onClick={() => signout(() => history.push('/'))}>
                            Logout
                        </span>

                </React.Fragment>
            )}
        </nav>
    </div>
);

export default withRouter(Menu);
