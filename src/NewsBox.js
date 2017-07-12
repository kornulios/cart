import React, { Component } from 'react';
import axios from 'axios';

class NewsBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsPerPage: 6,
      displayedNews: 6,
      data: []
    }
    this.showNextPage = this.showNextPage.bind(this);
    this.loadNews = this.loadNews.bind(this);
  }

  showNextPage(e) {
    e.preventDefault();
    let displayed = this.state.displayedNews + 6;
    if (displayed > this.state.data.length) displayed = this.state.data.length
    this.setState({ displayedNews: displayed });
  }

  loadNews() {
    axios.get(this.props.apiPath + '/news').then(res => {
      this.setState({ data: res.data });
    });
  }

  componentDidMount() {
    this.loadNews();
  }

  componentDidUpdate() {
    window.scrollTo(0, document.body.scrollHeight);
    // this.newsNode.scrollIntoView({ block: "end", behavior: 'smooth' });
  }

  render() {
    const currentNews = this.state.data.slice(0, this.state.displayedNews);
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
      <div className='news-container fx-item' ref={(div) => (this.newsNode = div)}>
        <div className=''>
          <h2>News:</h2>
          {newsNodes}
        </div>
        <div className='pages '>
          <a href='#' onClick={this.showNextPage} className='more-button'>{this.state.data.length === this.state.displayedNews ? 'No more news' : 'More'}</a>
        </div>
      </div>
    )
  }

}

const MultiLine = (props) => {
  let myText = props.text.split('\n').map(val => {
    return (<div key={val.substr(0, 3)}>{val}</div>)
  });
  return (<div>{myText}</div>);
}

export default NewsBox;