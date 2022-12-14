import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createHashRouter,
} from "react-router-dom";
import BookRoom from './views/bookRoom'
import BookLibrary from './views/bookLibrary'
import Login from './views/login'
import BookViewer from './views/bookViewer'
import UploadBook from './views/uploadBook'
import Error from './views/error'
import About from './views/about'
import Message from './views/message'
import Account from './views/account'
import Setting from './views/setting'
import Register from './views/register'
import BookIntro from './views/bookIntro'
import { RecoilRoot } from "recoil";
const router = createHashRouter([
  {
    path: "/login",
    element: <Login></Login>,
    errorElement: <Error />,
  },
  {
    path: "/bookViewer/:bookId",
    element: <BookViewer></BookViewer>,
    errorElement: <Error />,
  },
  {
    path: "/bookIntro/:bookId",
    element: <BookIntro></BookIntro>,
    errorElement: <Error />,
  },
  {
    path: "/uploadBook",
    element: <UploadBook></UploadBook>,
    errorElement: <Error />,
  },
  {
    path: "/about",
    element: <About></About>,
    errorElement: <Error />,
  },
  {
    path: "/register",
    element: <Register></Register>,
    errorElement: <Error />,
  },
  {
    path: "/message",
    element: <Message></Message>,
    errorElement: <Error />,
  },
  {
    path: "/setting",
    element: <Setting></Setting>,
    errorElement: <Error />,
  },
  {
    path: "/account",
    element: <Account></Account>,
    errorElement: <Error />,
  },
  {
    path: "/",
    element: <BookRoom></BookRoom>,
    errorElement: <Error />,
  },
  {
    path: "/bookLibrary",
    element: <BookLibrary></BookLibrary>,
    errorElement: <Error />,
  },
]);
import BookEngine from "./bookEngine/BookEngine";
import { useEffect } from "react";
window.be = new BookEngine()
function App() {
  return (
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  );
}

export default App;
