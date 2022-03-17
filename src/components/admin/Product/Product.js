import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import './Product.scss'
import { useDispatch, useSelector } from 'react-redux';
import { Col, Modal, Row, Select } from 'antd';
import { Input, Table, Button, Tooltip, Card } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { getListProducerRequest, getListProductRequest } from '../redux/action';
import apiBase from "../../../common/baseAPI";
import { openNotification } from '../../../common/notification';

import moment from 'moment';

const arrSort = [
  {value: 1, label: 'Số lượng hàng tồn tăng dần',}, 
  { value: 2, label: 'Số lượng hàng tồn giảm dần',}, 
  { value: 3, label: 'Giá tăng dần',}, 
  {value: 4, label: 'Giá giảm dần',}
]

const { Search } = Input;
const { Option } = Select;

const { confirm } = Modal;

export default function Product() {

  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      width: 160,
      fixed: 'left',
    },
    {
      title: 'Mã sản phẩm',
      dataIndex: 'code',
      key: 'code',
      width: 160,
    },
    {
      title: 'Danh mục',
      dataIndex: 'categoryName',
      key: 'categoryName',
      width: 160,
    },
    {
      title: 'Nhà sản xuất',
      dataIndex: 'producerName',
      key: 'producerName',
      width: 160,
    },
    {
      title: 'Số lượng còn',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right',
      width: 160,
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      width: 160,
      align: 'right',
      render: (text, record) => 
        <span>
          {parseInt(record.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
        </span>,
    },
    {
      title: 'Giá sale',
      dataIndex: 'saleOffPrice',
      key: 'saleOffPrice',
      width: 160,
      align: 'right',
      render: (text, record) => <span>{record.saleOffPrice ? parseInt(record.saleOffPrice).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : '-'}</span>,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      width: 220,
    },
    {
      title: 'Người tạo',
      dataIndex: 'createdBy',
      key: 'createdBy',
      width: 160,
    },
    {
      title: 'Thời gian tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 160,
    },
    {
      title: 'Người cập nhật',
      dataIndex: 'updatedBy',
      key: 'updatedBy',
      width: 160,
    },
    {
      title: 'Thời gian cập nhật',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 160,
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 100,
      fixed: 'right',
      render: (text, record) => {
        return (
          <>
            <Tooltip title="Sửa">
              <Button icon={<EditOutlined />}  type="primary" style={{marginRight: '10px'}} onClick={() => onOpenEditProduct(text, record)}/>         
            </Tooltip>
            <Tooltip title="Xóa">
              <Button icon={<DeleteOutlined />} type="default" danger onClick={() => showConfirm(record)}  />   
            </Tooltip>
          </>
         
        )
      }
    }
  ];

  const onOpenEditProduct = (text, record) => {
    const id = record.id;
    history.push(`/admin/product/edit/${id}`);
  }

  const [listProduct, setListProduct] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const listProductReducer = useSelector(store => store.AdminReducer.listProduct);
  const isLoading = useSelector(store => store.AdminReducer.isLoadingListProduct);
  const listProducerReducer = useSelector(store => store.AdminReducer.listProducer);
  // const [optionSearch, setOptionSearch] = useState({
  //   name: '',
  //   code: '',
  //   // producer: '',
  //   // orderBy: '',
  // })

  const [listProducer, setListProducer] = useState([]);

  const [params, setParams] = useState({
    page: 1,
    size: 10,
    name: '',
    code: '',
  });

  useEffect(() => {
    const obj = {
      page: params.page - 1,
      size: params.size,
    }
    dispatch(getListProductRequest(obj));
  }, []);

  function showConfirm(record) {
    confirm({
      title: `Bạn có chắc chắn muốn xóa sản phẩm ${record.name} không?`,
      icon: <ExclamationCircleOutlined />,
      okText: 'Đồng ý',
      okType: 'danger',
      cancelText: 'Hủy bỏ',
      onOk() {
        apiBase
        .delete(`products/${record.id}`)
        .then((res) => {
          if(res) {
            openNotification('success', 'Thông báo', 'Xóa sản phẩm thành công');
            const obj = {
              ...params,
              page: params.page - 1,
            }
            Object.keys(obj).forEach(key => {
              if(!(obj[key] === 0 || obj[key])) {
                delete obj[key];
              }
            })
            dispatch(getListProductRequest(obj));
          }
        })
        .catch(error => openNotification('error', 'Thông báo', 'Xóa sản phẩm thất bại'))
      },
      onCancel() {
        
      },
    });
  }

  useEffect(() => {
    if(listProductReducer.listProducts) {
      const list = listProductReducer.listProducts.map(e => {
        return {
          ...e,
          createdAt: moment(e.createdAt).format('DD-MM-YYYY HH:mm'),
          updatedAt: e.updatedAt ? moment(e.updatedAt).format('DD-MM-YYYY HH:mm') : '',
        };
      });
      setListProduct(list);
    }
  }, [listProductReducer]);

  useEffect(() => {
    const obj = {
      page: 0,
      size: 1000,
      term: ''
    }
    dispatch(getListProducerRequest(obj));
  }, []);

  const onSearch = () => {
    const obj = {
      ...params,
      page: params.page - 1,
    }
    Object.keys(obj).forEach(key => {
      if(!(obj[key] === 0 || obj[key])) {
        delete obj[key];
      }
    })
    dispatch(getListProductRequest(obj));
  };

  const onAddNew = () => {
    history.push("/admin/product/create");
  };

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

  const onResetField = () => {
    const obj = {
      page: 1,
      size: 10,
      name: '',
      code: '',
    }
   setParams(obj);
   const objSearch = {
    ...obj,
    page: obj.page - 1,
  }
    dispatch(getListProductRequest(objSearch));
  };

  const onChangeOptionSearch = (e, nameChange) => {
    const value = (nameChange === 'producer' || nameChange === 'orderBy') ? e : e.target.value;
    const name = nameChange;
    const newObj = {
      ...params,
      [name]: value,
    };
    setParams(newObj);
  }

  return (
    
    <>
      <Card>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={24} style={{marginBottom: '10px'}}>
            <span style={{fontSize: '16px', fontWeight: 'bold'}}>Tìm kiếm</span>
          </Col>
          <Col span={6}>
            <label style={{marginBottom: '10px'}}>
              Tên sản phẩm
            </label>
            <Input placeholder="Nhập tên sản phẩm" value={params.name} name="name" onChange={(e) => onChangeOptionSearch(e, 'name')}/>
          </Col>
          <Col span={6}>
            <label style={{marginBottom: '10px'}}>
              Mã sản phẩm
            </label>
            <Input placeholder="Nhập mã sản phẩm" value={params.code} name="code" onChange={(e) => onChangeOptionSearch(e, 'code')}/>
          </Col>
          <Col span={6}>
            <label style={{marginBottom: '10px'}}>
              Nhà sản xuất
            </label>
            <Select
              mode="single"
              allowClear
              style={{ width: '100%' }}
              placeholder="Lựa chọn nhà sản xuất"
              value={params.producer} name="producer" onChange={(e) => onChangeOptionSearch(e, 'producer')}
            >
              {listProducer.map(item => 
                <Option value={item.value} key={item.value}>
                  {item.label}
                </Option>
              )}
            </Select>
          </Col>
          <Col span={6}>
            <label style={{marginBottom: '10px'}}>
              Sắp xếp theo
            </label>
            <Select
              mode="single"
              allowClear
              style={{ width: '100%' }}
              placeholder="Sắp xếp theo"
              value={params.orderBy} name="orderBy" onChange={(e) => onChangeOptionSearch(e, 'orderBy')}
            >
              {arrSort.map(item => 
                <Option value={item.value} key={item.value+item.label}>
                  {item.label}
                </Option>
              )}
            </Select>
          </Col>
          <Col span={24} style={{marginTop: '10px'}}>
            <Button icon={<SearchOutlined />} onClick = {onSearch} style={{marginRight: '5px'}} type="primary">Tìm kiếm</Button>
            <Button onClick = {onResetField}>Nhập lại</Button>
          </Col>
        </Row>
      </Card>
      
      <br />
      <Card>
        <Row style={{marginBottom: '0.5rem'}}>
          <Col span={16}>
            {/* <Button icon={<PlusOutlined />} onClick = {onAddNew}>Thêm mới</Button> */}
            <span style={{fontSize: '18px', fontWeight: 'bold'}}> 
              Có tổng {listProductReducer ? listProductReducer.totalRow : 0} sản phẩm 
            </span>
          </Col>   
          <Col span={8} style={{display: 'flex', justifyContent: 'flex-end'}}>
            <Button icon={<PlusOutlined />} onClick = {onAddNew}>Thêm mới</Button>
            {/* <Search placeholder="Tìm kiếm theo tên sản phẩm" allowClear onSearch={onSearch} /> */}
          </Col>        
        </Row>
        <Row>
          <Col span={24}>
            <Table 
              bordered
              dataSource={listProduct} 
              columns={columns} 
              rowKey={record => record.id}
              loading={isLoading}
              size={'small'}
              scroll={{ x: 'max-content' }}
              pagination={{
                total: listProductReducer.totalRow, 
                showTotal: (total, range) => `Hiển thị ${range[0]} - ${range[1]} của ${total} sản phẩm`,
                showSizeChanger: true
              }}
              />
          </Col>
        </Row>
      </Card>
      
    </>
  )
}