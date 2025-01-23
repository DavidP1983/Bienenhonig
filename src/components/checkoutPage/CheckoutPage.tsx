'use client';
import { TextInput, Button, Group, Textarea, InputBase } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IMaskInput } from 'react-imask';
import { notification } from 'antd';
import { zodResolver } from 'mantine-form-zod-resolver';
import { schema } from '@/lib/schema';
import { sendMail } from '@/lib/actions';
import { Confiramtion } from '../UI/confirmation/Confiramtion';
import { v4 as uuidv4 } from 'uuid';
import { useCartOrder } from '@/store';
import { useShallow } from 'zustand/shallow';


import './styles/checkoutPage.scss';

export const CheckoutPage = () => {
    const [api, contextHolder] = notification.useNotification();
    const { cartOrder } = useCartOrder(useShallow((state) => ({
        cartOrder: state.cartOrder,
    })));

    const id = uuidv4();

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            name: '',
            surname: '',
            email: '',
            phone: '',
            comment: '',
            id: id
        },
        validate: zodResolver(schema),
    });


    const handleSubmit = async (values: typeof form.values) => {
        const result = await sendMail(values, cartOrder);

        if (result?.success) {
            form.reset();
            cartOrder.length = 0;
            api.open({
                message: 'Confirmation',
                description: <Confiramtion confirmNumber={result.order?.id} />,
                duration: 0,
            });
            return;
        }

        if (result?.error) {
            form.reset();
            api.open({
                message: <span style={{ color: "#eb0d10", display: "block", textAlign: 'center' }}>Error</span>,
                description: <span style={{ color: "#eb0d10", display: "block", textAlign: 'center' }}>Something went wrong try again</span>,
                duration: 0,
            });
        }

    };


    return (
        <form onSubmit={form.onSubmit(handleSubmit)} className='form'>
            {contextHolder}
            <div className='form__input'>
                <TextInput
                    withAsterisk
                    autoFocus
                    label="Name"
                    name='name'
                    placeholder="Your first name"
                    key={form.key('name')}
                    {...form.getInputProps('name')}
                />
                <TextInput
                    withAsterisk
                    label="Surname"
                    name='surname'
                    placeholder="Your last name"
                    key={form.key('surname')}
                    {...form.getInputProps('surname')}
                />

                <TextInput
                    withAsterisk
                    label="Email"
                    name='email'
                    placeholder="your@email.com"
                    key={form.key('email')}
                    {...form.getInputProps('email')}
                />

                <InputBase
                    withAsterisk
                    label="Phone"
                    name='phone'
                    component={IMaskInput}
                    mask="+4 (000) 000-0000"
                    placeholder="Your phone"
                    key={form.key('phone')}
                    {...form.getInputProps('phone')}
                />

            </div>

            <Textarea
                resize="vertical"
                label="Comment"
                name='comment'
                placeholder="Your comment"
                key={form.key('comment')}
                {...form.getInputProps('comment')} />

            <TextInput
                type='hidden'
                name='id'
                key={form.key('id')}
                {...form.getInputProps('id')}
            />

            <Group justify="flex-end" mt="md">
                <Button
                    type="submit"
                    className='form__btn'
                    disabled={form.submitting}
                    loading={form.submitting}>Submit</Button>
            </Group>
        </form>
    );
}

