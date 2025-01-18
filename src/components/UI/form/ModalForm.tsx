'use client';
import {
    Button,
    Form,
    notification
} from 'antd';
import { ModalFormStructure } from './ModalFormStructure';
import React, { useTransition } from 'react';
import { useReviews } from '@/store';
import { createReview } from '@/lib/_actions';
import { revalidateProductPage } from '@/lib/revalidate';

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};


interface CloseModal {
    close: (timer: NodeJS.Timeout | null) => void;
}


export const ModalForm = ({ close }: CloseModal) => {
    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();
    const [isPending, startTransition] = useTransition();
    const variant = Form.useWatch('variant', form);
    const { _id } = useReviews(state => state.dataSingleItem);

    const create = createReview.bind(null);

    const onCreate = () => {

        startTransition(async () => {

            let timer: NodeJS.Timeout | null;
            const TIME_OUT = 6000;

            function handleTimeOut(): void {
                if (timer) {
                    close(timer);
                }
            }

            await create({
                redirectTo: async (id: string) => revalidateProductPage(id),
                endpoints: `${_id}/reviews`,
                method: "POST",
                id: _id,
                data: form.getFieldsValue()
            })
                .then((response) => {
                    api.open({
                        message: <span style={{ color: "#33eb33", display: "block", textAlign: 'center' }}>{response.message}</span>,
                        description: <div style={{ textAlign: 'center' }}>{response.review.name}, Thank you for your comment</div>,
                        showProgress: true,
                        pauseOnHover: false,
                        placement: 'bottomRight'
                    });
                    timer = setTimeout(handleTimeOut, TIME_OUT); //закрытие модального окна
                })
                .catch((e) => {
                    api.open({
                        message: <span style={{ color: "#eb0d10", display: "block", textAlign: 'center' }}>{e.message}</span>,
                        description: <div style={{ textAlign: 'center' }}>Oops, Something went wrong, try again</div>,
                        showProgress: true,
                        pauseOnHover: false,
                        placement: 'bottomRight'
                    });
                })
        });
    };


    return (
        <>
            {contextHolder}
            <Form
                {...formItemLayout}
                form={form}
                variant={variant || 'outlined'}
                style={{ maxWidth: 600 }}
                autoComplete='off'
                scrollToFirstError={{ behavior: 'instant', block: 'end', focus: true }}
                onFinish={onCreate}
                action={() => create(form.getFieldsValue())}
            >
                <ModalFormStructure />

                <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                    <Button type="primary" htmlType='submit' disabled={isPending} loading={isPending} style={{ width: "150px", padding: "4px 4px" }} >
                        {isPending ? "In process ..." : "Submit"}
                    </Button>

                </Form.Item>
            </Form>

        </>
    );
}