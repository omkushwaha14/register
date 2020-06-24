import React from "react";
import Posts from "../post/Posts";

const Home = () => (
    <div className="container">
        <div className="jumbotron">
            <h3>Welcome to wordbok</h3>
            <p className="lead">Here you can create blogs,share memes, comedy pictures </p>
        </div>
        
            <Posts />
       
    </div>
);

export default Home;
