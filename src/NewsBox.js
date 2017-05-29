import React, { Component } from 'react';

class NewsBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      newsPerPage: 5
    }
    this.showNextPage = this.showNextPage.bind(this);
    this.showPrevPage = this.showPrevPage.bind(this);
  }

  showNextPage(e) {
    e.preventDefault();
    const totalNewsLength = this.props.data.length;
    const maxPages = totalNewsLength / this.state.newsPerPage;
    if (this.state.currentPage < maxPages)
      this.setState({currentPage: this.state.currentPage + 1});
  }

  showPrevPage() {
    if (this.state.currentPage > 1) this.setState({currentPage: this.state.currentPage - 1});
  }

  render() {
    const lastNews = this.state.currentPage * this.state.newsPerPage;
    const firstNews = lastNews - this.state.newsPerPage;
    const currentNews = this.props.data.slice(firstNews, lastNews);
    
    //console.log (totalNewsLength);
    let newsNodes = currentNews.map(item => {
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
        <div className='pages'>
          <a href='#' onClick={this.showPrevPage}>&#9668; Prev</a>&nbsp;
          <a href='#' onClick={this.showNextPage}>Next &#9658;</a>
        </div>
      </div>
    )
  }

}

export default NewsBox;