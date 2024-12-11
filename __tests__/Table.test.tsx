import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Table from '../components/Table/Table';
import { columns } from '../components/Table/RepoTableColumns';
import { Repo } from '@/types';

const mockRepos: Repo[] = [
    {
        id: 1,
        name: 'Repo 1',
        owner: {
            avatar_url: 'https://example.com/avatar1.png',
        },
        html_url: 'https://example.com/repo1',
        description: 'Description 1',
        stargazers_count: 10,
    },
    {
        id: 2,
        name: 'Repo 2',
        owner: {
            avatar_url: 'https://example.com/avatar2.png',
        },
        html_url: 'https://example.com/repo2',
        description: 'Description 2',
        stargazers_count: 5,
    },
    {
        id: 3,
        name: 'Repo 3',
        owner: {
            avatar_url: 'https://example.com/avatar3.png',
        },
        html_url: 'https://example.com/repo3',
        description: 'Description 3',
        stargazers_count: 20,
    },
    {
        id: 4,
        name: 'Repo 4',
        owner: {
            avatar_url: 'https://example.com/avatar4.png',
        },
        html_url: 'https://example.com/repo4',
        description: 'Description 4',
        stargazers_count: 15,
    },
    {
        id: 5,
        name: 'Repo 5',
        owner: {
            avatar_url: 'https://example.com/avatar5.png',
        },
        html_url: 'https://example.com/repo5',
        description: 'Description 5',
        stargazers_count: 0,
    },
    {
        id: 6,
        name: 'Repo 6',
        owner: {
            avatar_url: 'https://example.com/avatar6.png',
        },
        html_url: 'https://example.com/repo6',
        description: 'Description 6',
        stargazers_count: 30,
    },
];

describe('Table Component', () => {
    test('renders correctly with given repos and columns', () => {
        render(<Table repos={mockRepos} columns={columns} />);

        // Check if description are in the document
        expect(screen.getByText('Description 1')).toBeInTheDocument();
    });

    test('renders the correct number of rows', () => {
        render(<Table repos={mockRepos} columns={columns} />);
        
        // Check if the DataGrid renders the correct number of rows
        const rows = screen.getAllByRole('row');
        expect(rows).toHaveLength(mockRepos.length);
    });

    test('renders no rows when repos are empty', () => {
        render(<Table repos={[]} columns={columns} />);
        
        // Check for a message or empty state (if applicable)
        expect(screen.queryByText('Description 1')).not.toBeInTheDocument();
    });
});
