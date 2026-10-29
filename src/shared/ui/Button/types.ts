import type { ReactNode } from 'react';

interface IStyles {
  [key: string]: string | number;
}

type BaseButtonProps =
  'link' | 'text' | 'primary' | 'default' | 'dashed' | undefined;

interface IProps {
  type: BaseButtonProps;
  style?: IStyles;
  disabled?: boolean;
  onClick?: () => void;
}

export interface Props {
  props: IProps;
  children: string;
  icon?: ReactNode;
  className?: string;
}
