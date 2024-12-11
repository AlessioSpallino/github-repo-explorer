import { render, screen, fireEvent } from '@testing-library/react';
import SearchForm from '../components/SearchForm';
import { SearchType } from '@/types'; // Adjust the import path as needed

describe('SearchForm Component', () => {
    const onSearchMock = jest.fn();
    const setup = (isLoading = false, searchType: SearchType = 'user') => {
        render(<SearchForm onSearch={onSearchMock} isLoading={isLoading} searchType={searchType} />);
    };

    test('renders correctly with default values', () => {
        setup();
        expect(screen.getByLabelText(/Search by:/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Search term:/)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument();
    });

    test('handles input change', () => {
        setup();
        const input = screen.getByLabelText(/Search term:/);
        fireEvent.change(input, { target: { value: 'testUser' } });
        expect(input).toHaveValue('testUser');
    });

    test('handles search type change', () => {
        setup();
        const select = screen.getByLabelText(/Search by:/);
        fireEvent.change(select, { target: { value: 'org' } });
        expect(select).toHaveValue('org');
    });

    test('shows error message when submitting empty input', () => {
        setup();
        const button = screen.getByRole('button', { name: /Search/i });
        fireEvent.click(button);
        expect(screen.getByText(/Please enter a valid search term/i)).toBeInTheDocument();
    });

    test('calls onSearch with correct arguments on valid submission', () => {
        setup();
        const input = screen.getByLabelText(/Search term:/);
        const select = screen.getByLabelText(/Search by:/);
        
        fireEvent.change(input, { target: { value: 'testUser' } });
        fireEvent.change(select, { target: { value: 'user' } });
        
        const button = screen.getByRole('button', { name: /Search/i });
        fireEvent.click(button);
        
        expect(onSearchMock).toHaveBeenCalledWith('testUser', 'user');
    });

    test('disables button when loading', () => {
        setup(true);
        const button = screen.getByRole('button', { name: /Search/i });
        expect(button).toBeDisabled();
    });
});
