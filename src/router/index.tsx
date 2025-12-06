
import App from "@/App";
import Counter from "@/components/Counter/Counter";
import Products from "@/components/Products/Products";
import Tasks from "@/components/tasks/Tasks";
import WishlistPage from "@/page/WishList/WishListPage";
import { createBrowserRouter } from "react-router-dom";


export const router = createBrowserRouter([
  {
    path: "/",
    Component:App,
    children:[
        {
            path:"/tasks",
            Component:Tasks

        },
       {
         path:"/counter",
        Component:Counter
       },
       {
        path:"/products",
        Component:Products
       },
       {
        path:"/wishlist",
        Component: WishlistPage
       }
    ]
  },
]);