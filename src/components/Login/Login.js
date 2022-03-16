import React from 'react';
import { Row, Col, Form, Input, Button, Spin } from 'antd';
import "./Login.scss";
import { useDispatch, useSelector } from 'react-redux';
import {login} from './redux/action';
import { Redirect } from "react-router-dom";
import {isAdminAuthenticated} from "../../helpers/authUtils";
import { useHistory } from 'react-router-dom';

export default function Login() {

  const formRef = React.createRef();
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector(store => store.LoginReducer.isLoading);
  const userLogin = useSelector(store => store.LoginReducer.userLogin);

    const onFinish = (values) => {
      dispatch(login(values))
    };
  
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

    React.useEffect(() => {
      formRef.current.resetFields();
      const isAdmin = isAdminAuthenticated();
      if (isAdmin) {
        history.push(`/admin`);
    }
      console.log(isAdmin);
    }, [userLogin]);

    const renderRedirectToRoot = () => {
     
      
  };

  return (
    <Row className='form-login-container'>
      {/* {renderRedirectToRoot()} */}
      <Col span={8} offset={8} className='form-login'>
      <Spin spinning={isLoading}>
      <div className='form-title'>Đăng nhập</div>
        <Form
        name="basic"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
        ref={formRef}
      >
       <Form.Item
          label="Tài khoản"
          name="userName"
          rules={[{ required: true, message: 'Tài khoản không được để trống' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: '"Mật khẩu không được để trống' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{  offset: 8, span: 6  }} style={{textAlign: "center"}}>
          <Button type="primary" htmlType="submit">
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
      </Spin>
      </Col>
    </Row>
  )
}
