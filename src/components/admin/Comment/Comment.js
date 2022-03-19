import React, {useEffect, useState} from 'react';
import './Comment.scss'
import { Card, Col, Row } from 'antd';
import { Input, Table, Button, Tooltip, Select } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined, SearchOutlined } from '@ant-design/icons';
import apiBase from "../../../common/baseAPI";
import { openNotification } from '../../../common/notification';
import { ParseSimpleEndpoint } from '../../../helpers/ParseEndpoint';

const listStatusComment = [
  {
    value: 1,
    label: 'Hiển thị'
  },
  {
    value: -1,
    label: 'Ẩn'
  },
]

const { Search } = Input;
const { Option } = Select;

export default function Comment() {

  const columns = [
    {
      title: 'Tên khách hàng',
      dataIndex: 'name',
      key: 'name',
      width: 160,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 180,
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'productName',
      key: 'productName',
      width: 250,
      render: (text, record) => {
        return(
         <span>{record.productCode} - {record.productName}</span>
        )
      }
    },
    {
      title: 'Nội dung',
      dataIndex: 'message',
      key: 'message',
      width: 350,
    },
    {
      title: 'Trạng thái',
      key: 'status',
      width: 120,
      render: (text, record) => {
        return(
         <span>{getStatus(text, record)}</span>
        )
      }
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 100,
      align: 'center',
      render: (text, record) => {
        return (
          <>
            <Tooltip title={record.status === 1 ? 'Ẩn bình luận' : 'Hiển thị bình luận'}>
              <Button icon={record.status === 1 ? <EyeInvisibleOutlined /> : <EyeOutlined />}  type="default" onClick={() => onShowComment(text, record)}/>         
            </Tooltip>
          </>
         
        )
      }
    }
  ];

  const [listComment, setListComment] = useState([]);
  const [params, setParams] = useState({
    page: 1,
    size: 10,
    name: '',
    email: '',
    productCode: '',
  });
  const [totalRow, setTotalRow] = useState(0);

  useEffect(() => {
    getListComment();
  }, []);

  const onShowComment = (text, record) => {
    if(record.status === 1) {
      apiBase
      .put(`comments/hide/${record.id}`)
      .then((res) => {
        if(res) {
          openNotification('success', 'Thông báo', 'Ẩn bình luận thành công');
          getListComment();
        }
      })
      .catch((err) => openNotification('error', 'Thông báo', err.response.data.message));
    } else {
      apiBase
      .put(`comments/show/${record.id}`)
      .then((res) => {
        if(res) {
          openNotification('success', 'Thông báo', 'Hiển thị bình luận thành công');
          getListComment();
        }
      })
      .catch((err) => openNotification('error', 'Thông báo', err.response.data.message));
    }
  }

  const getStatus = (text, record) => {
    const index = listStatusComment.findIndex(e => e.value == text.status);
    return listStatusComment[index].label;
  };

  const getListComment = (obj) => {
    let newParams = {
      ...params,
      page: params.page - 1,
    };
    if(obj) {
      newParams = {...obj};
    }
    apiBase
    .get(`comments/all-comments?${ParseSimpleEndpoint(newParams)}`)
    .then((res) => {
      if(res) {
        setTotalRow(res.data.totalRow);
        setListComment(res.data.listComment);
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
      productCode: ''
    }
   setParams(() => {
     return obj;
   });
   getListComment();
  };

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
    getListComment(obj);
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
              Mã sản phẩm
            </label>
            <Input placeholder="Nhập mã sản phẩm" value={params.productCode} name="productCode" onChange={(e) => onChangeOptionSearch(e, 'productCode')}/>
          </Col>
          <Col span={6}>
            <label style={{marginBottom: '10px'}}>
              Trạng thái bình luận
            </label>
            <Select
              mode="single"
              allowClear
              style={{ width: '100%' }}
              placeholder="Trạng thái đơn hàng"
              value={params.status} name="status" onChange={(e) => onChangeOptionSearch(e, 'status')}
            >
              {listStatusComment.map(item => 
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
            Có tổng {totalRow ? totalRow : 0} bình luận
          </span>
        </Col>      
      </Row>
      <br />
        <Row>
          <Col span={24}>
            <Table 
              bordered
              dataSource={listComment} 
              columns={columns} 
              rowKey={record => record.id}
              scroll={{ x: 'max-content' }}
              size={'small'}
              pagination={{
                total: totalRow, 
                showTotal: (total, range) => `Hiển thị ${range[0]} - ${range[1]} của ${total} bình luận`,
                showSizeChanger: true
              }}
              />
          </Col>
        </Row>
      </Card>
    </>
  )
}
