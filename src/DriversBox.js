import React, { Component } from 'react';

class DriversBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      drivers: [],
      racesRun: 0
    }
  }

  componentDidMount() {
    fetch('/api/drivers')
      .then(res => res.json())
      .then(drivers => {
        this.setState({ drivers, racesRun: drivers[0].points.length })
      })
  }

  render() {

    let headers = "";
    let elem = "";

    switch (this.props.type) {
      case 'totals':
        headers = (
          <thead>
            <tr>
              <td>#</td>
              <td>Driver</td>
              <td>Points</td>
            </tr>
          </thead>
        );
        elem = this.state.drivers.map((val, index) => {
          return (<tr key={val._id}>
            <td>{index + 1}</td>
            <td>{val.name}</td>
            <td>{val.total}</td>
          </tr>)
        });
        break;
      case 'results':
        let raceHeadRow = [];
        for (var i = 0; i < this.state.racesRun; i++) {
          raceHeadRow.push(<td className='points-row'>GP #{i + 1}</td>);
        }
        headers = (
          <thead>
            <tr>
              <td>#</td>
              <td>Pilot</td>
              {raceHeadRow}
              <td>Total</td>
            </tr>
          </thead>
        );
        elem = this.state.drivers.map((val, index) => {
          let pointsRow = val.points.map((pt, j) => {
            return (<td key={val._id + j} width='50px' className='points-row'>{pt}</td>);
          });
          return (
            <tr key={val._id}>
              <td width='15px'>{index + 1}</td>
              <td width='180px'>{val.name}</td>
              {/*//races*/}
              {pointsRow}
              <td>{val.total}</td>
            </tr>
          )
        });
        break;
      default:
        elem = (<p>WARNING: Invalid driver box selected</p>);
        break;
    }


    return (
      <div className='drivers-container fx-item'>
        <h2>Standings:</h2>
        <table className='drivers-table'>
          {headers}
          <tbody>
            {elem}
          </tbody>
        </table>
      </div>
    );
  }
}

export default DriversBox;