import React, { Component } from 'react';
import './App.css';
import Navigation from './Component/Navigation/Navigation';
import FaceRecognition from './Component/FaceRecognition/FaceRecognition.js'
import Logo from './Component/Logo/Logo';
import ImageLinkForm from './Component/ImageLinkForm/ImageLinkForm';
import Rank from './Component/Rank/Rank';
import './App.css'
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import SignIn from './Component/SignIn/SignIn';
import Register from './Component/Register/Register';
import Timer from './Component/Timer/Timer';

const app = new Clarifai.App({
  apiKey: '2576c6a76873478f9b9257a5cd76842f'
});

const particlesOptions = {
  particles: {
    line_linked: {
      shadow: {
        enable: true,
        color: "#8d8d8d",
        blur: 1
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({ user:{
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined}
    })
  }

  componentDidMount() {
    fetch('http://localhost:3000/')
      .then(response => response.json())
      .then(console.log)
  }
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({ box: box });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict(
        // HEADS UP! Sometimes the Clarifai Models can be down or not working as they are constantly getting updated.
        // A good way to check if the model you are using is up, is to check them on the clarifai website. For example,
        // for the Face Detect Mode: https://www.clarifai.com/models/face-detection
        // If that isn't working, then that means you will have to wait until their servers are back up. Another solution
        // is to use a different version of their model that works like: `c0c0ac362b03416da06ab3fa36fb58e3`
        // so you would change from:
        // .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
        // to:
        // .predict('c0c0ac362b03416da06ab3fa36fb58e3', this.state.input)
        {
          id: "a403429f2ddf4b49b307e318f00e528b",
          version: "34ce21a40cc24b6b96ffee54aabff139",
        },
        this.state.input
      )
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));

  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignIn: false})
    } else if (route === 'home') {
      this.setState({isSignIn: true})
    }
    this.setState({route: route})
  }

  render() {
    const { isSignIn, imageUrl, route, box} = this.state;
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation isSignIn={isSignIn} onRouteChange={this.onRouteChange}/>
        { route === "home" 
          ? <div><Logo />
          <Timer date={new Date()}/>
          <Rank />
          <ImageLinkForm
          onInputChange={this.onInputChange}
          OnButtonSubmit={this.onButtonSubmit} />
          <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
          : (
            route === 'signin' ? <SignIn onRouteChange = {this.onRouteChange} />
            : <Register loadUser={this.loadUser} onRouteChange = {this.onRouteChange} />
            )
           }
      </div>
    )
  }
}
export default App;
