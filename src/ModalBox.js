import React, { Component } from 'react';

class ModalBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: ""
    }
  }

  submitForm() {
    this.props.onSubmit(this.state.value);
  }

  handleClick(e) {
    e.preventDefault();
    if (e.target.id === 'modal-id') this.props.onCancel();
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
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
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange.bind(this)}
            />
          </div>
          {modalFooter}
        </div>
      </div>
    );
  }
}

export default ModalBox;