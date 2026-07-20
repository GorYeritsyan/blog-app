import Search from "@/components/shared/Search";
import Products from "@/components/shared/products/Products";
import ChatDrawer from "@/components/shared/drawers/ChatDrawer";
import {getConversationMessages} from "@/actions/conversations";

export default async function Page({ searchParams, params }: PageProps<"/shop/[[...conversationId]]">) {
    const { query, page = "1" } = await searchParams;
    const conversationId = Number((await params).conversationId?.at(-1));
    const messages = await getConversationMessages(conversationId);

    return (
        <section className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <h1 className="text-4xl font-semibold">Shop</h1>
                <ChatDrawer messages={messages} conversationId={conversationId} />
            </div>

            <div className="flex flex-col gap-4">
                <Search placeholder="Search for products..." />

                {/* Products */}
                <Products query={query as string} page={+page} />
            </div>
        </section>
    );
}