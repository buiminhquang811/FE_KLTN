import React, { Component, Suspense } from "react";
import { BrowserRouter} from "react-router-dom";
import { connect } from "react-redux";
import Loadable from "react-loadable";

import { routes } from "./routes";

import { isAdminAuthenticated } from "./helpers/authUtils";

const loading = () => <div></div>;

const AuthLayoutAdmin = Loadable({
  loader: () => import("./components/admin/AuthLayoutAdmin"),
  render(loaded, props) {
      let Component = loaded.default;
      return <Component {...props} />;
  },
  loading,
});


const AuthLayoutNonAdmin = Loadable({
  loader: () => import("./components/admin/AuthLayoutNonAdmin"),
  render(loaded, props) {
      let Component = loaded.default;
      return <Component {...props} />;
  },
  loading,
});

const withLayout = (WrappedComponent) => {
  const HOC = class extends Component {
    render() {
        return <WrappedComponent {...this.props} />;
    }
  };
  return connect()(HOC);
};

const App = () => {
  const getLayout = () => {
    return isAdminAuthenticated() === true ? AuthLayoutAdmin : AuthLayoutNonAdmin;
};
  const renderRouteHasChilds = (route) => {
    return !route.childs ? (
      <route.route
        key={route.name}
        path={route.path}
        exact={route.exact}
        roles={route.roles}
        component={withLayout((props) => {
          const Layout = getLayout();
          return (
            <Suspense key={route.name} fallback={loading()}>
              <Layout {...props} title={route.title}>
                <route.component {...props} />
              </Layout>
            </Suspense>
          );
        })}
      />
    ) : (
        <>{route.childs.map((i) => renderRouteHasChilds(i))}</>
    );
  };

  return (
    // rendering the router with layout
    <BrowserRouter>
      <React.Fragment>
          {routes.map((route) => renderRouteHasChilds(route))}
      </React.Fragment>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {

  };
};

export default connect(mapStateToProps, null)(App);
