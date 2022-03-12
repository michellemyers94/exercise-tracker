import React from 'react';
import exerciseImage from '../img/woman-exercising.jpg';

function Header() {
    return (
        <>
        <header className="App-header">
            <div className="container">
            <img src={exerciseImage} className="exercising-img" alt="woman lifting a weight bar" />
            <h1 className="banner">Cusick Fitness | Exercise Tracker</h1>
            </div>
        </header>
        </>
    );
}

export default Header;