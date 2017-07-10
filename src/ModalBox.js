import React, { Component } from 'react';

class ModalBox extends Component {

  submitForm() {
    let val = 'Kalunga';
    this.props.onSubmit(val);
  }

  handleClick(e) {
    e.preventDefault();
    if (e.target.id === 'modal-id') this.props.onCancel();
  }

  render() {

    const modalFooter = (
      <div className='modal-footer'>
        <button onClick={this.submitForm.bind(this)}>Submit</button>
        <button onClick={this.props.onCancel}>Cancel</button>
      </div>
    );

    return (
      <div className='modal-box' id='modal-id' onClick={this.handleClick.bind(this)}>
        <div className='modal-content'>
          <div className='modal-body'>
            <p>{this.props.text}</p>
            <input type="text" value="Balue"></input>
          </div>
          {modalFooter}
        </div>
      </div>
    );
  }
}

export default ModalBox;