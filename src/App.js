import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Menu from './Menu';
import NewsBox from './NewsBox';
import DriversBox from './DriversBox';
import AdminPanel from './Admin';
import { RacesBox } from './RacesBox';
import './styles/App.css';

const Header = () => (
  <div className='App-header'>
    <h1>LuxCart</h1>
  </div>
)


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  

  render() {
    return (
      <Router>
        <div className='App' id='home'>
          <Header />
          <Menu />

          <Route path="/" exact={true} render={props => (
            <div className='fx-container'>
              <NewsBox apiPath={this.props.url} />
              <DriversBox type="totals" />
            </div>
          )} />

          <Route path="/schedule" render={props => (
            <RacesBox
              apiPath={this.props.url} />
          )} />

          <Route path="/table" render={props => (
            <div>
              <DriversBox type='results' />
            </div>
          )} />

          <Route path="/admin" render={props => (
            <AdminPanel
              apiPath={this.props.url}
              onUpdate={this.loadNewsFromServer} />
          )} />
        </div>
      </Router>
    );
  }
}

export default App;
