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
      <tbody>
        <tr>
          <td>1</td>
          <td>Iatsand</td>
          <td>0</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Driver 2</td>
          <td>0</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Driver 3</td>
          <td>0</td>
        </tr>
        <tr>
          <td>4</td>
          <td>Driver 4</td>
          <td>0</td>
        </tr>
      </tbody>
    );

    return (
      <div className='drivers-container fx-item'>
        <h2>Standings:</h2>
        <table>
          {headers}
          {tdata}
        </table>
      </div>
    );
  }
}

export default DriversBox;