import { useState } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
interface DescriptionCellProps {
    description: string;
}
// Custom component for the description cell
const DescriptionCell = ({ description }: DescriptionCellProps) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div
                onClick={handleOpen}
                style={{
                    cursor: 'pointer',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                }}
            >
                {description}
            </div>
            <Modal open={open} onClose={handleClose}>
                <Box
                    className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-2xl bg-gray-800 rounded-lg shadow-lg p-6"
                >
                    <h2 className="text-xl font-bold text-white mb-4">Description</h2>
                    <p className="text-gray-300 mb-6">{description}</p>
                    <button
                        onClick={handleClose}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                    >
                        Close
                    </button>
                </Box>
            </Modal>
        </>
    );
};

export const columns: GridColDef[] = [
    {
        field: 'avatar',
        headerName: 'Avatar',
        width: 100,
        sortable: false,
        filterable: false,
        renderCell: (params) => (
            <img
                src={params.row.owner.avatar_url}
                alt="Owner Avatar"
                className="w-10 h-10 rounded-full"
                width={20}
                height={20}
            />
        ),
    },
    {
        field: 'name',
        headerName: 'Name',
        width: 250
    },
    {
        field: 'description',
        headerName: 'Description',
        width: 300,
        renderCell: (params) => (
            <DescriptionCell description={params.value} />
        ),
    },
    {
        field: 'stargazers_count',
        headerName: 'Stars',
        type: 'number',
        width: 100
    },
    {
        field: 'html_url',
        headerName: 'Link',
        width: 150,
        sortable: false,
        filterable: false,
        renderCell: (params) => (
            <a
                href={params.row.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
            >
                View
            </a>
        ),
    },
];
