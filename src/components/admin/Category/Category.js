import React, {useEffect, useState} from 'react';
import './Category.scss'
import { useDispatch, useSelector } from 'react-redux';
import { getListCategoriesRequest, createCategoryRequest, updateCategoryRequest } from '../redux/action';
import { Col, Row } from 'antd';
import { Input, Table, Button, Tooltip, Modal, Form, Select, Spin } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import moment from 'moment';

const { Search } = Input;

const { confirm } = Modal;

export default function Category() {
  const [form] = Form.useForm();

  const columns = [
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      key: 'name',
      width: 160,
    },
    {
      title: 'Danh mục cha',
      dataIndex: 'parentName',
      key: 'parentName',
      width: 160,
    },
    {
      title: 'Chú thích',
      dataIndex: 'note',
      key: 'note',
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
      render: (text, record) => {
        return (
          <>
            <Tooltip title="Sửa">
              <Button icon={<EditOutlined />}  type="default" style={{marginRight: '10px'}} onClick={() => onOpenModalEdit(text, record)}/>         
            </Tooltip>
            <Tooltip title="Xóa">
              <Button icon={<DeleteOutlined />} type="default" onClick={() => showConfirm(record)}/>   
            </Tooltip>
          </>
         
        )
      },
      width: 100,
    }
  ]

  const [listCategories, setListCategories] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [listParentCate, setListParentCate] = useState([]);
  const [valueForm, setValueForm] = useState({});
  const [modalType, setModalType] = useState('');
  const dispatch = useDispatch();
  const formRef = React.createRef();
  const listCate = useSelector(store => store.AdminReducer.listCategories);
  const isLoading = useSelector(store => store.AdminReducer.isLoadingListCategories);
  const isSuccessCreateCategory = useSelector(store => store.AdminReducer.isSuccessCreateCategory);
  const isLoadingCreateCategory = useSelector(store => store.AdminReducer.isLoadingCreateCategory);
  const isSuccessUpdateCategory = useSelector(store => store.AdminReducer.isSuccessUpdateCategory);
  const isLoadingUpdateCategory = useSelector(store => store.AdminReducer.isLoadingUpdateCategory);

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
    dispatch(getListCategoriesRequest(obj));
  }, []);

  useEffect(() => {
    if(listCate.listCategory) {
      const list1 = listCate.listCategory.map(e => {
        return {
          label: e.name,
          value: e.id
        }
      })
      const list = listCate.listCategory.map(e => {
        if (e.parentId) {
          const index = listCate.listCategory.findIndex(f => f.id === e.parentId);
          if(index !== -1) {
            return {
              ...e,
              parentName: listCate.listCategory[index].name,
              createdAt: moment(e.createdAt).format('DD-MM-YYYY HH:mm'),
              updatedAt: e.updatedAt ? moment(e.updatedAt).format('DD-MM-YYYY HH:mm') : '',
            }
          };
          return {
            ...e,
            createdAt: moment(e.createdAt).format('DD-MM-YYYY HH:mm'),
            updatedAt: e.updatedAt ? moment(e.updatedAt).format('DD-MM-YYYY HH:mm') : '',
          };
        } else {
          return {
            ...e,
            createdAt: moment(e.createdAt).format('DD-MM-YYYY HH:mm'),
            updatedAt: e.updatedAt ? moment(e.updatedAt).format('DD-MM-YYYY HH:mm') : '',
          };
        }
      });
      setListCategories(list);
      setListParentCate(list1);
    }
  }, [listCate]);

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
    dispatch(getListCategoriesRequest(obj));
  };

  const onFinish = (values) => {
    if(modalType === 'CREATE') {
      dispatch(createCategoryRequest(values));
    };
    if(modalType === 'EDIT') {
      const obj = {...valueForm};
      obj.name = values.name;
      obj.note = values.note;
      obj.parentId = values.parentId;
      dispatch(updateCategoryRequest(obj));
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
      parentId: null,
      note: null,
    }
    setValueForm((prevState) => {
      return obj;
    });
    form.setFieldsValue(obj);
    setOpenModal(true);
  }

  useEffect(() => {
    if(isSuccessCreateCategory && formRef.current) {
      formRef.current.resetFields();
      setOpenModal(false);
        const obj = {
          page: params.page - 1,
          size: params.size,
          term: params.term
        }
        // openNotification('Thông báo', 'Thêm mới danh mục thành công');
        dispatch(getListCategoriesRequest(obj));
    }
    
  }, [isSuccessCreateCategory]);

  function showConfirm(record) {
    console.log({record});
    confirm({
      title: `Bạn có chắc chắn muốn xóa danh mục ${record.name} không?`,
      icon: <ExclamationCircleOutlined />,
      okText: 'Đồng ý',
      okType: 'danger',
      cancelText: 'Hủy bỏ',
      // content: 'Some descriptions',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  useEffect(() => {
    if(isSuccessUpdateCategory && formRef.current) {
      formRef.current.resetFields();
      setOpenModal(false);
        const obj = {
          page: params.page - 1,
          size: params.size,
          term: params.term
        };
        // openNotification('Thành công', 'Chỉnh sửa danh mục thành công');
        dispatch(getListCategoriesRequest(obj));   
    }
    
  }, [isSuccessUpdateCategory]);

  function onOpenModalEdit(text, record) {
    setModalType(() => {
      return 'EDIT'
    })
    const obj = {
      name: record.name,
      id: record.id,
      parentId: record.parentId,
      note: record.note,
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
          dataSource={listCategories} 
          columns={columns} 
          rowKey={record => record.id}
          loading={isLoading}
          size={'small'}
          pagination={{
            total: listCate.totalRow, 
            showTotal: (total, range) => `Hiển thị ${range[0]} - ${range[1]} của ${total} bản ghi`,
            showSizeChanger: true
          }}
          scroll={{ x: 'max-content' }}
          />
        </Col>
      </Row>
      <Modal
        title={modalType === 'EDIT' ? 'Sửa danh mục' : 'Thêm mới danh mục'}
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
        <Spin spinning={isLoadingCreateCategory}>
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
            label="Tên danh mục"
            name="name"
            rules={[{ required: true, message: 'Tên danh mục không được để trống' }]}
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

          <Form.Item name="parentId" label="Danh mục cha" rules={[{ required: false }]}>
            <Select
              placeholder="Lựa chọn danh mục cha"
              // onChange={onGenderChange}
              allowClear
              options={listParentCate}
            >
            </Select>
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
  )
}
