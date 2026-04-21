"use client";

type ButtonProps = {
    children: React.ReactNode;
}

export default function Button({ children, ...props }: ButtonProps) {
    return (
        <button
            className="bg-zinc-900 text-white font-semibold px-4 py-2 rounded-lg cursor-pointer active:"
            {...props}
        >
            {children}
        </button>
    );
}