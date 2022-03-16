import React from 'react';
import { Row, Col, Form, Input, Button, Spin } from 'antd';
import "./Register.scss";
import { useDispatch, useSelector } from 'react-redux';
import {register} from './redux/action';

export default function Register() {

  const formRef = React.createRef();

  const dispatch = useDispatch();
  const isLoading = useSelector(store => store.RegisterReducer.isLoading);
  const userRegister = useSelector(store => store.RegisterReducer.userRegister);

  const onFinish = (values) => {
    dispatch(register(values))
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  React.useEffect(() => {
    formRef.current.resetFields();
  }, [userRegister])

  return (
    <Row className='form-register-container'> 
      <Col span={8} offset={8} className='form-register'>
        <Spin spinning={isLoading}>
            <div className='form-title'>Đăng ký</div>
            <Form
            name="basic"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
            ref={formRef}
          >
            <Form.Item
              label="Họ và tên"
              name="fullName"
              rules={[{ required: true, message: 'Họ và tên không được để trống' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Số điện thoại"
              name="phoneNumber"
              rules={[{ required: true, message: 'Số điện thoại không được để trống' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Email không được để trống' }]}
            >
              <Input />
            </Form.Item>

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

            <Form.Item wrapperCol={{ offset: 8, span: 6 }} style={{textAlign: "center"}}>
              <Button type="primary" htmlType="submit">
                Đăng ký
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Col>
    </Row>
  )
}
