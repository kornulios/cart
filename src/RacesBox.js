import React, { Component } from 'react';
import axios from 'axios';

class RacesAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getAllRaces() {
    axios.get(this.props.apiPath + '/races')
      .then(res => {
        this.setState({ races: res.data });
        console.log(this.state.races);
      });
  }

  componentDidMount() {
    this.getAllRaces();
  }

  render() {
    let racesData = (this.state.races ? this.state.races.map(val => {
      return (<p key={val._id}>{val.name}</p>)
    }) : "No races");

    return (
      <div>
        {racesData}
      </div>
    );
  }

}

export { RacesAdmin };