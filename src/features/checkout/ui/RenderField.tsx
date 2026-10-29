import { Form, Input } from 'antd';
import { CheckoutFieldConfig } from '../config/checkoutForm.config';

export const RenderField = ({ field }: { field: CheckoutFieldConfig }) => (
  <Form.Item
    label={field.label}
    name={field.name}
    data-label="label"
    rules={field.rules}>
    <Input
      placeholder={field.placeholder}
      autoComplete={field.autoComplete}
      inputMode={field.inputMode}
      data-id="input"
    />
  </Form.Item>
);
