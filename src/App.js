import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import Menu from './Menu';
import NewsBox from './NewsBox';
import DriversBox from './DriversBox';
import AdminPanel from './Admin';
import './App.css';

const Header = () => (
  <div className='App-header'>
    <h1>LuxCart</h1>
  </div>
)

const Schedule = (props) => (
  <div>
    <p>Hello schedule!</p>
  </div>
)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.loadNewsFromServer = this.loadNewsFromServer.bind(this);
  }

  loadNewsFromServer() {
    axios.get(this.props.url + '/news').then(res => {
      this.setState({ data: res.data });
    });
  }

  componentDidMount() {
    this.loadNewsFromServer();
    // setInterval(this.loadNewsFromServer, this.props.pollInterval);
  }

  render() {
    return (
      <Router>
        <div className='App' id='home'>
          <Header />
          <Menu />
          <Route path="/" exact={true} render={props => (
            <div className='fx-container'>
              <NewsBox data={this.state.data} />
              <DriversBox />
            </div>
          )} />
          <Route path="/schedule" component={Schedule} />
          
          <Route path="/admin" render={
            props => (<AdminPanel apiPath={this.props.url} data={this.state.data} onUpdate={this.loadNewsFromServer} />
            )} />
        </div>
      </Router>
    );
  }
}

export default App;
