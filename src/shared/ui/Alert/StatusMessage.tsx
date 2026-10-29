import { Alert } from 'antd';

type StatusMessageProps = {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  description?: string;
};

export const StatusMessage = ({
  message,
  type,
  description,
}: StatusMessageProps) => (
  <Alert
    type={type}
    showIcon
    message={message}
    description={description}
    style={{ marginBottom: '30px' }}
  />
);
