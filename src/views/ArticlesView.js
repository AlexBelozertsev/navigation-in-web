import React, { Component } from 'react';
// import axios from 'axios';
import SearchForm from '../components/SearchForm';
import newsApi from '../services/news-api';

// axios.defaults.headers.common['Authorization'] =
//   'Bearer 4330ebfabc654a6992c2aa792f3173a3';


class ArticlesView extends Component {
  state = {
    articles: [],
    currentPage: 1,
    searchQuery: '', //for pagination here <button onClick={this.fetchArticles}>
    isLoading: false,
    error: null,
  };

  // componentDidMount() {
    // promise without axios.defaults.headers.common['Authorization']...
    // axios.get(`https://newsapi.org/v2/everything?q=mars&apiKey=4330ebfabc654a6992c2aa792f3173a3`)
    //next promise go to this.fetchArticles 
    // axios.get(`https://newsapi.org/v2/everything?q=mars`)
      // .then(resp => {
        // console.log(resp.data.articles)
  //       this.setState({ articles: resp.data.articles })
  //     })
  // }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchArticles();
    }
  }

  onChangeQuery = query => {
    // const { currentPage } = this.state;
    // axios.get(`https://newsapi.org/v2/everything?q=${query}&pageSize=10&page=${currentPage}`)
    //   .then(resp => {
    //     this.setState(prevState => ({
    //       articles: resp.data.articles,
    //       currentPage: prevState.currentPage +1,
    //     }))
    //   })
    this.setState({
      searchQuery: query,
          currentPage: 1,
          articles: [],
          error: null,
    });
    // this.fetchArticles(query) /func вызовется c query='' т.к. она синхронна, а this.setState - async. выход ->this.componentDidUpdate/
  };

  fetchArticles = () => {
    const { currentPage, searchQuery } = this.state;
    const options = {
      searchQuery,
      currentPage
    };
    // axios.get(`https://newsapi.org/v2/everything?q=${searchQuery}&pageSize=10&page=${currentPage}`)
    //   .then(resp => {
    //     this.setState(prevState => ({
    //       articles: [...prevState.articles, ...resp.data.articles],
    //       currentPage: prevState.currentPage + 1,
    //     }))
    //   })

      this.setState({ isLoading: true });
      newsApi
        .fetchArticles(options)
        .then(articles => {
          this.setState(prevState => ({
            articles: [...prevState.articles, ...articles],
            currentPage: prevState.currentPage + 1,
          }));
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ isLoading: false }));
  };

  render() {
    const { articles, isLoading, error } = this.state;
    const shouldRenderLoadMoreButton = articles.length > 0 && !isLoading;

    return (
      <div>
        {error && <h1>Your query is incorrect. Error.</h1>}

        <SearchForm onSubmit={this.onChangeQuery} />

        <ul>
          {articles.map(({ title, url }) => (
            <li key={title}>
              <a href={url}>{title}</a>
            </li>
          ))}
        </ul>

        {isLoading && <h2>Loading...</h2>}

        {shouldRenderLoadMoreButton && (
          <button type="button" onClick={this.fetchArticles}>
          Load more
          </button>)}
      </div>
    );
  }
}

export default ArticlesView;
