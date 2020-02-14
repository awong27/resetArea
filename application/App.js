import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar.component";
import Home from "./components/home.component";
import Introduction from "./components/introduction.component";
import About from "./components/about.component";

function App() {
	return (
		<Router>
		<div className="container">
			<Navbar />
			<br/>
			<Route path="/" exact component={Home} />
			<Route path="/Introduction" exact component={Introduction} />
			<Route path="/About" exact component={About} />
		</div>
		</Router>
	);


} 
export default App;