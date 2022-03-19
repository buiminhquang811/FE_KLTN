import React, {useEffect, useState} from 'react';
import './Order.scss'
import { useDispatch, useSelector } from 'react-redux';
import { Card, Col, Row } from 'antd';
import { Input, Table, Button, Tooltip, Modal, Form, Spin, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import moment from 'moment';
import { getListOrderRequest, getDetailOrderRequest } from '../redux/action';
import apiBase from "../../../common/baseAPI";
import { openNotification } from '../../../common/notification';


const { Search } = Input;
const { Option } = Select;

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
      width: 160,
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
      width: 250,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 180,
    },
    {
      title: 'SĐT',
      dataIndex: 'mobile',
      key: 'mobile',
      width: 160,
    },
    {
      title: 'Trạng thái',
      key: 'status',
      width: 160,
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
      width: 250,
    },
    {
      title: 'Thời gian tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 160,
    },
    {
      title: 'Thời gian cập nhật',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 160,
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
      align: 'center',
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      key: 'price',
      align: 'right',
      render: (text, record) => {
        return(
         <span>{(record.price*1).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>
        )
      }
    },
    {
      title: 'Thành tiền',
      dataIndex: 'totalMoney',
      key: 'status',
      align: 'right',
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
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    const obj = {
      page: params.page - 1,
      size: params.size,
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

  const rejectOrder = () => {
    apiBase
    .put(`orders/reject/${detail.id}`)
    .then((res) => {
      if({res}) {
        setOpenModal(false);
        setDetail(null);
        const newParams = {
          ...params,
          page: params.page - 1,
        };
        openNotification('success', 'Thông báo', 'Hủy đơn hàng thành công');
        dispatch(getListOrderRequest(newParams));
      }
    })
    .catch((err) => openNotification('error', 'Thông báo', err.response.data.message));
  }

  const updateOrder = () => {
    apiBase
    .put(`orders/update/${detail.id}`)
    .then((res) => {
      if({res}) {
        setOpenModal(false);
        setDetail(null);
        const newParams = {
          ...params,
          page: params.page - 1,
        };
        openNotification('success', 'Thông báo', 'Xác nhận đơn hàng thành công');
        dispatch(getListOrderRequest(newParams));
      }
    })
    .catch((err) => openNotification('error', 'Thông báo', err.response.data.message));
  };

  const onChangeOptionSearch = (e, nameChange) => {
    const value = (nameChange === 'status') ? e : e.target.value;
    const name = nameChange;
    const newObj = {
      ...params,
      [name]: value,
    };
    setParams(newObj);
  };

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
    dispatch(getListOrderRequest(objSearch));
  };
  
  return (
    <>
      <Card>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={24} style={{marginBottom: '10px'}}>
            <span style={{fontSize: '16px', fontWeight: 'bold'}}>Tìm kiếm</span>
          </Col>
          <Col span={6}>
            <label style={{marginBottom: '10px'}}>
              Tên khách hàng
            </label>
            <Input placeholder="Nhập tên khách hàng" value={params.name} name="name" onChange={(e) => onChangeOptionSearch(e, 'name')}/>
          </Col>
          <Col span={6}>
            <label style={{marginBottom: '10px'}}>
              Email khách hàng
            </label>
            <Input placeholder="Nhập email khách hàng" value={params.email} name="code" onChange={(e) => onChangeOptionSearch(e, 'code')}/>
          </Col>
          <Col span={6}>
            <label style={{marginBottom: '10px'}}>
              Số điện thoai
            </label>
            <Input placeholder="Nhập SĐT khách hàng" value={params.phone} name="phone" onChange={(e) => onChangeOptionSearch(e, 'phone')}/>
          </Col>
          <Col span={6}>
            <label style={{marginBottom: '10px'}}>
              Trạng thái đơn hàng
            </label>
            <Select
              mode="single"
              allowClear
              style={{ width: '100%' }}
              placeholder="Trạng thái đơn hàng"
              value={params.status} name="status" onChange={(e) => onChangeOptionSearch(e, 'status')}
            >
              {listStatus.map(item => 
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
            Có tổng {listOrderReducer ? listOrderReducer.totalRow : 0} đơn hàng
          </span>
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
          scroll={{ x: 'max-content' }}
          loading={isLoading}
          size={'small'}
          pagination={{
            total: listOrderReducer.totalRow, 
            showTotal: (total, range) => `Hiển thị ${range[0]} - ${range[1]} của ${total} đơn hàng`,
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
           <Button type="primary" onClick={updateOrder} disabled={detail && (detail.status == 2 || detail.status == -1)}>
              Xác nhận đơn hàng
            </Button>
            <Button type="default" danger onClick={rejectOrder} disabled={detail && (detail.status == 2 || detail.status == -1)} style={{marginLeft: '5px'}}>
              Hủy đơn hàng
            </Button>
          </Col>
        </>
        
      </Modal>
    </Card>
    </>

  )
}
