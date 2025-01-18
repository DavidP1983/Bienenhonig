import { z } from 'zod';

export const schema = z.object({
    name: z
        .string({ required_error: "Name is required" })
        .min(2, { message: 'At least 2 letters' })
        .nonempty({ message: "Name is required" }),
    surname: z
        .string({ required_error: "Surname is required" })
        .min(2, { message: 'At least 2 letters' })
        .nonempty({ message: "Surname is required" }),
    email: z
        .string({ required_error: "Email is required" })
        .email({ message: 'Invalid email' })
        .nonempty({ message: "Email is required" }),
    phone: z
        .string({ required_error: "Phone is required" })
        .min(17, { message: 'Incorrect Phone number' })
        .nonempty({ message: "Phone is required" }),
    comment: z
        .string({ required_error: "Is required" })
        .nonempty({ message: "Is required" }),
    id: z
        .string({ required_error: "Is required" })
});
