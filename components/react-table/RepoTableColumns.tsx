import { ColumnDef } from '@tanstack/react-table';
import { Repo } from '@/types';

export const columns: ColumnDef<Repo>[] = [
    {
        header: 'Avatar',
        accessorKey: 'owner.avatar_url',
        enableSorting: false,
        enableColumnFilter: false,
        cell: ({ getValue }) => (
            <img
                src={getValue() as string}
                alt="Owner Avatar"
                className="w-10 h-10 rounded-full"
            />
        ),
    },
    { header: 'Name', accessorKey: 'full_name' },
    { header: 'Description', accessorKey: 'description' },
    { 
        header: 'Stars', 
        accessorKey: 'stargazers_count',
    },
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
];

