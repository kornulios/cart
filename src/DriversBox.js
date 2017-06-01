import React, { Component } from 'react';

class DriversBox extends Component {
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

    const tdata = (
      <tr>
        <td>1</td>
        <td>Iatsand</td>
        <td>0</td>
      </tr>
    );

    return (
      <div className='drivers-container fx-item'>
        <h2>Standings:</h2>
        <table>

          {headers}
          <tbody>
            {tdata}
          </tbody>
        </table>
      </div>
    );
  }
}

export default DriversBox;