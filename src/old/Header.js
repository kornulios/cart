import React, { Component, PropTypes } from 'react';

class Header extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    type: PropTypes.oneOf(['news', 'photos'])
  };
  render() {
    console.log('items', this.props.items);
    return (
      <div>
        Header
        {this.props.items.map((item, index) =>
          <div key={index}><a href={item.link}>{item.label}</a></div>
        )}
      </div>
    );
  }
}

export default Header;
