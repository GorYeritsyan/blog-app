"use server";

import {fetchInstance} from "@/actions/index";

export const getCartItems = async () => {
    const { data } = await fetchInstance("/cart");

    return data;
}