import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createHashRouter,
} from "react-router-dom";
import Home from './views/home'
import Login from './views/login'
import BookViewer from './views/bookViewer'
import Error from './views/error'
import { RecoilRoot } from "recoil";
const router = createHashRouter([
  {
    path: "/",
    element: <Home></Home>,
    errorElement: <Error />,
  },
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
]);
function App() {
  return (
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  );
}

export default App;
