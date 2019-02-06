import React, { Component } from 'react';
import './App.css';

const Quote = props => {
  return (
    <div>
      <p>{props.sentence.quote}</p>
      <p>{props.sentence.author}</p>
    </div>
  )
}

class App extends Component {

  state = {
    sentence: {
      quote: 'Loading....',
      author: ''
    }
  }

  handleFetch = () => {
    fetch("http://quotes.stormconsultancy.co.uk/random.json")
      .then(response => response.json())
      .then(json => this.setState({
        sentence: json
      }));
  }

  componentWillMount() {
    this.handleFetch();
  }

  render() {

    return (
      <div>
        <h1>Quote Machine</h1>
        <Quote sentence={this.state.sentence} />
        <button onClick={this.handleFetch}>Fetch</button>
      </div>
    );
  }
}

export default App;
