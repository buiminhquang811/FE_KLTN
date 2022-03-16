import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './ProductDetail.scss';
import apiBase from "../../../common/baseAPI";
import { Row, Col, Form, Input, Button, Comment, Avatar, Tooltip } from 'antd';
import { Carousel } from 'antd';
import {MinusOutlined, PlusOutlined, UserOutlined} from '@ant-design/icons';
import moment from 'moment';

const { TextArea } = Input;

export default function ProductDetail() {
  const formRef = React.createRef();

  const [productDetail, setProductDetail] = useState(null);
  const [listImg, setListImg] = useState([]);
  const [valueInput, setValueInput] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [listComment, setListComment] = useState([]);
  const [commentRes, setCommentRes] = useState(null);
  const {id} = useParams();

  const onChangeInput = (e) => {
    let telephone = e.target.value;

    if (!Number(telephone)) {
        return;
    }
    setValueInput(telephone);
  }

  useEffect(() => {
    if(id) {
      // return new Promise((resolve, reject) => {
        apiBase
        .get(`products/${id}`)
        .then((res) => {
          if(res && res.data) {
            setProductDetail(res.data.product);
            const productsImg = [];
            if (res.data.product.thumbnailImg) {
              productsImg[0] = {};
              productsImg[0].original = res.data.product.thumbnailImg;
              productsImg[0].thumbnail = res.data.product.thumbnailImg
            };
            if (res.data.product.productImg1) {
              productsImg[1] = {};
              productsImg[1].original = res.data.product.productImg1;
              productsImg[1].thumbnail = res.data.product.productImg1;
            }
            if (res.data.product.productImg2) {
              productsImg[2] = {};
              productsImg[2].original = res.data.product.productImg2
              productsImg[2].thumbnail = res.data.product.productImg2;
            }
            if (res.data.product.productImg3) {
              productsImg[3] = {};
              productsImg[3].original = res.data.product.productImg3;
              productsImg[3].thumbnail = res.data.product.productImg3;
            }
            if (res.data.product.productImg4) {
              productsImg[4] = {};
              productsImg[4].original = res.data.product.productImg4;
              productsImg[4].thumbnail = res.data.product.productImg4;
            };
            setListImg(productsImg);
          }
        })
        .catch((err) => console.log(err));

        getComment();
      // })
    };
  }, []);

  const getComment = () => {
    if(id) {
      apiBase
      .get(`/comments/product/${id}`)
      .then((res) => {
        if(res && res.data.listComment) {
          setListComment(res.data.listComment);
        }
      })
      .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    if(commentRes) {
      getComment();
      setSubmitting(false);
      formRef.current.resetFields();
    }
  }, [commentRes])

  const onFinish = (values) => {
    setSubmitting(true);
    values.productId = id;
    apiBase
    .post(`/comments/create`, values)
    .then((res) => {
      console.log({res});
      if(res && res.data) {
        setCommentRes(res.data);
      }
    })
    .catch((err) => setSubmitting(false));
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  if(productDetail) {
    return (
      <>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={14}>
            <div className='product-header'>
              Hình ảnh sản phẩm
            </div>
            <Carousel>
              {listImg.map(e => 
              <div key={e.original} className='product-image-box'>
                <img src={e.original} className='product-image'>
                </img>
              </div>
                )}
            </Carousel>
          </Col>
          <Col span={10}>
            <div className='product-header'>
              {productDetail.name}
            </div>
            <div className='divide'></div>
            <div className='product-detail-line'>
              <span className='product-detail-label'>Mã sản phẩm: </span>
              <span>{productDetail.code}</span>
            </div>
            <div className='product-detail-line'>
              <span className='product-detail-label'>Đơn giá: </span>
              <span>{parseInt(productDetail.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>
            </div>
            {productDetail.saleOffPrice && 
            <div className='product-detail-line'>
              <span className='product-detail-label' style={{color: 'red'}}>Khuyến mãi: </span>
              <span>{parseInt(productDetail.saleOffPrice).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>
            </div>
              }
            <div className='product-detail-line'>
              <span className='product-detail-label'>Danh mục: </span>
              <span>{productDetail.categoryName}</span>
            </div>
            <div className='product-detail-line'>
              <span className='product-detail-label'>Nhà sản xuất: </span>
              <span>{productDetail.producerName ? productDetail.producerName : 'Chưa rõ'}</span>
            </div>
            <div className='product-detail-line'>
              <span className='product-detail-label'>Tình trạng: </span>
              <span>{productDetail.amount ? 'Còn hàng' : 'Cháy hàng'}</span>
            </div>
            <div className='product-detail-line'>
              <span className='product-detail-label'>Mô tả: </span>
              <span>{productDetail.description ? productDetail.description : ''}</span>
            </div>
            <div className='button-list'>
              <Button icon={<MinusOutlined /> }></Button>
              <Input style={{width: '50px'}} value={valueInput} onChange={(e) => onChangeInput(e)}></Input>
              <Button icon={<PlusOutlined />}></Button>
            </div>
          </Col>
          <Col span = {24}>
            <div className='product-header product-comment-list'>
              {listComment.length} Bình luận
            </div>
            {listComment.length ? listComment.map(e => 
             <Comment
              key={e.id+'comment'}
              author={<a>{e.name} - {e.email}</a>}
              avatar={<Avatar icon={<UserOutlined />} />}
              content={
                <p>
                 {e.message}
                </p>
              }
              datetime={
                <Tooltip title={moment(e.createdAt).format('DD-MM-YYYY HH:mm')}>
                  <span>{moment(e.createdAt).fromNow()}</span>
                </Tooltip>
              }
              >
 
             </Comment>
            ) : <span>Không có bình luận</span>}
          </Col>
          <Col span = {24}>
            <div className='product-header product-comment'>
              Để lại bình luận của bạn
            </div>
            <div className='product-detail-comment'>
              <Comment
                avatar={<Avatar icon={<UserOutlined />} />}
                content={
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
                      name="name"
                      rules={[{ required: true, message: 'Họ và tên không được để trống' }]}
                    >
                      <Input placeholder="Họ và tên"/>
                    </Form.Item>

                    <Form.Item 
                      name="email"
                      rules={[{ required: true, message: 'Email không được để trống' }]}
                    >
                      <Input placeholder="Email"/>
                    </Form.Item>

                    <Form.Item
                      name="message"
                      rules={[{ required: true, message: 'Bình luận không được để trống' }]}>
                      <TextArea rows={4} placeholder="Nhập bình luận"/>
                    </Form.Item>

                    <Form.Item>
                      <Button htmlType="submit" loading={submitting} type="primary">
                        Thêm bình luận
                      </Button>
                    </Form.Item>
                  </Form>
                }
              />
            </div>
          </Col>
        </Row>
      </>
    )
  }
  return <>Loading</>;
}
