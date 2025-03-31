import { createBrowserRouter } from "react-router";
import { Root } from "@/router/Root";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <div>Welcome to the home page!</div>
      }
    ]
  }
])