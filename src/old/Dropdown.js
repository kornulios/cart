import React, { Component } from 'react';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false
    };
  }

  toggleState() {
    this.setState({ isOpened: !this.state.isOpened });
  }

  render() {
    console.log("isOpened ", this.state.isOpened);
    let dropDownText;
    if (this.state.isOpened) {
      dropDownText = <div>Here is shown dropdown</div>
    }
    return (
      <div onClick={this.toggleState.bind(this)}>
        Is dropdown
        {dropDownText}
      </div>
    );

  }
}

export default Dropdown;
