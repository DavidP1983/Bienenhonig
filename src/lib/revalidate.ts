"use server";

import { revalidatePath } from "next/cache";

export async function revalidateProductPage(id: string): Promise<void> {
    revalidatePath(`/products/${id}`);
}