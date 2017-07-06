import React, { Component } from 'react';
import axios from 'axios';

class RacesBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getAllRaces() {
    axios.get(this.props.apiPath + '/races')
      .then(res => {
        this.setState({ races: res.data, type: this.props.type });
        //console.log(this.state.races);
      });
  }

  componentDidMount() {
    this.getAllRaces();
  }

  render() {
    let racesData = (this.state.races ? this.state.races.map(val => {
      return (
        <RaceBox
          key={val._id}
          date={val.date.substr(0, 10)}
          name={val.name}
          location={val.location}
        />
      )
    }) : "Loading races...");

    return (
      <div>
        {racesData}
      </div>
    );
  }

}

const RaceBox = (props) => {
  return (
    <div>
      <table className='races-table'>
        <thead>
          <tr><th colSpan="2">{props.name}</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>Date: {props.date}</td>
            <td>Location: {props.location}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export { RacesBox };