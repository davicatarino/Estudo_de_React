import "./App.css";
import { Component } from "react";

class App extends Component {
  state = {
    counter: 0,
    posts: [
      {
        id: 1,
        title: "titulo 1",
        body: "corpo 1",
      },
      {
        id: 2,
        title: "titulo 2",
        body: "corpo 2",
      },
      {
        id: 3,
        title: "titulo 3",
        body: "corpo 3",
      },
    ],
  };
  timeoutUpdate = null;
  componentDidMount() {
    this.handleTimeout();
  }
  componentDidUpdate() {
    this.handleTimeout();
  }
  componentWillUnmount() {
    clearTimeout(this.timeoutUpdate);
  }
  handleTimeout = () => {
    const { posts, counter } = this.state;
    posts[0].title = "o bglh doido";

    this.timeoutUpdate = setTimeout(() => {
      this.setState({ posts, counter: counter + 1 });
    }, 1000);
  };

  render() {
    const { posts, counter } = this.state;
    return (
      <div className="App">
        <h1>{counter}</h1>
        {posts.map((post) => (
          <div key={post.id}>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
