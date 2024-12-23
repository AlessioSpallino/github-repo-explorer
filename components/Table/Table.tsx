import * as React from 'react';
import { redirect } from 'next/navigation'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Repo } from '@/types';

interface TableProps {
    repos: Repo[];
    columns: (toggleFavorite: (repoId: number) => void) => GridColDef[];
    toggleFavorite: (repoId: number) => void;
}

const paginationModel = { page: 0, pageSize: 5 };

const Table: React.FC<TableProps> = ({ repos, columns, toggleFavorite }) => {
    const handleRowClick = (params: any) => {
        const { id } = params.row;
        redirect(`/repo/${id}`); // Navigate to the repo detail page
    };

    return (
        <div className="p-4 max-w-5xl mx-auto bg-gray-800 rounded-lg shadow-lg">
            <DataGrid
                rows={repos}
                columns={columns(toggleFavorite)}
                pageSizeOptions={[5, 10, 20]}
                initialState={{ pagination: { paginationModel } }}
                pagination
                onRowClick={handleRowClick}
                rowSelection={false}
                sx={{
                    border: 0,
                    fontFamily: 'var(--font-geist-mono)',
                    '& .MuiDataGrid-columnHeader': {
                        backgroundColor: '#1f2937',
                    },
                    '& .MuiDataGrid-row:hover': {
                        backgroundColor: '#374151',
                    },
                    // Grouped styles for color: white
                    '&, & .MuiDataGrid-columnHeader, & .MuiDataGrid-cell, & .MuiCheckbox-root, & .MuiTablePagination-root, & .MuiSvgIcon-root, & .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows, & .MuiTablePagination-actions button': {
                        color: 'white',
                    },
                }}
            />

        </div>
    );
};

export default Table;
