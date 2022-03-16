import React, {useEffect, useState} from 'react';
import './Order.scss'
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'antd';
import { Input, Table, Button, Tooltip, Modal, Form, Spin } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import { getListOrderRequest, getDetailOrderRequest } from '../redux/action';
import apiBase from "../../../common/baseAPI";

const { Search } = Input;

export default function Order() {
  const [form] = Form.useForm()

  const listStatus = [
    {
      value: 1,
      label: 'Chưa xử lý'
    },
    {
      value: 2,
      label: 'Đã xác nhận'
    },
    {
      value: -1,
      label: 'Đã hủy'
    },
  ]

  const columns = [
    {
      title: 'Tên khách hàng',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        return(
         <a onClick={() => onOpenModal(record)}>{record.name}</a>
        )
      }
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'SĐT',
      dataIndex: 'mobile',
      key: 'mobile',
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (text, record) => {
        return(
         <span>{getStatus(text, record)}</span>
        )
      }
    },
    {
      title: 'Chú thích',
      dataIndex: 'note',
      key: 'note',
    },
    {
      title: 'Thời gian tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Thời gian cập nhật',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
    },
    // {
    //   title: 'Thao tác',
    //   key: 'action',
    //   render: (text, record) => {
    //     return (
    //       <>
    //         <Tooltip title="Sửa">
    //           <Button icon={<EditOutlined />}  type="default" style={{marginRight: '10px'}} onClick={() => onOpenModalEdit(text, record)}/>         
    //         </Tooltip>
    //         <Tooltip title="Xóa">
    //           <Button icon={<DeleteOutlined />} type="default" />   
    //         </Tooltip>
    //       </>
         
    //     )
    //   }
    // }
  ];

  const columnModal = [
    {
      title: 'Mã sản phẩm',
      dataIndex: 'productCode',
      key: 'productCode',
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Thành tiền',
      key: 'status',
      render: (text, record) => {
        return(
         <span>{(record.quantity*record.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>
        )
      }
    },
  ]

  const [listOrder, setLisOrder] = useState([]);
  const [listProductOrder, setListProductOrder] = useState([]);
  const dispatch = useDispatch();
  const formRef = React.createRef();
  const listOrderReducer = useSelector(store => store.AdminReducer.listOrder);
  const isLoading = useSelector(store => store.AdminReducer.isLoadingListOrder);
  const itemOrderReducer = useSelector(store => store.AdminReducer.itemOrder);
  const [openModal, setOpenModal] = useState(false);
  const [detail, setDetail] = useState(null);

  const [params, setParams] = useState({
    page: 1,
    size: 10,
    term: "",
  })

  useEffect(() => {
    const obj = {
      page: params.page - 1,
      size: params.size,
      term: params.term
    }
    dispatch(getListOrderRequest(obj));
  }, []);

  useEffect(() => {
    if(listOrderReducer.listOrder) {
      const list = listOrderReducer.listOrder.map(e => {
        return {
          ...e,
          createdAt: moment(e.createdAt).format('DD-MM-YYYY HH:mm'),
          updatedAt: e.updatedAt ? moment(e.updatedAt).format('DD-MM-YYYY HH:mm') : '',
        };
      });
      setLisOrder(list);
    }
  }, [listOrderReducer]);

  useEffect(() => {
    if(itemOrderReducer && itemOrderReducer.product) {
      setListProductOrder(itemOrderReducer.product);
    }
  }, [itemOrderReducer])

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
    dispatch(getListOrderRequest(obj));
  };

  const getStatus = (text, record) => {
    const index = listStatus.findIndex(e => e.value == text.status);
    return listStatus[index].label;
  };

  const onOpenModal = (record) => {
    setOpenModal(true);
    dispatch(getDetailOrderRequest(record.id));
    setDetail(record);
  };

  const updateOrder = () => {
    return new Promise((resolve, reject) => {
      return apiBase
      .put(`orders/update/${detail.id}`)
      .then((res) => {
        if({res}) {
          setOpenModal(false);
          setDetail(null);
          const newParams = {
            ...params,
          };
          const obj = {
            page: newParams.page - 1,
            size: newParams.size,
            term: newParams.term
          }
          setParams(newParams);
          dispatch(getListOrderRequest(obj));
        }
      })
      .catch((err) => reject(err));
    })
  }
  

  return (
    <>  
       <Row>
        <Col span={8}>
          <Search placeholder="Nhập để tìm kiếm" allowClear onSearch={onSearch} />
        </Col>        
      </Row>
      <br />
      <Row>
      <Col span={24}>
        <Table 
          bordered
          dataSource={listOrder} 
          columns={columns} 
          rowKey={record => record.id}
          loading={isLoading}
          size={'small'}
          pagination={{
            total: listOrderReducer.totalRow, 
            showTotal: (total, range) => `Hiển thị ${range[0]} - ${range[1]} của ${total} bản ghi`,
            showSizeChanger: true
          }}
          />
        </Col>
      </Row>
      <Modal
        title={'Chi tiết đơn hàng'}
        centered
        visible={openModal}
        // onOk={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
        width={1000}
        // okText={modalType === 'EDIT' ? 'Lưu' : 'Thêm mới'}
        cancelText="Hủy"
        footer={null}
        closable={true}
      >
        <>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12}>
              <span className='detail-order-label'>
                Tên khách hàng:
              </span>
              <span>
                {detail && detail.name}
              </span>
               
            </Col>
            <Col span={12}>
              <span className='detail-order-label'>
                Địa chỉ:
              </span>
              <span>
                {detail && detail.address}
              </span>
            </Col>
            <Col span={12}>
              <span className='detail-order-label'>
                Email:
              </span>
              <span>
              {detail && detail.email}
              </span>
            </Col>
            <Col span={12}>
              <span className='detail-order-label'>
                SĐT:
              </span>
              <span>
                {detail && detail.mobile}
              </span>
            </Col>
          </Row>
          <Col span={24} style={{marginTop: '30px'}}>
            <Table 
            bordered
            dataSource={listProductOrder} 
            columns={columnModal} 
            rowKey={record => record.id}
            size={'small'}
            pagination={false}
            />
          </Col>
          <Col span={24} style={{marginTop: '30px', display: 'flex', justifyContent: 'center'}}>
           <Button type="primary" onClick={() => updateOrder()} disabled={detail && detail.status == 2}>
              Xác nhận đơn hàng
            </Button>
          </Col>
        </>
        
      </Modal>
    </>
  )
}
