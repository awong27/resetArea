import React from 'react';
import Navi from "./Navigation";
import { UncontrolledCarousel, Navbar } from "reactstrap";

const About = () => (
  
    <div className = "App-container" >
          <h1>About the Team</h1>
          <UncontrolledCarousel items={items} />
          <h2>Meeting Times and other stuff</h2>
          <Navi/>
    </div>  
);

const items = [
    {
      src: 'https://images-na.ssl-images-amazon.com/images/I/8166xCVDGnL._SL1500_.jpg',
      altText: "Slide 1",
      caption: "Team Leader",
      header: "Sanchit Joshi",
      key: "1"
    },
    {
      src: 'https://images-na.ssl-images-amazon.com/images/I/8166xCVDGnL._SL1500_.jpg',
      altText: "Slide 2",
      caption: "Scrum Master",
      header: "Aurpon Gupta",
      key: "2"
    },
    {
      src: 'https://scontent-sjc3-1.xx.fbcdn.net/v/t1.0-9/40685632_726069547746849_4036424541252091904_n.jpg?_nc_cat=100&_nc_ohc=kqOHBJZlooQAX-nkGlc&_nc_ht=scontent-sjc3-1.xx&oh=a96cf26ed3933e3600825091d5d91e90&oe=5EC9D194',
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
      src: 'https://i.imgur.com/5pq0krV.png',
      altText: "Slide 5",
      caption: "Git Master",
      header: "Matthew Cookie Davis",
      
      key: "5"
    },
    {
      src: 'https://i.ibb.co/Fn6bgFz/IMG-3836.jpg',
      altText: "Slide 6",
      caption: "Developer",
      header: "Daniel Godfrey",
      key: "6"
    },
    {
      src: 'https://scontent.fsjc1-3.fna.fbcdn.net/v/t1.0-9/p960x960/59400025_10156708788429934_2268228716427476992_o.jpg?_nc_cat=109&_nc_ohc=bwHXrsI7DZ8AX993mPn&_nc_ht=scontent.fsjc1-3.fna&_nc_tp=6&oh=d0328de7fb48f426d2ef029e6ff1dc2c&oe=5EC77D00',
      altText: "Slide 7",
      caption: "Developer",
      header: "Dmitry Polozov",
      key: "7"
    },
    {
      src: 'https://scontent-sjc3-1.xx.fbcdn.net/v/t1.0-9/27973881_1685219221563384_3890492963377647087_n.jpg?_nc_cat=101&_nc_ohc=kG2vgc98Mg4AX-sFCky&_nc_ht=scontent-sjc3-1.xx&oh=b830ba080c4ea5b8843e1c78c1c79456&oe=5EB59F84',
      altText: "Slide 8",
      caption: "Developer",
      header: "Christian Melendez",
      key: "8"
    }
  ];

export default About;
