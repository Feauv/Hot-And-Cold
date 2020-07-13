import React from 'react';
import './App.css';
import $ from "jquery";

class App extends React.Component {

  constructor(props) {
    super(props)
    this.windowOnLoad = this.windowOnLoad.bind(this)
    this.getPositionAtCenter = this.getPositionAtCenter.bind(this)
    this.getDistanceBetweenElements = this.getDistanceBetweenElements.bind(this)
    this.hot = 255
    this.cold = 0
  }

  componentDidMount() {
    // On Load Listener and Call
    window.addEventListener('load', this.windowOnLoad)

    // On Mouse Movement Listener and Function
    document.addEventListener('mousemove', (e) => {

      // Distance Calculations Call
      var distance = Math.round(
        this.getDistanceBetweenElements(
          document.getElementById('mouse-location'),
          document.getElementById('hidden')
        )
      )

      // Win condition along with Hot & Cold calculations to change the color. The circle starts changing 
      // from red to blue once it is 510px (255 * 2) away from the hidden div.
      if(distance <= 10) {
        const yGeneration = Math.round(0 + Math.random() * (window.innerHeight - 0))
        const xGeneration = Math.round(0 + Math.random() * (window.innerWidth - 0))
    
        $('#hidden').css({
          top: yGeneration,
          left: xGeneration,
        });
      } else if(distance < 510) {
        this.setState((state, props) => {
          return {
            hot: distance/2,
            cold: (510 - distance)/2
          };
        });
      } else {
        this.setState((state, props) => {
          return {
            hot: 255,
            cold: 0
          };
        });
      }

      // Circle position and color change and Title heading color change.
      $('#mouse-location').css({
        left:  e.pageX - 25,
        top:   e.pageY - 25,
        "background-color": "rgb(" + this.state.hot + ",0," + this.state.cold + ")"
      });  

      $('h1').css({
        "color": "rgb(" + this.state.hot + ",0," + this.state.cold + ")"
      })

    })
  }

  // Distance Calculations: Simply using the pythagorean theorem to find the distance between two points. 
  // Although I understand these calculations thoroughly, I am not claiming this code as my own idea. Found 
  // it from a highly-upvoted answer to finding the distance between two HTML elements on Stack Overflow. 
  getPositionAtCenter(element){
    const {top, left, width, height} = element.getBoundingClientRect();
    return {
      x: left + width / 2,
      y: top + height / 2
    };
  }
 
  getDistanceBetweenElements(a, b){
    const aPosition = this.getPositionAtCenter(a);
    const bPosition = this.getPositionAtCenter(b);

    return Math.hypot(aPosition.x - bPosition.x, aPosition.y - bPosition.y);  
  }

  // On Load: Initialize the CSS for my div that follows the mouse, and for my hidden div that they must find.
  // Originally tried to set #hidden to display: none but that did not work for setting its postion, so I just 
  // made its background color white.
  windowOnLoad() {
    $('#mouse-location').css({
      position: "absolute",
      "background-color": "red",
      height: 50,
      width: 50,
      "border-style": "solid",
      "border-width": "0",
      "border-radius": 50,
    })

    const yGeneration = Math.round(0 + Math.random() * (window.innerHeight - 2))
    const xGeneration = Math.round(0 + Math.random() * (window.innerWidth - 2))

    $('#hidden').css({
      position: "absolute",
      height: 2,
      width: 2,
      "background-color" : "white",
      top: yGeneration,
      left: xGeneration,
    });
  }

  render() {
      return (
      <div className="App" id="app">
        <h1>
          Hot & Cold
        </h1>

        <div id="mouse-location"></div>
        <div id="hidden"></div>
      </div>
    );
  }
}

export default App;
