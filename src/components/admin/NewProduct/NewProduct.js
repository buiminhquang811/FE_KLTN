import React, {useEffect, useState} from 'react';
import { Input, Button, Upload, Form, Select, Spin, TreeSelect, Card } from 'antd';
import { getListCategoriesRequest, getListProducerRequest, getDetailProductRequest, clearDetailProduct } from '../redux/action';
import {useParams} from 'react-router-dom';
import './NewProduct.scss'
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {createProductRequest } from '../redux/action';
import apiBase from "../../../common/baseAPI";
import { openNotification } from '../../../common/notification';


export default function NewProduct() {
  const dispatch = useDispatch();
  const listCate = useSelector(store => store.AdminReducer.listCategories);
  const listProducerReducer = useSelector(store => store.AdminReducer.listProducer);
  const itemProductReducer = useSelector(store => store.AdminReducer.itemProduct);
  const isSuccessCreateProduct = useSelector(store => store.AdminReducer.isSuccessCreateProduct);
  const [listParentCate, setListParentCate] = useState([]);
  const [listProducer, setListProducer] = useState([]);
  const [valueForm, setValueForm] = useState({});
  const [form] = Form.useForm();
  let { id } = useParams();
  const formRef = React.createRef();
  
  useEffect(() => {
    if(id) {
      dispatch(getDetailProductRequest(id));
    } else {
      dispatch(clearDetailProduct());
    }
  }, []);

  useEffect(() => {
    if(isSuccessCreateProduct) {
      formRef.current.resetFields();
    }
  }, [isSuccessCreateProduct])

  const getNameImg = (img) => {
    const arr = img.split('_');
    let str = '';
    if (arr && arr.length > 0) {
      for (let i = 1; i < arr.length; i++) {
        if(i < arr.length - 1){
          str += arr[i] + '_';
        } else {
          str += arr[i];
        }
      }
    }
    return str;
  }

  useEffect(() => {
    if (itemProductReducer && itemProductReducer.product) {
      const initValue = {
        ...itemProductReducer.product
      }
      const productsImg = [];
      if (itemProductReducer.product.thumbnailImg) {
        productsImg[0] = {};
        productsImg[0].url = itemProductReducer.product.thumbnailImg;
        productsImg[0].name = getNameImg(itemProductReducer.product.thumbnailImg);
      };
      if (itemProductReducer.product.productImg1) {
        productsImg[1] = {};
        productsImg[1].url = itemProductReducer.product.productImg1;
        productsImg[1].name = getNameImg(itemProductReducer.product.productImg1);
      }
      if (itemProductReducer.product.productImg2) {
        productsImg[2] = {};
        productsImg[2].url = itemProductReducer.product.productImg2;
        productsImg[2].name = getNameImg(itemProductReducer.product.productImg2);
      }
      if (itemProductReducer.product.productImg3) {
        productsImg[3] = {};
        productsImg[3].url = itemProductReducer.product.productImg3
        productsImg[3].name = getNameImg(itemProductReducer.product.productImg3);
      }
      if (itemProductReducer.product.productImg4) {
        productsImg[4] = {};
        productsImg[4].url = itemProductReducer.product.productImg4;
        productsImg[4].name = getNameImg(itemProductReducer.product.productImg4);
      };
      initValue.productsImg = productsImg;
      form.setFieldsValue(initValue);
    } else {
      form.resetFields();
    }
  }, [itemProductReducer])

  useEffect(() => {
    const obj = {
      page: 0,
      size: 1000,
      term: ''
    }
    dispatch(getListCategoriesRequest(obj));
    dispatch(getListProducerRequest(obj));
  }, []);

  useEffect(() => {
    if(listCate.listCategory) {
      const parentList = listCate.listCategory.filter(e => !e.parentId).map(e1 => {
        return {
          ...e1,
          title: e1.name,
          value: e1.id,
          key: e1.id,
        }
      });
      const getChildren = (parentList) => {
        for(let i = 0; i <= parentList.length - 1; i++) {
          const listChild = listCate.listCategory.filter(e => e.parentId === parentList[i].id);
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
      setListParentCate(parentList);
    }
  }, [listCate]);

  useEffect(() => {
    if(listProducerReducer.listProducer) {
      const list = listProducerReducer.listProducer.map(e => {
        return {
          label: e.name,
          value: e.id,
        };
      });
      setListProducer(list);
    }
  }, [listProducerReducer]);


  const onFinish = (values) => {
    // values.categoryId = 3;
    if (!id) {
      const formData = new FormData();
      for (const name in values) {
        if (name !== 'productsImg') {
          formData.append(name, values[name] || "");
        }
      }
      for (let i = 0; i < values.productsImg.length; i++) {
        formData.append(`productsImg`, values.productsImg[i].originFileObj);
      };
      dispatch(createProductRequest(formData));
    } else {
      const formData = new FormData();
      for (const name in values) {
        if (name !== 'productsImg') {
          formData.append(name, values[name] || "");
        }
      }
      for (let i = 0; i < values.productsImg.length; i++) {
        if(values.productsImg[i].originFileObj) {
          formData.append(`productsImg`, values.productsImg[i].originFileObj);
        }
      };
      apiBase
      .put(`products/edit/${id}`, formData)
        .then((res) => {
          if(res) {
            openNotification('success', 'Th??ng b??o', 'C???p nh???t th??nh c??ng');
            dispatch(getDetailProductRequest(id));
          }
        })
        .catch(error => {console.log(error); openNotification('error', 'Th??ng b??o', 'C???p nh???t th???t b???i')})
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    };
    return e && e.fileList.filter(e => e.originFileObj);
  };


  return (
    <>
    <Card>
      <Row>
        <Col span={24}>
          <Form
          name="basic"
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="horizontal"
          colon={false}
          ref={formRef}
          >
             <Form.Item
              label="T??n s???n ph???m"
              name="name"
              rules={[{ required: true, message: 'T??n s???n ph???m kh??ng ???????c ????? tr???ng' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="M?? s???n ph???m"
                name="code"
                rules={[{ required: true, message: 'M?? s???n ph???m kh??ng ???????c ????? tr???ng' }]}
                >
                  <Input />
              </Form.Item>
              <Form.Item name="categoryId" label="Danh m???c"  rules={[{ required: true, message: 'Danh m???c kh??ng ???????c ????? tr???ng' }]}>
                {/* <Select
                  placeholder="L???a ch???n danh m???c"
                  // onChange={onGenderChange}
                  options={listParentCate}
                > */}
                <TreeSelect  
                   treeData={listParentCate}
                   placeholder="L???a ch???n danh m???c"
                   dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                   style={{ width: '100%' }}
                   treeDataSimpleMode
                />
                {/* </Select> */}
              </Form.Item>
              <Form.Item
                label="S??? l?????ng"
                name="amount"
                rules={[{ required: true, message: 'S??? l?????ng kh??ng ???????c ????? tr???ng' }]}
                >
                  <Input />
              </Form.Item>
              <Form.Item
                label="M?? t???"
                name="description"
                >
                  <Input />
              </Form.Item>
              <Form.Item
                label="Gi??"
                name="price"
                rules={[{ required: true, message: 'Gi?? kh??ng ???????c ????? tr???ng' }]}
                >
                  <Input />
              </Form.Item>
              <Form.Item
                label="Sale Off"
                name="saleOffPrice"
                >
                  <Input />
              </Form.Item>
              <Form.Item name="producerId" label="NSX" >
                <Select
                  placeholder="L???a ch???n NSX"
                  // onChange={onGenderChange}
                  options={listProducer}
                >
                </Select>
              </Form.Item>
              <Form.Item
                label="Ghi ch??"
                name="note"
                >
                  <Input />
              </Form.Item>
              <Form.Item
                label="???nh s???n ph???m"
                name="productsImg"
                valuePropName="fileList"
                rules={[{ required: true, message: '???nh s???n ph???m kh??ng ???????c ????? tr???ng' }]}
                getValueFromEvent={normFile}
                >
                 <Upload
                  listType="picture"
                  maxCount={5}
                  beforeUpload={() => false}
                  multiple
                  showUploadList={{
                    showRemoveIcon: id ? false : true,
                    }
                  }
                >
                  <Button icon={<UploadOutlined />}>Upload (Max: 5)</Button>
                </Upload>
              </Form.Item>
              <Form.Item wrapperCol={{  offset: 8, span: 6  }} style={{textAlign: "center"}}>
                <Button type="primary" htmlType="submit">
                  {id ? 'L??u' : 'Th??m m???i'}
                </Button>
              </Form.Item>
          </Form>
        </Col>
      </Row>
    </Card>
      
    </>
  )
}
