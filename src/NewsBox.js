import React, { Component } from 'react';

class NewsBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      newsPerPage: 3
    }
    this.showNextPage = this.showNextPage.bind(this);
    this.showPrevPage = this.showPrevPage.bind(this);
  }

  showNextPage(e) {
    e.preventDefault();
    const totalNewsLength = this.props.data.length;
    const maxPages = totalNewsLength / this.state.newsPerPage;
    if (this.state.currentPage < maxPages)
      this.setState({ currentPage: this.state.currentPage + 1 });
  }

  showPrevPage(e) {
    e.preventDefault();
    if (this.state.currentPage > 1) this.setState({ currentPage: this.state.currentPage - 1 });
  }

  render() {
    const lastNews = this.state.currentPage * this.state.newsPerPage;
    const firstNews = lastNews - this.state.newsPerPage;
    const currentNews = this.props.data.slice(firstNews, lastNews);

    const newsNodes = ( this.props.data.length > 0 ) ? (currentNews.map(item =>
      (
        <div className='newsbox' key={item._id}>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
          <em>by {item.author}</em>
        </div>
      ))
    ) : (<div>Loading...</div>);

    // const newsNodes = (<div>Hello</div>);

    return (
      <div className='news-container fx-item'>
        <div className=''>
          <h2>News:</h2>
          {newsNodes}
        </div>
        <div className='pages '>
          <a href='#' onClick={this.showPrevPage}>&#9668;</a>&nbsp;
          <a href='#' onClick={this.showNextPage}>&#9658;</a>
        </div>
      </div>
    )
  }

}

export default NewsBox;