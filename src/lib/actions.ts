'use server';
import { ICartOrder } from '@/shared/types/type';
import { z } from 'zod';
import { Resend } from 'resend';
import { schema } from './schema';
import { EmailTemplate } from '@/components/emailTemplate/EmailTemplate';


// action Mail send

const resend = new Resend(process.env.RESEND_API_KEY);
type TData = z.infer<typeof schema>;

async function sendMail(data: TData, cartOrder: ICartOrder[]) {
    const result = schema.safeParse(data);

    if (result.success) {
        const { id, name, surname, email, phone, comment } = result.data;
        try {
            const { data, error } = await resend.emails.send({
                from: 'Begrüßt Sie Bienenhonig <onboarding@resend.dev>',
                to: ['david.piruzashvili@gmail.com'],
                subject: 'Order from submission',
                text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}`,
                react: EmailTemplate({ id, name, surname, email, phone, comment, cartOrder })
            });
            if (error) {
                throw new Error(`Could not process this operation: ${error.message}`)
            }

            return { success: true, order: data }
        } catch (error) {
            if (error instanceof Error) {
                return { success: false, error: error.message }
            }
        }

    }

    if (result.error) {
        return { success: false, error: result.error.format() }
    }
}

export { sendMail }

