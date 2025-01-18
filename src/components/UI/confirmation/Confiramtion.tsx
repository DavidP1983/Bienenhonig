import { Button, Result } from 'antd';
import { useRouter } from 'next/navigation';


export const Confiramtion = ({ confirmNumber }: { confirmNumber: string | undefined }) => {
    const router = useRouter();
    return (
        <Result
            status="success"
            title={<div><span style={{ fontSize: "18px" }}>Your Email was sent Successfully</span> <br /> Thank you for your purchase</div>}
            subTitle={`Order number: ${confirmNumber}`}
            extra={[
                <Button type="primary" key="again" onClick={() => router.push('/products')}>
                    Buy Again
                </Button>,
                <Button key="main" onClick={() => router.push('/')}>Back to main page</Button>,
            ]}
        />
    );
}