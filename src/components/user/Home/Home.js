import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListProductRequest, addToCart } from '../redux/action';
import { Row, Col, Button } from 'antd';
import "./Home.scss";
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

export default function Home() {
  const [listProduct, setListProduct] = useState([]);
  const dispatch = useDispatch();
  const listProductReducer = useSelector(store => store.UserReducer.listProduct);
  const history = useHistory();

  const [params, setParams] = useState({
    page: 1,
    size: 20,
    term: "",
  });

  useEffect(() => {
    const obj = {
      page: params.page - 1,
      size: params.size,
      term: params.term
    }
    dispatch(getListProductRequest(obj));
  }, []);

  const onAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const onRedirect = (item) => {
    history.push((`/product/${item.id}`))
  }

  useEffect(() => {
    if(listProductReducer.listProducts) {
      setListProduct(listProductReducer.listProducts);
    }
  }, [listProductReducer]);
  return (
   
    <>
      <Row>
        <Col span={24}>Danh sách sản phẩm</Col>
      </Row>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {listProduct.map(e => 
          <Col className="gutter-row" span={6} key={e.id+'SP'}>
            <div className='product'>
              <div className='product-image' onClick={() => onRedirect(e)}>
                <img src={e.thumbnailImg}>
                </img>
              </div>
              <div className='product-info'>
                <span className='product-info-name' onClick={() => onRedirect(e)}>{e.name}</span>
                <span>{parseInt(e.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>
              </div>
              <div className='product-button'>
              <Button type="default" icon={<ShoppingCartOutlined />} onClick={() => onAddToCart(e)}>
                Thêm vào giỏ
              </Button>
              </div>
            </div>
          </Col>
        )}
      </Row>
    </>
  )
}
