import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import Home from './views/index.page'
import Login from './views/login.page'
import Error from './views/error-page'
import { RecoilRoot } from "recoil";
const router = createBrowserRouter([
  {
    path: "/home",
    element: <Home></Home>,
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <Login></Login>,
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
