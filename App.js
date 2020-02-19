import React from 'react';
import ReactDOM from "react-dom";
import { Switch, Route, BrowserRouter, Link } from "react-router-dom";

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { UncontrolledCarousel, Navbar } from "reactstrap";

function App() {
  return (
    <BrowserRouter>
      <header>
        <div className="Tops">CSC 648</div>
        
          <Navbar color="faded" light>
          
          <br/>
          <Link className="link" to="/">
            Home
          </Link>
          <Link className="link" to="/about">
            About
          </Link>
          <Link className="link" to="/inventory">
          Inventory
          </Link>
          <Link className="link" to="/mealplan">
            Meal Plan
          </Link>
          <Link className="link" to="/statistics">
            Statistics
          </Link>
          </Navbar>
        
      </header>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" exact component={About} />
          <Route path="/inventory" exact component={inventory} />
          <Route path="/mealplan" exact component={mealplan} />
          <Route path="/statistics" exact component={statistics} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
const items = [
  {
    src: 'https://lh3.googleusercontent.com/WjA3U-WvKgKGS2o4R46ftzo1YjGe3tyv8MQguc02sQgPU21JqrW1ImACcFigfQcgJ0LtYpsfch291RC9pGIQib7m0wEgAPebyMcoQECd8BNdBmfKfhqfevN-CQwP7Urq9boJ3F80qg',
    altText: "Slide 1",
    caption: "Team Leader",
    header: "Sanchit Joshi",
    key: "1"
  },
  {
    src: 'https://lh3.googleusercontent.com/P8muruAcjE5sWo0lZ2KDKBZaDNE2d4esUndK1JY_bmFEqGSJemEblvA8q3hd_hDs_j5TLlUjg9fmG7V5-0EHAX7uPBoxpEbqmaMnUU1CzVrJut6cq_7MIA8FpAxKHCOXojJ92x2Itrt__knNqlx7ifE9glPw-FurZEXulEjFyn4RdavNJo-nbWsFLaa9ymtosoUTkd2dPJ2O-Ze1bd943CZw-1WnEa7I1szPZuHw8l3PCcKIT1_kWXs7Lne2HxFGDKi_7d04lyk4KmGFdnHUJOowG9C_MeUKHve-F8jq93KGntqtjbjQJU62KYPKL0TZNjIX4c55YwyaBuO2DXlg0I8UqNVWDKVT5skqfuunbZYiyDDbARvYFbcVVwRI0qwntXt6z9x9KGepjQ9YEAxeIN0mtY9Nip-udRQ9kbDFt0W1shNJSK8EQAXDxfB_UhkgJZsK-hh_9JISVPnT5CJloriI-YXjSfmMa7ReeGNfTwxYu_MXwIB9mmQ-_PqqvzfbeKllHqwvMBA_HCrxNX2gnTmFtafBJCZSc88b3iiq748KciJJwn6pi_KVJL5hEV_NP3zpzpcClYGe8fHqZ8Y822QOIlavlWVEjOXQQ5LcvALik5v_mSRPWK-dGr-nx7wIuYRsM-DokIRnJP3ucWj4bP3x2VlPTM_m5wXka4fuR0T4t9DVtsoAGuY=w537-h600-no',
    altText: "Slide 2",
    caption: "Scrum Master",
    header: "Aurpon Gupta",
    key: "2"
  },
  {
    src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa21%20text%20%7B%20fill%3A%23333%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa21%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23555%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22277%22%20y%3D%22218.3%22%3EThird%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
    altText: "Slide 3",
    caption: "Back-End Lead",
    header: "Zhifan Cai",
    key: "3"
  },
  {
    src: 'https://media-exp1.licdn.com/dms/image/C4E03AQFsO6CRULkKSg/profile-displayphoto-shrink_200_200/0?e=1587600000&v=beta&t=wamikGgY8UIR3SWncvjQLI1wGLYlCjDff6xtb4qsYdg',
    altText: "Slide 4",
    caption: "Front-End Lead",
    header: "Anthony Wong",
    key: "4"
  },
  {
    src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa21%20text%20%7B%20fill%3A%23333%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa21%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23555%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22277%22%20y%3D%22218.3%22%3EThird%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
    altText: "Slide 5",
    caption: "Git Master",
    header: "Matthew Cookie Davis",    
    key: "5"
  },
  {
    src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa21%20text%20%7B%20fill%3A%23333%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa21%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23555%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22277%22%20y%3D%22218.3%22%3EThird%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
    altText: "Slide 6",
    caption: "Developer",
    header: "Daniel Godfrey",
    key: "6"
  },
  {
    src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa21%20text%20%7B%20fill%3A%23333%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa21%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23555%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22277%22%20y%3D%22218.3%22%3EThird%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
    altText: "Slide 7",
    caption: "Developer",
    header: "Dmitry Polozov",
    key: "7"
  },
  {
    src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa21%20text%20%7B%20fill%3A%23333%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa21%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23555%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22277%22%20y%3D%22218.3%22%3EThird%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
    altText: "Slide 8",
    caption: "Developer",
    header: "Christian Melendez",
    key: "8"
  }
];
const About = () => (
  
    <div className = "container" >
          <h1>About the Team</h1>
          <UncontrolledCarousel items={items} />
          <h2>Meeting Times and other stuff</h2>
          <h3>Our dedicated Team is focused to develop a Refrigerator Organizer and host it on the Google Cloud Engine using MERN Stack(MongoDB- Database, Express - Web App Framework, ReactJS- Front End UI ,NodeJS for Server).</h3>
    </div>  
);

const Home = () => <h1>Homepage!<h2>Get your fridge in order</h2></h1>;
const inventory = () => <h1>Inventory<h2>What is in your fridge</h2></h1>;
const mealplan = () => <h1>Meal Plan<h2>Search for balanced meals</h2></h1>;
const statistics = () => <h1>Statistics<h2>How Much Ice Cream Do You Eat</h2></h1>;
export default App;

