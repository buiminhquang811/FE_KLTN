import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import './Product.scss'
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'antd';
import { Input, Table, Button, Tooltip} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getListProductRequest } from '../redux/action';

import moment from 'moment';

const { Search } = Input;

export default function Product() {

  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      width: 150,
    },
    {
      title: 'Mã sản phẩm',
      dataIndex: 'code',
      key: 'code',
      width: 150,
    },
    {
      title: 'Danh mục',
      dataIndex: 'categoryName',
      key: 'categoryName',
      width: 150,
    },
    {
      title: 'Nhà sản xuất',
      dataIndex: 'producerName',
      key: 'producerName',
      width: 150,
    },
    {
      title: 'Số lượng còn',
      dataIndex: 'amount',
      key: 'amount',
      width: 150,
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      width: 150,
    },
    {
      title: 'Giá sale',
      dataIndex: 'saleOffPrice',
      key: 'saleOffPrice',
      width: 150,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      width: 150,
    },
    {
      title: 'Người tạo',
      dataIndex: 'createdBy',
      key: 'createdBy',
      width: 150,
    },
    {
      title: 'Thời gian tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
    },
    {
      title: 'Người cập nhật',
      dataIndex: 'updatedBy',
      key: 'updatedBy',
      width: 150,
    },
    {
      title: 'Thời gian cập nhật',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 150,
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 150,
      render: (text, record) => {
        return (
          <>
            <Tooltip title="Sửa">
              <Button icon={<EditOutlined />}  type="default" style={{marginRight: '10px'}} onClick={() => onOpenEditProduct(text, record)}/>         
            </Tooltip>
            <Tooltip title="Xóa">
              <Button icon={<DeleteOutlined />} type="default" />   
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

  const [params, setParams] = useState({
    page: 1,
    size: 10,
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

  const onSearch = (value) => {
    const newParams = {
      ...params,
      term: value,
    };
    const obj = {
      page: newParams.page - 1,
      size: newParams.size,
      term: newParams.term
    }
    setParams(newParams);
    dispatch(getListProductRequest(obj));
  };

  const onAddNew = () => {
    history.push("/admin/product/create");
  }

  return (
    <>
      <Row>
        <Col span={16}>
          <Button icon={<PlusOutlined />} onClick = {onAddNew}>Thêm mới</Button>
        </Col>   
        <Col span={8}>
          <Search placeholder="Nhập để tìm kiếm" allowClear onSearch={onSearch} />
        </Col>        
      </Row>
      <br />
      <Row>
      <Col span={24}>
        <Table 
          bordered
          dataSource={listProduct} 
          columns={columns} 
          rowKey={record => record.id}
          loading={isLoading}
          size={'small'}
          scroll={{x: '100vw'}}
          pagination={{
            total: listProductReducer.totalRow, 
            showTotal: (total, range) => `Hiển thị ${range[0]} - ${range[1]} của ${total} bản ghi`,
            showSizeChanger: true
          }}
          />
        </Col>
      </Row>
    </>
  )
}