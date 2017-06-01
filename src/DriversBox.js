import React, { Component } from 'react';

class DriversBox extends Component {
  render() {
    const headers = (
      <thead>
        <th>#</th>
        <th>Driver</th>
        <th>Points</th>
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
        <table>
          { headers }
          { tdata }
        </table>
      </div>
    );
  }
}

export default DriversBox;