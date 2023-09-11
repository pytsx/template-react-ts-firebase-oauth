import { createBrowserRouter } from "react-router-dom";
import { HomePage, LayoutPage } from "./Pages";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      }
    ]
  }
])