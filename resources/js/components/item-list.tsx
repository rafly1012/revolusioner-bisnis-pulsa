import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import type { ReactNode } from 'react';
import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Empty, EmptyHeader, EmptyTitle } from '@/components/ui/empty';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { ItemGroup } from './ui/item';

interface Column<T> {
    key: string;
    label?: string;
    searchable?: boolean;
    render?: (item: T) => ReactNode;
}

interface ItemListProps<T> {
    data: T[];
    columns?: Column<T>[];
    renderItem: (item: T, index: number) => ReactNode;
    perPage?: number;
    className?: string;
    itemGroupClassName?: string;
    onAdd?: ReactNode;
    searchable?: boolean;
}

export function ItemList<T extends Record<string, unknown>>({
    data,
    columns,
    renderItem,
    perPage = 10,
    className = '',
    itemGroupClassName = '',
    onAdd,
    searchable = true,
}: ItemListProps<T>) {
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const filteredData = useMemo(() => {
        if (!search) return data;

        const q = search.toLowerCase();
        const searchableColumns = columns?.filter((col) => col.searchable);

        return data.filter((item) =>
            searchableColumns?.some((col) => {
                const value = item[col.key];
                return value?.toString().toLowerCase().includes(q);
            }),
        );
    }, [search, data, columns]);

    const totalPages = Math.ceil(filteredData.length / perPage);
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxPageButtons = 5;

        if (totalPages <= maxPageButtons) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            const leftSiblingIndex = Math.max(currentPage - 1, 1);
            const rightSiblingIndex = Math.min(currentPage + 1, totalPages);

            const showLeftEllipsis = leftSiblingIndex > 2;
            const showRightEllipsis = rightSiblingIndex < totalPages - 1;

            pages.push(1);

            if (showLeftEllipsis) {
                pages.push('ellipsis-left');
            }

            for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
                if (i !== 1 && i !== totalPages) {
                    pages.push(i);
                }
            }

            if (showRightEllipsis) {
                pages.push('ellipsis-right');
            }

            if (totalPages !== 1) {
                pages.push(totalPages);
            }
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className={cn('grid gap-4', className)}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                {searchable && (
                    <Input
                        placeholder="Cari..."
                        className="h-8 w-full sm:w-64"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                )}

                {onAdd}
            </div>

            {paginatedData.length === 0 && (
                <Empty className="border border-dashed">
                    <EmptyHeader>
                        <EmptyTitle>Data tidak ditemukan</EmptyTitle>
                    </EmptyHeader>
                </Empty>
            )}

            <ItemGroup className={cn('grid gap-4', itemGroupClassName)}>
                {paginatedData.map((item, index) =>
                    renderItem(item, startIndex + index),
                )}
            </ItemGroup>

            {totalPages > 1 && (
                <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                        {startIndex + 1} -{' '}
                        {Math.min(endIndex, filteredData.length)} dari{' '}
                        {filteredData.length} data
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon-sm"
                            onClick={() =>
                                setCurrentPage((p) => Math.max(1, p - 1))
                            }
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft />
                        </Button>
                        {pageNumbers.map((page, index) => {
                            if (typeof page === 'string') {
                                return (
                                    <div
                                        key={`${page}-${index}`}
                                        className="flex h-8 w-8 items-center justify-center"
                                    >
                                        <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                );
                            }

                            return (
                                <Button
                                    key={page}
                                    variant={
                                        currentPage === page
                                            ? 'default'
                                            : 'outline'
                                    }
                                    size="icon-sm"
                                    onClick={() => setCurrentPage(page)}
                                >
                                    {page}
                                </Button>
                            );
                        })}
                        <Button
                            variant="outline"
                            size="icon-sm"
                            onClick={() =>
                                setCurrentPage((p) =>
                                    Math.min(totalPages, p + 1),
                                )
                            }
                            disabled={currentPage === totalPages}
                        >
                            <ChevronRight />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
