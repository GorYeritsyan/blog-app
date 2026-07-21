export default function ChatEmpty() {
    return (
        <div className="flex items-center justify-center h-full flex-1 min-h-0 p-6">
            <div className="bg-zinc-100 p-4 rounded-lg text-center self-center flex flex-col gap-2">
                <h3 className="text-base font-medium">Need help finding something?</h3>
                <p className="text-zinc-700 text-center leading-tight text-sm">
                    I can answer questions about our products, stock, pricing, and more. Just type your question below to get started.
                </p>
            </div>
        </div>
    );
}