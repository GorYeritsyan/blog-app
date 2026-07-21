export default function ChatEmpty() {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-6 text-muted-foreground">
            <p className="font-medium text-foreground">How can I help you today?</p>
            <p className="text-sm mt-1">Send a message to start this conversation.</p>
        </div>
    );
}