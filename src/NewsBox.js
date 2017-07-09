import React, { Component } from 'react';
import axios from 'axios';

class NewsBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      newsPerPage: 6,
      data: []
    }
    this.showNextPage = this.showNextPage.bind(this);
    this.showPrevPage = this.showPrevPage.bind(this);
    this.loadNews = this.loadNews.bind(this);
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

  loadNews() {
    axios.get(this.props.apiPath + '/news').then(res => {
      this.setState({ data: res.data });
    });
  }

  componentDidMount() {
    this.loadNews();
  }

  render() {
    const lastNews = this.state.currentPage * this.state.newsPerPage;
    const firstNews = lastNews - this.state.newsPerPage;
    const currentNews = this.state.data.slice(firstNews, lastNews);

    const newsNodes = (this.state.data.length > 0) ? (currentNews.map(item =>
      (
        <div className='newsbox' key={item._id}>
          <h3>{item.title}</h3>
          <div><MultiLine text={item.text} /></div>
          <em>by {item.author}</em>
        </div>
      ))
    ) : (<div>Loading...</div>);

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

const MultiLine = (props) => {
  let myText = props.text.split('\n').map(val => {
    return (<div key={val.substr(0,3)}>{val}</div>)
  });
  return (<div>{myText}</div>);
}

export default NewsBox;