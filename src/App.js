import logo from "./logo.svg";
import "./App.css";
import PostsLists from "./features/posts/postsList";
import AddPostForm from "./features/posts/AddPostForm";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import SinglePostPage from "./features/posts/SinglePostPage";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route index element={<PostsLists />} />
        <Route path='post'>
          <Route index element={<AddPostForm />} />
          <Route path=':postId' element={<SinglePostPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
