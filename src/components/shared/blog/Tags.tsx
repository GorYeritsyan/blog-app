import { type Tag } from "@/types/types";

export default function Tags({ tags, limit }: { tags: Tag[]; limit?: number }) {
    const limitedTags = limit ? tags.slice(0, limit) : tags;

    return (
        <div className="flex items-center justify-center flex-wrap gap-1.5">
            {limitedTags?.map(tag => (
                <div className="bg-zinc-900 text-nowrap text-white font-medium px-2 py-0.5 flex items-center justify-center rounded-md border border-zinc-100 text-xs" key={tag.id}>
                    {tag.title}
                </div>
            ))}
            {limit && limit < tags.length && (
                <div className="bg-white text-nowrap text-zinc-600 font-medium px-2 py-0.5 flex items-center justify-center rounded-md border border-zinc-100 text-xs">
                    +{tags.length - limit} more
                </div>
            )}
        </div>
    )
}