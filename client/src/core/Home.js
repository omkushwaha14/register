import React from "react";
import Posts from "../post/Posts";

const Home = () => (
    <div className="container">
        <div className="jumbotron">
            <h2>welcome to wordbok</h2>
            <p className="lead">here you can create blogs,share memes, comedy pictures </p>
        </div>
        
            <Posts />
       
    </div>
);

export default Home;
