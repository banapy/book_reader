import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createHashRouter,
} from "react-router-dom";
import Home from './views/home'
import Login from './views/login'
import BookViewer from './views/bookViewer'
import UploadBook from './views/uploadBook'
import Error from './views/error'
import About from './views/about'
import Message from './views/message'
import Account from './views/account'
import Setting from './views/setting'
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
    element: <Home></Home>,
    errorElement: <Error />,
  },
]);
function App() {
  return (
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  );
}

export default App;
