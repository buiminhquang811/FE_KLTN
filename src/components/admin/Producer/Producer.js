import React, {useEffect, useState} from 'react';
import './Producer.scss'
import { useDispatch, useSelector } from 'react-redux';
import { getListProducerRequest, createProducerRequest, updateProducerRequest } from '../redux/action';
import { Col, Row } from 'antd';
import { Input, Table, Button, Tooltip, Modal, Form, Spin } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

import moment from 'moment';

const { Search } = Input;

export default function Producer() {

  const [form] = Form.useForm()

  const columns = [
    {
      title: 'Tên NSX',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Chú thích',
      dataIndex: 'note',
      key: 'note',
    },
    {
      title: 'Đường dẫn',
      dataIndex: 'link',
      key: 'link',
    },
    {
      title: 'Người tạo',
      dataIndex: 'createdBy',
      key: 'createdBy',
    },
    {
      title: 'Thời gian tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Người cập nhật',
      dataIndex: 'updatedBy',
      key: 'updatedBy',
    },
    {
      title: 'Thời gian cập nhật',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (text, record) => {
        return (
          <>
            <Tooltip title="Sửa">
              <Button icon={<EditOutlined />}  type="default" style={{marginRight: '10px'}} onClick={() => onOpenModalEdit(text, record)}/>         
            </Tooltip>
            <Tooltip title="Xóa">
              <Button icon={<DeleteOutlined />} type="default" />   
            </Tooltip>
          </>
         
        )
      }
    }
  ];

  const [listProducer, setListProducer] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [valueForm, setValueForm] = useState({});
  const [modalType, setModalType] = useState('');
  const dispatch = useDispatch();
  const formRef = React.createRef();
  const listProducerReducer = useSelector(store => store.AdminReducer.listProducer);
  const isLoading = useSelector(store => store.AdminReducer.isLoadingListProducer);
  const isSuccessCreateProducer = useSelector(store => store.AdminReducer.isSuccessCreateProducer);
  const isLoadingCreateProducer = useSelector(store => store.AdminReducer.isLoadingCreateProducer);
  const isSuccessUpdateProducer = useSelector(store => store.AdminReducer.isSuccessUpdateProducer);
  const isLoadingUpdateProducer = useSelector(store => store.AdminReducer.isLoadingUpdateProducer);

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
    dispatch(getListProducerRequest(obj));
  }, []);

  useEffect(() => {
    if(listProducerReducer.listProducer) {
      const list = listProducerReducer.listProducer.map(e => {
        return {
          ...e,
          createdAt: moment(e.createdAt).format('DD-MM-YYYY HH:mm'),
          updatedAt: e.updatedAt ? moment(e.updatedAt).format('DD-MM-YYYY HH:mm') : '',
        };
      });
      setListProducer(list);
    }
  }, [listProducerReducer]);

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
    dispatch(getListProducerRequest(obj));
  };

  const onFinish = (values) => {
    if(modalType === 'CREATE') {
      dispatch(createProducerRequest(values));
    };
    if(modalType === 'EDIT') {
      const obj = {...valueForm};
      obj.name = values.name;
      obj.note = values.note;
      obj.link = values.link;
      obj.address = values.address;
      dispatch(updateProducerRequest(obj));
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const openAddNewCate = () => {
    setModalType('CREATE')
    const obj = {
      name: null,
      id: null,
      note: null,
      address: null,
      link: null,
    }
    setValueForm((prevState) => {
      return obj;
    });
    form.setFieldsValue(obj);
    setOpenModal(true);
  }

  useEffect(() => {
    if(isSuccessCreateProducer && formRef.current) {
      formRef.current.resetFields();
      setOpenModal(false);
        const obj = {
          page: params.page - 1,
          size: params.size,
          term: params.term
        }
        dispatch(getListProducerRequest(obj));
    }
    
  }, [isSuccessCreateProducer]);

  useEffect(() => {
    if(isSuccessUpdateProducer && formRef.current) {
      formRef.current.resetFields();
      setOpenModal(false);
        const obj = {
          page: params.page - 1,
          size: params.size,
          term: params.term
        }
        dispatch(getListProducerRequest(obj));
    }
    
  }, [isSuccessUpdateProducer]);

  function onOpenModalEdit(text, record) {
    setModalType(() => {
      return 'EDIT'
    })
    const obj = {
      name: record.name,
      id: record.id,
      note: record.note,
      link: record.link,
      address: record.address,
    }
    setValueForm((prevState) => {
      return obj;
    });
    form.setFieldsValue(obj);
    setOpenModal(true);
  };

  return (
    <>  
       <Row>
        <Col span={16}>
          <Button icon={<PlusOutlined />} onClick={() => openAddNewCate()}>Thêm mới</Button>
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
          dataSource={listProducer} 
          columns={columns} 
          rowKey={record => record.id}
          loading={isLoading}
          size={'small'}
          pagination={{
            total: listProducerReducer.totalRow, 
            showTotal: (total, range) => `Hiển thị ${range[0]} - ${range[1]} của ${total} bản ghi`,
            showSizeChanger: true
          }}
          />
        </Col>
      </Row>
      <Modal
        title={modalType === 'EDIT' ? 'Sửa NSX' : 'Thêm mới NSX'}
        centered
        visible={openModal}
        // onOk={() => setOpenModal(false)}
        // onCancel={() => setOpenModal(false)}
        width={1000}
        okText={modalType === 'EDIT' ? 'Lưu' : 'Thêm mới'}
        cancelText="Hủy"
        footer={null}
        closable={false}
      >
        <Spin spinning={isLoadingCreateProducer}>
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="horizontal"
          ref={formRef}
          colon={false}
          initialValues={valueForm}
        >
          <Form.Item
            label="Tên NSX"
            name="name"
            rules={[{ required: true, message: 'Tên NSX không được để trống' }]}
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

          <Form.Item
            label="Website"
            name="link"
            rules={[{ required: true, message: 'Website không được để trống' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Chú thích"
            name="note"
            rules={[{ required: false }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{  offset: 8, span: 6  }} style={{textAlign: "right"}}>
            <Button type="default" htmlType="button" style={{marginRight: '10px'}} onClick={() => setOpenModal(false)}>
              Hủy
            </Button>
            <Button type="primary" htmlType="submit">
              {modalType === 'EDIT' ? 'Lưu' : 'Thêm mới'}
            </Button>
          </Form.Item>

        </Form>
        </Spin>
      </Modal>
    </>
  );
}
