import React, { Component } from 'react';
import axios from 'axios';

class RacesBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // this.toggleRaceResult = this.toggleRaceResult.bind(this);
    this.findPilotName = this.findPilotName.bind(this);
  }

  getAllRaces() {
    axios.get(this.props.apiPath + '/races')
      .then(res => {
        this.setState({ races: res.data, type: this.props.type });
        return axios.get(this.props.apiPath + '/drivers');
      }).then(res => {
        this.setState({ drivers: res });
      });
  }

  toggleRaceResult(raceId) {
    if (!raceId) return 0;
    if (raceId === this.state.showResult) {
      this.setState({ showResult: null })
    } else {
      this.setState({ showResult: raceId });
    }
  }

  findPilotName(pilotId) {
    let pilots = this.state.drivers.data;
    for (var i = 0; i < pilots.length; i++) {
      if (pilots[i]._id === pilotId) {
        return pilots[i].name;
      }
    }
    return "Pilot name not found";
  }

  componentDidMount() {
    this.getAllRaces();
  }

  render() {
    let racesData = (this.state.races && this.state.drivers ? this.state.races.map(val => {
      let myResults = (val.results.length > 0 ?
        val.results.map(res => (<li key={res}>{this.findPilotName(res)}</li>))
        : false);
      return (
        <RaceBox
          key={val._id}
          date={val.date.substr(0, 10)}
          name={val.name}
          time={val.time}
          results={myResults}
          showResult={val._id === this.state.showResult ? true : false}
          location={val.location}
          onDisplayResult={this.toggleRaceResult.bind(this, val._id)}
        />
      )
    }) : "Loading races...");

    return (
      <div className='races-box'>
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
            <td>Date: {props.date} Time: {props.time}</td>
            <td>Location: {props.location}</td>
          </tr>
          <tr>
            <td colSpan={2}>
              <button disabled={props.results}>Sign-up</button>
              <button disabled={!props.results} onClick={props.onDisplayResult}>Results</button>
            </td>
          </tr>
          {props.showResult ? (<tr><td colSpan={2}>
            <ol>{props.results}</ol>
          </td></tr>) : null}
        </tbody>

      </table>

    </div>
  );
}

export { RacesBox };