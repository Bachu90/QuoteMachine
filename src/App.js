import React, { Component } from 'react';
import './App.css';

const Quote = props => {
  return (
    <div>
      <p id="text">{props.sentence.quote}</p>
      <p id="author">{props.sentence.author}</p>
    </div>
  )
}

const Buttons = props => {
  return (
    <div className="buttons">
      <span id="new-quote" onClick={props.handleFetch}>New quote</span>
      <a href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=%22${props.sentence.quote}%22%20${props.sentence.author}`} target="_blank" rel="noopener noreferrer" id="tweet-quote">Tweet</a>
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

  handleFetch = (e) => {
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
      <>
        <h1>Quote Machine</h1>
        <div id="quote-box">
          <Quote sentence={this.state.sentence} />
          <Buttons sentence={this.state.sentence} handleFetch={this.handleFetch} />
        </div>
      </>
    );
  }
}

export default App;
