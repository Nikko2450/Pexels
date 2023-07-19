import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.sass";
import { Home } from "./pages/Home/Home";
import { Photo } from "./pages/Photo/Photo";
import { Video } from "./pages/Video/Video";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/photo",
      element: <Photo />,
    },
    {
      path: "/video",
      element: <Video />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
