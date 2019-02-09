import React, { Component } from 'react';
import './App.css';

const Loading = () => {
  return (
    <p className="loading">Loading...</p>
  )
}

const Quotes = props => {
  const { index, quotes } = props;
  return (
    <div className="quotes">
      <p id="text"><i className="fas fa-quote-left"></i>{quotes[index].quote}<i className="fas fa-quote-right"></i></p>
      <p id="author">{quotes[index].author}</p>
    </div>
  )
}

const Buttons = props => {
  const { index, quotes, nextQuote } = props;
  return (
    <div className="buttons">
      <a href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${encodeURIComponent('"' + quotes[index].quote + '" ' + quotes[index].author)}`} id="tweet-quote" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
      <button id="new-quote" onClick={nextQuote}>New quote</button>
    </div>
  )
}

const QuoteBox = props => {
  const { quotes, index, nextQuote } = props;
  if (quotes && index) {
    return (
      <div id="quote-box">
        <Quotes quotes={quotes} index={index} />
        <Buttons quotes={quotes} index={index} nextQuote={nextQuote} />
      </div>
    );
  } else {
    return (
      <div id="quote-box">
        <Loading />
      </div>
    )
  }

}


class App extends Component {

  state = {

  }

  nextQuote = (e) => {
    (!document.querySelector('.quotes').classList.contains('hidden') && document.querySelector('.quotes').classList.add('hidden'));
    setTimeout(() => {
      const index = Math.floor(Math.random() * this.state.quotes.length);
      this.setState({
        index
      });
      (document.querySelector('.quotes').classList.contains('hidden') && document.querySelector('.quotes').classList.remove('hidden'));
    }, 600)

  }

  componentWillMount() {
    fetch("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json")
      .then(response => response.json())
      .then(json => {
        const index = Math.floor(Math.random() * json.quotes.length);
        this.setState({
          quotes: json.quotes,
          index
        })
      });
  }

  render() {
    const { quotes, index } = this.state;
    return (
      <>
        <div className="wrapper">
          <QuoteBox quotes={quotes} index={index} nextQuote={this.nextQuote} />
        </div>
      </>
    );
  }
}

export default App;
