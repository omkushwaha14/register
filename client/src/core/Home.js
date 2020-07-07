import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Posts from "../post/Posts";

const Home = () => (
    <div className="container">
        <div className="jumbotron">
            <h3>Welcome to wordbok</h3>
            <p className="lead">Here you can create blogs,share memes, comedy pictures </p>
        </div>
        
            <Posts />
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

export default Home;
