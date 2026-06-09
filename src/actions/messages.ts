import {fetchInstance} from "@/actions/index";

export const getMessages = async (friendId: number) => {
    const { data } = await fetchInstance(`/messages/${friendId}`);
    console.log("data", data);
    return data;
}