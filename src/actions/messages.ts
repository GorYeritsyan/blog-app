import {fetchInstance} from "@/actions/index";

export const getMessages = async (friendId: number) => {
    const { data } = await fetchInstance(`/messages/${friendId}`);
    return data;
}