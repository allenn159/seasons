import React from "react";
import ReactDOM from "react-dom";

// the extends React.Component is just borrowing functionality from this other class into our class.
// You need to use super(props) if you use a constructor function so it doesn't override
// the constructor from React.Component
class App extends React.Component {
  constructor(props) {
    super(props);

    // THIS IS THE ONLY TIME WE DO direct assignment to this.state
    this.state = { lat: null, errorMessage: "" };

    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({ lat: position.coords.latitude });

        // we did not!!!
        // this.state.lat = position.coords.latitude
      },
      (err) => {
        this.setState({ errorMessage: err.message });
      }
    );
  }

  // React says we have to define render!!
  // This is conditional rendering. Will need to refactor however!
  render() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>;
    }

    if (!this.state.errorMessage && this.state.lat) {
      return <div>Latitude: {this.state.lat}</div>;
    }

    return <div>Loading!</div>;
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
