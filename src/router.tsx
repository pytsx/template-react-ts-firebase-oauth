import { createBrowserRouter } from "react-router-dom";
import { ExemplePage, HomePage, LayoutPage } from "./Pages";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/exemple',
        element: <ExemplePage />
      }
    ]
  }
])