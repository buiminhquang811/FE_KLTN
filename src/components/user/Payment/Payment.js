import React, {useEffect, useState} from 'react';
import "./Payment.scss";
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Form, Input, Button } from 'antd';
import {createOrderRequest} from "../redux/action";

export default function Payment() {
  // const [listCarts, setListCarts] = useState([]);
  const dispatch = useDispatch();
  const Carts = useSelector(store => store.UserReducer.Carts);
  const formRef = React.createRef();
  const sumCart = () => {
    let a = 0;
    console.log(Carts);
    if(Carts && Carts.length) {
      Carts.forEach(e => {
        a += (e.price * e.quantity);
      });
    }
    
    return a.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
  };

  const onFinish = (values) => {
    // dispatch(register(values));
    let arr = [];
    arr = Carts.map(e => {
      return {
        productId: e.id,
        quantity: e.quantity,
        price: parseInt(e.price)
      }
    });
    values.products = arr;
    console.log(values);
    dispatch(createOrderRequest(values));
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  // React.useEffect(() => {
  //   formRef.current.resetFields();
  // }, [userRegister])


  return (
    <>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={12}>
          <div className='payment-header'>
            Địa chỉ giao hàng
          </div>
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
              label="Họ và tên"
              name="name"
              rules={[{ required: true, message: 'Họ và tên không được để trống' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Số điện thoại"
              name="mobile"
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
              label="Địa chỉ"
              name="address"
              rules={[{ required: true, message: 'Địa chỉ không được để trống' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 6 }} style={{textAlign: "center"}}>
              <Button type="primary" htmlType="submit">
                Đặt hàng
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={12}>
          <div className='payment-header'>
            Tóm tắt đơn hàng
          </div>
          <div className='payment-header-list-item'>
            Danh sách sản phẩm
          </div>
          {Carts && Carts.length && Carts.map(e => 
            <div className='list-item' key={e.id+'pm'}>
              <div style={{display: 'flex'}}>
                <img src={e.image} width='60' height='60'></img>
                <div>
                  <span className='item-name'>
                    {e.name}&nbsp;&nbsp;
                  </span>
                  <span className='item-quantity'>
                      x {e.quantity}		
                  </span>
                        
                </div>
              </div>
              
              <div className='item-total-price'>
                {(e.price * e.quantity).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
              </div>
            </div>)}
            <div className='payment-header-list-item1'>
              
              <span>
              Tổng cộng
              </span>
              <span>
                {sumCart()}
              </span>
            </div>
        </Col>
      </Row>
    </>
  )
}
