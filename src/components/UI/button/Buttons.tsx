import { Button } from 'antd';

interface IStyles {
    [key: string]: string | number;
}

type BaseButtonProps = "link" | "text" | "primary" | "default" | "dashed" | undefined;

interface IProps {
    type: BaseButtonProps;
    style?: IStyles;
    disabled?: boolean;
    onClick?: () => void;
}

interface Props {
    props: IProps,
    children: string;
}

export const Buttons = ({ props, children }: Props) => {
    return (
        <Button {...props}>{children}</Button>
    );
}