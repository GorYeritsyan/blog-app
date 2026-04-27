"use client";

import { useRouter, useSearchParams } from "next/navigation";
import PaginationButton from "@/app/components/ui/pagination/PaginationButton";
import Button from "@/app/components/ui/Button";
import PaginationNextButton from "@/app/components/ui/pagination/PaginationNextButton";
import PaginationPrevButton from "@/app/components/ui/pagination/PaginationPrevButton";

type PaginationProps = {
    visibleButtonsNumber?: number;
    isEllipsis?: boolean;
    totalPages: number;
}

const Pagination = ({ visibleButtonsNumber = 10, isEllipsis = true, totalPages }: PaginationProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentPage = +(searchParams.get("page") ?? 1);

    const offset = 1;
    const centerOffsetLength = offset * 2 + 1;
    const halfOfVisibleButtons = visibleButtonsNumber / 2;

    const paginationArrayLength = isEllipsis ? centerOffsetLength : visibleButtonsNumber;
    let paginationCenter = Array.from({ length: paginationArrayLength });

    if (isEllipsis) {
        // Pagination start length is startOffset
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
        params.set("page", `${page}`);
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
                        <PaginationPrevButton onDecrementPage={decrementPage} />
                    )}

                    {/* Pagination start buttons */}
                    {isEllipsis && currentPage > offset * 2 && (
                        <PaginationButton currentPage={currentPage} onChangePage={handlePageChange} page={1} />
                    )}

                    {isEllipsis && currentPage > centerOffsetLength && <Button disabled variant="ghost">...</Button>}

                    {/* Pagination center buttons */}
                    {paginationCenter.map((page) => (
                        <PaginationButton currentPage={currentPage} onChangePage={handlePageChange} key={page} page={page} />
                    ))}

                    {isEllipsis && currentPage < (totalPages - 2 * offset) && (
                        <Button disabled variant="ghost">...</Button>
                    )}

                    {/* Pagination end buttons */}
                    {isEllipsis && currentPage < totalPages - offset && (
                        <PaginationButton currentPage={currentPage} onChangePage={handlePageChange} page={totalPages} />
                    )}

                    {currentPage < totalPages && (
                        <PaginationNextButton onIncrementPage={incrementPage} currentPage={currentPage} totalPages={totalPages} />
                    )}
                </div>
            )}
        </>
    );
}

export default Pagination;