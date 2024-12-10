import React from 'react';
import {
    useReactTable,
    ColumnDef,
    flexRender,
    getCoreRowModel,
} from '@tanstack/react-table';
import { Repo, Sort, Direction, Links } from '@/types';

interface RepoListProps {
    repos: Repo[];
    links: Links;
    onPageChange: (page: number) => void;
    currentPage: number;
    sort: Sort;
    direction: Direction;
    onSortChange: (sort: Sort, direction: Direction) => void;
}

const RepoList: React.FC<RepoListProps> = ({
    repos,
    links,
    onPageChange,
    currentPage,
    sort,
    direction,
    onSortChange,
}) => {
    const pageCount = React.useMemo(() => {
        if (!links.last) return 1;
        const urlParams = new URLSearchParams(links.last.split('?')[1]);
        return parseInt(urlParams.get('page') || '1', 10);
    }, [links]);

    const columns: ColumnDef<Repo>[] = React.useMemo(
        () => [
            { header: 'Name', accessorKey: 'full_name', enableSorting: false, enableColumnFilter: false },
            { header: 'Description', accessorKey: 'description', enableSorting: false },
            { header: 'Stars', accessorKey: 'stars', enableSorting: true },
            {
                header: 'Link',
                accessorKey: 'html_url',
                enableSorting: false,
                enableColumnFilter: false,
                cell: ({ getValue }) => (
                    <a
                        href={getValue() as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                    >
                        View
                    </a>
                ),
            },
        ],
        []
    );

    const table = useReactTable({
        data: repos,
        columns,
        manualPagination: false,
        pageCount,
        getCoreRowModel: getCoreRowModel(),
        enableSorting: true,
    });

    return (
        <div className="p-4 md:p-12 overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-600 rounded-lg">
                <thead className="bg-black">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} className="border border-gray-600 px-2 md:px-4 py-2 font-bold text-gray-300">
                                    <div
                                        onClick={(e) => {
                                            if (!header.column.columnDef.enableSorting) {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                return;
                                            }
                                            const newDirection =
                                                header.column.id === sort && direction === 'asc' ? 'desc' : 'asc';
                                            onSortChange(header.column.id as Sort, newDirection);
                                        }}
                                        style={{ cursor: header.column.columnDef.enableSorting ? 'pointer' : 'default' }}
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        {header.id === sort && header.column.columnDef.enableSorting && (
                                            direction === 'asc' ? ' 🔼' : ' 🔽'
                                        )}
                                        {header.column.getCanFilter() ? (
                                            <div>
                                                <input 
                                                    type='text' 
                                                    value={(header.column.getFilterValue() || '') as string}
                                                />
                                            </div>
                                        ) : null}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className={'bg-gray-800'}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="border border-gray-600 px-2 md:px-4 py-2 text-gray-200">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between mt-4 text-gray-300">
                <button
                    onClick={() => links.prev && onPageChange(currentPage - 1)}
                    disabled={!links.prev}
                    className={`px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition ${!links.prev && 'bg-gray-400 cursor-not-allowed'}`}
                >
                    Previous
                </button>
                <span>
                    Page {currentPage} of {pageCount}
                </span>
                <button
                    onClick={() => links.next && onPageChange(currentPage + 1)}
                    disabled={!links.next}
                    className={`px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition ${!links.next && 'bg-gray-400 cursor-not-allowed'}`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default RepoList;
