import { notification } from 'antd';

export const openNotification = (type, message = 'Thông báo', description) => {
  if (type === 'success') {
    notification.success({
      message: message,
      description: description,
      placement: 'topRight',
    });
  }
  if (type === 'error') {
    notification.error({
      message: message,
      description: description,
      placement: 'topRight',
    });
  }
};