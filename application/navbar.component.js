import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
	<Link to="/" className="navbar-brand">Home</Link>
	<div className="collapse navbar-collapse">
	<ul className="navbar-nav mr-auto">
		<li className="navbar-item">
		<Link to="/" className="nav-link">Home</Link>
		</li>
		<li className="navbar-item">
		<Link to="/introduction" className="nav-link">Introduction</Link>
		</li>
		<li className="navbar-item">
		<Link to="/about" className="nav-link">About</Link>
		</li>
	</ul>
	</div>
      </nav>
    );
  }
}