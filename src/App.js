import logo from "./logo.svg";
import "./App.css";
import PostsLists from "./features/posts/postsList";
import AddPostForm from "./features/posts/AddPostForm";
function App() {
  return (
    <div className="App">
      <AddPostForm />
      <PostsLists />
    </div>
  );
}

export default App;
