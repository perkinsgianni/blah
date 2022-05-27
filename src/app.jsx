import React, { Component } from 'react';
const axios = require('axios');

class App extends Component {
  // initialize state
  constructor(props) {
    super(props);

    this.state = {
      symbol: '',
      news: [],
      quote: []
    }

    // event binding
    this.updateSymbol = this.updateSymbol.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.retrieveQuote = this.retrieveQuote.bind(this);
  }

  // event handlers
  updateSymbol(e) {
    this.setState({ symbol: e.target.value.toUpperCase() });
  }

  handleSubmit() {
    this.retrieveQuote();
  }

  componentWillMount() {
    // invoke axios object
    axios
    // http get request to external web service
    .get('https://schwab.p.rapidapi.com/news/get-market-update', {
      headers: {
        'X-RapidAPI-Host': 'schwab.p.rapidapi.com',
        'X-RapidAPI-Key': '1ad76b53a8mshba3141588e81ad8p1deba9jsn20cf00093aa5'
      },
    })
    .then(res => {
      // first callback takes http response and returns data property
      const news = res.data;
    // second callback uses this.setState function to merge provided object with current object assigned to this.state
      this.setState({ news });
    });
  }

  retrieveQuote() {
    // invoke axios object
    axios
    // http get request to external web service
    .get('https://schwab.p.rapidapi.com/quote/get-details', {
      params: { symbol: this.state.symbol },
      headers: {
        'X-RapidAPI-Host': 'schwab.p.rapidapi.com',
        'X-RapidAPI-Key': '1ad76b53a8mshba3141588e81ad8p1deba9jsn20cf00093aa5'
      },
    })
    .then(res => {
      // first callback takes http response and returns data property
      const quote = res.data;
    // second callback uses this.setState function to merge provided object with current object assigned to this.state
      this.setState({ quote });
    });
  }

  render() {
    return (
      <div className='App'>
        {/* header */}
        <img 
          style={ { width: '100%', marginTop: '8%' }} 
          src='https://www.icas.com/__data/assets/image/0006/523428/shutterstock_394537039.jpg' 
          alt='Banner' 
        />
        <div style={ { width: '50%', marginLeft: '5%', marginTop: '-19%' } }>
          <div>
            <label style={ { color: 'white', fontSize: '20px' } }>SYMBOL:</label>
            <div>
              <input 
                style={ { textIndent: '5%', fontSize: '18px', width: '15%', borderRadius: '25px', position: 'absolute' } } 
                value={ this.state.symbol } 
                onChange={ this.updateSymbol } />
              <button 
                style={ { fontSize: '10px', color: 'white', backgroundColor: 'black', float: 'right', marginTop: '4.55px', marginRight: '69.2%', borderRadius: '25px', position: 'relative' } } 
                onClick={ this.handleSubmit }>
                  SUBMIT
              </button>
            </div>
          </div>
          {/* first marquee: news */}
          <div style={ { height: '40px', width: '200%', backgroundColor: 'black', opacity: '0.7', marginLeft: '-10%', marginTop: '38%' } }>
            <marquee
              style={ { fontSize: '18px', marginTop: '9px', color: 'white' } }
              behavior='scroll'
              direction='left'
            >
                { JSON.stringify(this.state.news['Teaser'], null, 2) }
            </marquee>
          </div>
          {/* second marquee: quote */}
          <div style={ { height: '40px', width: '200%', backgroundColor: 'black', opacity: '0.7', marginLeft: '-10%', marginTop: '3%' } }>
            <marquee
              style={ { fontSize: '18px', marginTop: '9px', color: 'white' } }
              behavior='scroll'
              direction='left'
            >
                { JSON.stringify(this.state.quote['MutualFunds'], null, 2) }
            </marquee>
          </div>

          {/* <div style={ { height: '40px', width: '200%', backgroundColor: 'black', opacity: '0.7', marginLeft: '-10%', marginTop: '3%' } }>
            { JSON.stringify(this.state.quote['MutualFunds'], ['MutualFunds', 'QuoteOutput', 'Change']) <= 0 ? (
              <marquee
                style={ { fontSize: '18px', marginTop: '9px', color: 'red' } }
                behavior='scroll'
                direction='left'
              >
                  { JSON.stringify(this.state.quote['MutualFunds'], null, 2) }
              </marquee>
            ) : (
              <marquee
                style={ { fontSize: '18px', marginTop: '9px', color: 'green' } }
                behavior='scroll'
                direction='left'
              >
                  { JSON.stringify(this.state.quote['MutualFunds'], null, 2) }
              </marquee>
            )}
          </div> */}
          
        </div>
      </div>
    );
  }
}

export default App;
