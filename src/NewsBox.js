import React, { Component } from 'react';

class NewsBox extends Component {
  render() {
    let newsNodes = this.props.data.map(item => {
      return (
        <div className='newsbox' key={item._id}>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
          <em>by {item.author}</em>
        </div>
      );
    });
    return (
      <div>
        { newsNodes }
      </div>
    )
  }
}

export default NewsBox;