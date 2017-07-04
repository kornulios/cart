import React, { Component } from 'react';

class DriversBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      drivers: []
    }
  }

  componentDidMount() {
    fetch('/api/drivers')
      .then(res => res.json())
      .then(drivers => {
        this.setState({ drivers })
      })
  }

  render() {
    const headers = (
      <thead>
        <tr>
          <td>#</td>
          <td>Driver</td>
          <td>Points</td>
        </tr>
      </thead>
    );
    
    const ed = this.state.drivers.map((val, index) => {
      return (<tr key={val._id}>
        <td>{index+1}</td>
        <td>{val.name}</td>
        <td>{val.points}</td>
      </tr>)
    });

    return (
      <div className='drivers-container fx-item'>
        <h2>Standings:</h2>
        <table>
          {headers}
          <tbody>
            {ed}
          </tbody>
        </table>
      </div>
    );
  }
}

export default DriversBox;