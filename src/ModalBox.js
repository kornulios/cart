import React, { Component } from 'react';

class ModalBox extends Component {
  render() {
    return (
      <div className='modal-box'>
        <div className='modal-content'>
          <p>{this.props.text}</p>
          <input type="text" value="Balue"></input>
          <br />
          <button onClick={this.props.onSubmit}>Submit</button>
          <button>Cancel</button>
        </div>
      </div>
    );
  }
}

export default ModalBox;