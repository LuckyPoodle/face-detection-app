import React, { Component } from 'react';
import Particles from 'react-particles-js';
import './App.css';
import Navigation from './components/navigation/Navigation';
import FaceRecognition from './components/facerecognition/FaceRecognition';
import Logo from './components/logo/Logo.js';
import ImageLinkForm from './components/imagelinkform/ImageLinkForm.js';
import Rank from './components/rank/Rank';
import Signin from './components/signin/Signin';
import Register from './components/register/Register';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee, faBolt } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faCheckSquare, faCoffee, faBolt)
const particlesOptions = {
  "number": {
    "value": 800,
    "density": {
      "enable": true,
      "value_area": 700 // Denser the smaller the number.
    }
  },
  "color": { // The color for every node, not the connecting lines.
    "value": "#01579b" // Or use an array of colors like ["#9b0000", "#001378", "#0b521f"]
  },
  "shape": {
    "type": "circle", // Can show circle, edge (a square), triangle, polygon, star, img, or an array of multiple.
    "stroke": { // The border
      "width": 1,
      "color": "#145ea8"
    },
    "polygon": { // if the shape is a polygon
      "nb_sides": 5
    },
    "image": { // If the shape is an image
      "src": "",
      "width": 100,
      "height": 100
    }
  },
  "opacity": {
    "value": 0.7,
    "random": true
  },
  "size": {
    "value": 10,
    "random": true
  },
  "line_linked": {
    "enable": true,
    "distance": 20, // The radius before a line is added, the lower the number the more lines.
    "color": "#007ecc",
    "opacity": 1,
    "width": 2
  },
  "move": {
    "enable": true,
    "speed": 3,
    "direction": "top", // Move them off the canvas, either "none", "top", "right", "bottom", "left", "top-right", "bottom-right" et cetera...
    "random": true,
    "straight": false, // Whether they'll shift left and right while moving.
    "out_mode": "out", // What it'll do when it reaches the end of the canvas, either "out" or "bounce".
    "bounce": true,
    "attract": { // Make them start to clump together while moving.
      "enable": true,
      "rotateX": 600,
      "rotateY": 1200
    }
  },

  "interactivity": {
    "detect_on": "canvas",
    // activate
    "events": {
      "onhover": {
        "enable": true,
        "mode": [
          "bubble",

        ]
      },
      "onclick": {
        "enable": true,
        "mode": "grab"
      },
      "resize": true
    },
    // configure
    "modes": {
      "grab": {
        "distance": 10,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 60,
        "size": 12,
        "duration": 10,
        "opacity": 1,
        "speed": 2
      },
      "repulse": {
        "distance": 40,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 20 // How many you want added
      },
      "remove": {
        "particles_nb": 10
      }
    }
  }




}



const initialState = {
  input: '',
  imageUrl: '',
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}



class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  calculateFaceLocations = (data) => {
    return data.outputs[0].data.regions.map(face=>{
      const oneface=face.region_info.bounding_box;
      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        leftCol: oneface.left_col * width,
        topRow: oneface.top_row * height,
        rightCol: width - (oneface.right_col * width),
        bottomRow: height - (oneface.bottom_row * height)
      }

    });}

  displayFaceBox = (boxes) => {
    
    this.setState({ boxes: boxes });

  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })

  }

  onImageButtonSubmit = () => {
    console.log('click');
    this.setState({ imageUrl: this.state.input });
    fetch('http://localhost:3000/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    }).then(response => response.json())
      .then(response => {
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          }).then(response => response.json())
            .then(count => {
              console.log("incrementing entries count");
              this.setState(Object.assign(this.state.user, { entries: count }))
            }).catch(err =>console.log(err));
        }
        console.log("response from onimagebuttonclick");
        console.log("response:"+response);
        this.displayFaceBox(this.calculateFaceLocations(response));
      })
      .catch(err => {
        console.log("================error==================")
        console.log(err);
      });}

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState);

    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route })
  }


  /*   componentDidMount(){
      fetch('http://localhost:3000')
      .then(response =>response.json())
      .then(console.log);
    }
  
   */

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }


  render() {
    const { isSignedIn, imageUrl, route, boxes } = this.state; //destructuring 
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions} />



        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {route === 'home'
          ? <div><Logo /><Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onImageButtonSubmit} />

            <FaceRecognition boxes={boxes} imageUrl={imageUrl} /> </div>
          : (
            route === 'signin' ?
              <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )}







      </div>
    );
  }

}

export default App;
