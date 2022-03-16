import React, { Component, Suspense } from "react";
import { Layout, Menu, Dropdown, Badge, Row, Col, Button } from 'antd';
import { connect } from "react-redux";
import {Link, withRouter} from "react-router-dom";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  UnorderedListOutlined,
  AppstoreOutlined,
  DownOutlined
} from '@ant-design/icons';
import './AuthLayoutNonAdmin.scss';
import { getLoggedInUser } from "../../helpers/authUtils";
import Avatar from "antd/lib/avatar/avatar";
import { isAdminAuthenticated } from "../../../src/helpers/authUtils";
import { getListCategoriesRequest } from '../admin/redux/action';
import {deleteCart} from "../user/redux/action";
import { ShoppingCartOutlined, CloseCircleOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const loading = () => <div className="text-center"></div>;
const { Header, Sider, Content } = Layout;

class AuthLayoutNonAdmin extends Component {
  constructor(props) {
      super(props);
      this.state = {
        collapsed: false,
        selectedKeys: [],
        menuItem: [],
        numberCart: 0,
        cartItems: [],
      };
  };

  componentDidMount() {
    const obj = {
      page: 0,
      size: 1000,
      term: '',
    };
    this.props.getListCategoriesRequest(obj);
    if(this.props.numberCart) {
      this.setState({
        ...this.state,
        cartItems: this.props.Carts,
        numberCart: this.props.numberCart,
      })
    }
  };

  componentWillReceiveProps(nextProps) {
    if(nextProps.categoryItem !== this.props.categoryItem) {
      if(nextProps.categoryItem.listCategory) {
        const parentList = nextProps.categoryItem.listCategory.filter(e => !e.parentId).map(e1 => {
          return {
            ...e1,
            title: e1.name,
            value: e1.id,
            key: e1.id,
          }
        });
        const getChildren = (parentList) => {
          for(let i = 0; i <= parentList.length - 1; i++) {
            const listChild = nextProps.categoryItem.listCategory.filter(e => e.parentId === parentList[i].id);
            if(listChild && listChild.length) {
              const listChild1 = listChild.map(e1 => {
                return {
                  ...e1,
                  title: e1.name,
                  value: e1.id,
                  key: e1.id,
                }
              });
              parentList[i].title = parentList[i].name;
              parentList[i].value = parentList[i].id;
              parentList[i].key = parentList[i].id;
              parentList[i].children = listChild1;
              getChildren(listChild1);
            }
          }
        };
        getChildren(parentList);
        this.setState({
          ...this.state,
          menuItem: parentList,
        })
      }
    };
    
    if(nextProps.numberCart !== this.props.numberCart) {
      this.setState({
        ...this.state,
        cartItems: this.props.Carts,
        numberCart: nextProps.numberCart,
      })
    };
    if(nextProps.Carts !== this.props.Carts) {
      this.setState({
        cartItems: nextProps.Carts,
      })
    };
  }
  

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
  };

  onLogout = () => {
    localStorage.removeItem('authtoken');
    this.props.history.push("/login");
  }

  onDoNothing = (e) => {
    e.preventDefault();
  }

  onDeleteItem = (e, idx) => {
    this.props.deleteCart(idx);
  }

  render() {
      // get the child view which we would like to render
    const children = this.props.children || null;
    const user = getLoggedInUser();
    const {menuItem} = this.state;
    if(!isAdminAuthenticated() && (
      window.location.pathname.includes('login') || 
      window.location.pathname.includes('register'))) {
      return (
        <>
          <Suspense fallback={loading()}>{children}</Suspense>
        </>
      )
    }

    const itemCart = (
      <Menu className="item-cart">
        {this.state.cartItems.map((e, idx) => 
          <Menu.Item key={e.name+'CART'+idx} onClick={(e) => this.onDoNothing(e)}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className="information">
              <Col className="gutter-row" span={6}>
                <div className="cart-item-detail">
                  <img src={e.image} width='80' height='80'></img>
                </div>
              </Col>
              <Col className="gutter-row" span={18}>
                <div>
                  {e.name}
                </div>
                <div>
                  Giá sản phẩm: {parseInt(e.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                </div>
                <div>
                  Số lượng: {e.quantity}
                </div>
               
              </Col>
                <div className="close-button">
                  <CloseCircleOutlined className="close-icon" onClick={() => this.onDeleteItem(e, idx)}/>
                </div>
            </Row>
          </Menu.Item>
          )}
        <Menu.Item className="button-cart">
          <Button type="default" style={{marginRight: '10px'}}>
            Xem giỏ hàng
          </Button>
          <Button type="default" onClick={() => this.props.history.push("/payment")}>
            Thanh toán
          </Button>
        </Menu.Item>
      </Menu>
    )

    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed} style={{height: 'auto', minHeight: '100vh'}}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" selectedKeys={this.state.selectedKeys} onSelect={(data) => this.onSelect(data)}>
            {menuItem.map(e =>  
                <SubMenu key = {e.id} title={e.name} icon={<AppstoreOutlined />}>
                  {e.children && e.children.length && e.children.map(i => 
                  <Menu.Item key = {i.id} icon={<UnorderedListOutlined />}>
                    {i.name}
                  </Menu.Item>)} 
                </SubMenu>
            )}
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
                {user ? (
                   <div className="layout-header-user-info1">
                    <Dropdown overlay={itemCart} placement="bottomRight" trigger='click'>
                      <Badge count={this.state.numberCart} className="cart-badge">
                        <ShoppingCartOutlined style={{ fontSize: '32px' }}/>
                      </Badge>
                    </Dropdown>
                     
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
                ) : (
                  <div className="log-in" onClick={() => this.props.history.push("/login")}>Log in</div>
                )}
               
                <div></div>
              </div>

            </div>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
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
      categoryItem: state.AdminReducer.listCategories,
      Carts: state.UserReducer.Carts,
      numberCart: state.UserReducer.numberCart,
    };
};

const mapDispatchToProps = dispatch => {
  return {
    getListCategoriesRequest: (item) => {
      dispatch(getListCategoriesRequest(item));
    },
    deleteCart: (item) => {
      dispatch(deleteCart(item));
    }
  };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthLayoutNonAdmin));



