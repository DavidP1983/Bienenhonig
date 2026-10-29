import { Button as AntButton } from 'antd';
import type { Props } from './types';

export const Button = ({ props, icon, children, className }: Props) => {
  return (
    <AntButton
      {...props}
      icon={icon}
      className={className ?? ''}>
      {children}
    </AntButton>
  );
};
