import React, { Component, Suspense } from "react";
import { Dropdown, Layout, Menu } from 'antd';
import { connect } from "react-redux";
import {Link, withRouter} from "react-router-dom";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  UnorderedListOutlined,
  DownOutlined,
  InboxOutlined,
  SolutionOutlined,
  StarOutlined
} from '@ant-design/icons';
import './AuthLayoutAdmin.scss';
import { getLoggedInUser } from "../../helpers/authUtils";
import Avatar from "antd/lib/avatar/avatar";
import Logo from "../logo.jpg";

const loading = () => <div className="text-center"></div>;
const { Header, Sider, Content } = Layout;

class AuthLayoutAdmin extends Component {
  constructor(props) {
      super(props);
      this.state = {
        collapsed: false,
        selectedKeys: [],
      };
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  onSelect = (data) => {
    this.setState({
      selectedKeys: data.selectedKeys,
    })
  }

  signOut(e) {
      e.preventDefault();
      this.props.history.push("/login");
  }

  onLogout = () => {
    localStorage.removeItem('authtoken');
    this.props.history.push("/login");
  }

  render() {
      // get the child view which we would like to render
    const children = this.props.children || null;
    const user = getLoggedInUser();
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed} style={{height: 'auto', minHeight: '100vh'}}>
          <div className="logo" > 
            <img src={Logo} className="img-logo"/>
            {!this.state.collapsed && <span className="shop-name">Quang Shop</span>}
          </div>
          <Menu theme="dark" mode="inline" selectedKeys={this.state.selectedKeys} onSelect={(data) => this.onSelect(data)}>
            
              <Menu.Item key="Category" icon={<InboxOutlined />}>
                <Link to="/admin/category">Category</Link>
              </Menu.Item>
              <Menu.Item key="Producer" icon={<SolutionOutlined />}>
                <Link to="/admin/producer">Producer</Link>
              </Menu.Item>
              <Menu.Item key="Product" icon={<UnorderedListOutlined />}>
                <Link to="/admin/product">Product</Link>
              </Menu.Item>
              
              <Menu.Item key="Order" icon={<StarOutlined />}>
                <Link to="/admin/order">Order</Link>
              </Menu.Item>
            
          
            {/* <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              nav 2
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              nav 3
            </Menu.Item> */}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background-header" style={{ padding: 0 }}>
            <div className="layout-header-admin">
              <span>
                {this.state.collapsed ?  
                <MenuUnfoldOutlined className="trigger" onClick={this.toggle}/> : 
                <MenuFoldOutlined className="trigger" onClick={this.toggle}/>}
              </span>
              <div className="layout-header-user-info">
                <div>
                  <Avatar icon={<UserOutlined />} style={{ marginRight: '5px' }}/>
                  <Dropdown overlay={<Menu>
                                        <Menu.Item>
                                          <a onClick={this.onLogout}>
                                          Log out
                                          </a>
                                        </Menu.Item>
                                      </Menu>} trigger='click'>
                      <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                      {user.userName} <DownOutlined />
                      </a>
                    </Dropdown>
                </div>
                <div></div>
              </div>
            </div>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 0,
              minHeight: 280,
            }}
          >
            <Suspense fallback={loading()}>{children}</Suspense>
          </Content>
        </Layout>

      </Layout>

      // <div className="app">
      //   header
      //   <header id="topnav">
      //     <Suspense fallback={loading()}>
      //       this is top bar admin
      //     </Suspense>
      //   </header>

      //   <div className="wrapper">
      //     <Suspense fallback={loading()}>{children}</Suspense>
      //   </div>

      // </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        
    };
};
export default withRouter(connect(mapStateToProps, null)(AuthLayoutAdmin));
