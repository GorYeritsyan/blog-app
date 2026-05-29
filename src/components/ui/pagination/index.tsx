"use client";

import { useRouter, useSearchParams } from "next/navigation";
import PaginationButton from "@/components/ui/pagination/PaginationButton";
import Button from "@/components/ui/Button";
import NextButton from "@/components/ui/pagination/NextButton";
import PrevButton from "@/components/ui/pagination/PrevButton";

type PaginationProps = {
    visibleButtonsNumber?: number;
    isEllipsis?: boolean;
    totalPages: number;
}

const Index = ({ visibleButtonsNumber = 10, isEllipsis = true, totalPages }: PaginationProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentPage = +(searchParams.get("page") ?? 1);

    const offset = 1;
    const centerOffsetLength = offset * 2 + 1;
    const halfOfVisibleButtons = visibleButtonsNumber / 2;

    const paginationArrayLength = isEllipsis ? centerOffsetLength : visibleButtonsNumber;
    let paginationCenter: number[] = Array.from({ length: paginationArrayLength });

    if (isEllipsis) {
        // Index start length is startOffset
        paginationCenter = paginationCenter
            .map((_, i) => currentPage - offset + i)
            .filter(page => page > 0 && page <= totalPages);
    } else {
        paginationCenter = paginationCenter
            .map((_, i) => currentPage > halfOfVisibleButtons && currentPage <= totalPages - halfOfVisibleButtons ? (
                currentPage - halfOfVisibleButtons + i
            ) : currentPage >= totalPages - halfOfVisibleButtons ? totalPages - visibleButtonsNumber + i + 1 :  i + 1)
            .filter(page => page > 0 && page <= totalPages);
    }

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams);
        const currentPage = +(params.get("page") ?? 1);

        if (currentPage === page) return;

        // Remove page param from url if page is 1
        if (page > 1) {
            params.set("page", `${page}`);
        } else {
            params.delete("page");
        }

        router.replace(`?${params.toString()}`);
    }

    const incrementPage = () => {
        handlePageChange(currentPage + 1);
    }

    const decrementPage = () => {
        handlePageChange(currentPage - 1);
    }

    return (
        <>
            {totalPages > 1 && (
                <div className="flex gap-4 items-center justify-center">
                    {currentPage > 1 && (
                        <PrevButton onDecrementPage={decrementPage} />
                    )}

                    {/* Index start buttons */}
                    {isEllipsis && currentPage > offset * 2 && (
                        <PaginationButton currentPage={currentPage} onChangePage={handlePageChange} page={1} />
                    )}

                    {isEllipsis && currentPage > centerOffsetLength && <Button disabled variant="ghost">...</Button>}

                    {/* Index center buttons */}
                    {paginationCenter.map((page) => (
                        <PaginationButton currentPage={currentPage} onChangePage={handlePageChange} key={page} page={page} />
                    ))}

                    {isEllipsis && currentPage < (totalPages - 2 * offset) && (
                        <Button disabled variant="ghost">...</Button>
                    )}

                    {/* Index end buttons */}
                    {isEllipsis && currentPage < totalPages - offset && (
                        <PaginationButton currentPage={currentPage} onChangePage={handlePageChange} page={totalPages} />
                    )}

                    {currentPage < totalPages && (
                        <NextButton onIncrementPage={incrementPage} currentPage={currentPage} totalPages={totalPages} />
                    )}
                </div>
            )}
        </>
    );
}

export default Index;