import { Button as AntButton } from 'antd';
import { ComponentProps } from 'react';

type Props = ComponentProps<typeof AntButton>;

export const Button = (props: Props) => {
  return <AntButton {...props} />;
};
