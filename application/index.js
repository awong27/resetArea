import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter, Link } from 'react-router-dom';
//import { BuilderComponent } from '@builder.io/react';

import './index.css';

function App() {
  return (
    <BrowserRouter>
      <header>
        <div className="logo">CSC 648</div>
        <div className="links">
          <Link className="link" to="/">Home</Link>
          <Link className="link" to="/about">About</Link>
          <Link className="link" to="/page-1">Page 1</Link>
          <Link className="link" to="/page-2">Page 2</Link>
          <Link className="link" to="/404">404</Link>
        </div>
      </header>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" exact component={About} />
          
        </Switch>
      </div>
    </BrowserRouter>
  );
}



const Home = () => <h1>I am the homepage!</h1>;
const About = () => <h1>I am the about page!</h1>;
//const NotFound = () => <h1>No page found for this URL, did you publish it?</h1>;

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
