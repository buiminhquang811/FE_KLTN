import React from "react";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import { isAdminAuthenticated, getLoggedInUser } from "./helpers/authUtils";

const Login = React.lazy(() => import("./components/Login/Login"));
const Register = React.lazy(() => import("./components/Register/Register"));
const AdminPage = React.lazy(() => import("./components/admin/admin-manager/AdminPage"));
const Category = React.lazy(() => import("./components/admin/Category/Category"));
const Product = React.lazy(() => import("./components/admin/Product/Product"));
const Producer = React.lazy(() => import("./components/admin/Producer/Producer"));
const Order = React.lazy(() => import("./components/admin/Order/Order"));

const NewProduct = React.lazy(() => import("./components/admin/NewProduct/NewProduct"));
const Home = React.lazy(() => import("./components/user/Home/Home"));
const Payment = React.lazy(() => import("./components/user/Payment/Payment"));
const ProductDetail = React.lazy(() => import("./components/user/ProductDetail/ProductDetail"));

const PrivateRoute = ({ component: Component, roles, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isAuthTokenValid = getLoggedInUser();
      if (!isAuthTokenValid) {
        // not logged in so redirect to login page with the return url
        return (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        );
      }

      const loggedInUser = getLoggedInUser();
      // check if route is restricted by role
      if (roles && !roles.includes(loggedInUser.role)) {
          // role not authorised so redirect to home page
          return <Redirect to={{ pathname: "/" }} />;
      }
      // authorised so return component
      return <Component {...props} />;
    }}
  />
);

const routes = [
  { path: "/", name: "Home", component: Home, route: Route, exact: true },
  { path: "/payment", name: "Payment", component: Payment, route: Route, exact: true },
  { path: "/product/:id", name: "ProductDetail", component: ProductDetail, route: Route, exact: true},

  { path: "/login", name: "Login", component: Login, route: Route,  exact: true },
  { path: "/register", name: "Register", component: Register, route: Route,  exact: true },
  { path: "/admin", name: "AdminPage", component: AdminPage, route: PrivateRoute, roles: ["MANAGER"], exact: true},
  { path: "/admin/category", name: "AdminCategory", component: Category, route: PrivateRoute, roles: ["MANAGER"], exact: true},
  { path: "/admin/product", name: "AdminProduct", component: Product, route: PrivateRoute, roles: ["MANAGER"], exact: true},
  { path: "/admin/producer", name: "AdminProducer", component: Producer, route: PrivateRoute, roles: ["MANAGER"], exact: true},
  { path: "/admin/order", name: "AdminOrder", component: Order, route: PrivateRoute, roles: ["MANAGER"], exact: true},

  { path: "/admin/product/create", name: "AdminAddProduct", component: NewProduct, route: PrivateRoute, roles: ["MANAGER"], exact: true},
  { path: "/admin/product/edit/:id", name: "AdminProductEdit", component: NewProduct, route: PrivateRoute, roles: ["MANAGER"], exact: true},

]

export { routes, PrivateRoute };