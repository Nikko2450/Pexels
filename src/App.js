import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.sass";
import { Home } from "./pages/Home/Home";
import { Photos } from "./pages/Photos/Photos";
import { Videos } from "./pages/Videos/Videos";
import { Photo } from "./pages/Photo/Photo";
import { Video } from "./pages/Video/Video";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/photos",
      element: <Photos />,
    },
    {
      path: "/videos",
      element: <Videos />,
    },
    {
      path: "/photo/:id",
      element: <Photo />,
    },
    {
      path: "/video/:id",
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
