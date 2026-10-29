import { Drawer } from 'antd';
import type { ReactNode } from 'react';

export type Styles = {
  wrapper?: string;
  mask?: string;
  header?: string;
  content?: string;
  body?: string;
};

type ReusableDrawerProps = {
  title?: ReactNode;
  open: boolean;
  onClose: () => void;
  placement: 'right' | 'left';
  styles?: Styles;
  children: ReactNode;
  width: number;
};

export const ReusableDrawer = ({
  title,
  open,
  onClose,
  placement,
  styles,
  children,
  width,
}: ReusableDrawerProps) => {
  return (
    <Drawer
      closable
      destroyOnClose
      title={title}
      width={width}
      placement={placement}
      open={open}
      onClose={onClose}
      classNames={styles}>
      {children}
    </Drawer>
  );
};
