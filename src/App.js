import React, { Component } from 'react';
//import logo from './logo.svg';
//import Header from './Header';
//import RegistrationForm from './RegistrationForm';
import axios from 'axios';
import NewsBox from './NewsBox';
import DriversBox from './DriversBox';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.loadNewsFromServer = this.loadNewsFromServer.bind(this);
  }

  loadNewsFromServer() {
    axios.get(this.props.url).then(res => {
      this.setState({ data: res.data });
    });
  }

  componentDidMount() {
    this.loadNewsFromServer();
    setInterval(this.loadNewsFromServer, this.props.pollInterval);
  }

  render() {

    return (
      <div className='fx-container'>
        <NewsBox data={this.state.data} />
        <DriversBox />
      </div>
    );
  }
}

export default App;
