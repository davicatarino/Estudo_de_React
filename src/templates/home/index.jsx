import "./styles.css";
import { Component } from "react";

import { loadPosts } from "../../utils/load-posts";
import { Posts } from "../../components/Posts";
import { Button } from "../../components/button";

class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postPerPage: 2,
    searchValue: '',
  };

  async componentDidMount() {
    await this.loadPosts();
  }
  loadPosts = async () => {
    const { page, postPerPage } = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postPerPage),
      allPosts: postsAndPhotos,
    });
  };

  loadMorePosts = () => {
    const { page, postPerPage, allPosts, posts } = this.state;
    const nextPage = page + postPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postPerPage);
    posts.push(...nextPosts);
    this.setState({ posts, page: nextPage });
  };

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  };

  render() {
    const { posts, page, postPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postPerPage >= allPosts.length;

    const filteredPosts = !!searchValue
      ? allPosts.filter(post => {
          return post.title.toLowerCase().includes(
            searchValue.toLowerCase()
            );
        })
      : posts;

    return (
      <section className="container">
        {!!searchValue && (
          <>
            <h1>search value: {searchValue}</h1>
          </>
        )}
        <input value={searchValue} onChange={this.handleChange} type="search" />
        <br />
        <br />
        <br />
        {filteredPosts.length>0&&(
          <Posts posts={filteredPosts}
          
          />

        )}
        {filteredPosts.length===0&&(
          <p>nao existe irmao</p>

        )}
        <div className="button-container">
          {!searchValue && (
            <Button
              text="load"
              onClick={this.loadMorePosts}
              disabled={noMorePosts}
            />
          )}
        </div>
      </section>
    );
  }
}

export default Home;
