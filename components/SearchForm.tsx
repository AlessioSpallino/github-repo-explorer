'use client';

import { useState } from 'react';
import { SearchType } from '@/types';

interface SearchFormProps {
    onSearch: (searchTerm: string, searchType: SearchType) => void;
    searchType: SearchType;
    isLoading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading }) => {
    const [inputValue, setInputValue] = useState('');
    const [searchType, setSearchType] = useState<SearchType>('user');
    const [errorMessage, setErrorMessage] = useState('');

    // Handle the input value change
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        setErrorMessage('');
    };

    // Handle the search type change (username or organization)
    const handleSearchTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchType(event.target.value as SearchType);
    };

    // Handle form submission
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (inputValue.trim() === '') {
            setErrorMessage('Please enter a valid search term.');
            return;
        }

        onSearch(inputValue, searchType);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto flex flex-col gap-6 w-full">
            <div className="flex flex-col md:flex-row gap-6 w-full">
                {/* Search Type */}
                <div className="flex items-center md:w-2/4">
                    <label htmlFor="search-type" className="text-sm font-medium w-48">Search by:</label>
                    <select
                        id="search-type"
                        value={searchType}
                        onChange={handleSearchTypeChange}
                        className="text-sm border p-3 rounded-md shadow-md text-gray-300 w-full bg-black focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="user">Username</option>
                        <option value="org">Organization</option>
                    </select>
                </div>

                {/* Search Input */}
                <div className="flex items-center md:w-2/4">
                    <label htmlFor="search-input" className="text-sm font-medium w-48">Search term:</label>
                    <input
                        id="search-input"
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder={`Enter ${searchType}`}
                        className="text-sm border bg-black p-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-300 w-full"
                    />
                </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
                <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            )}

            {/* Submit Button */}
            <div className="flex justify-center">
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full bg-blue-500 text-white p-3 rounded-md transition-colors duration-200 ease-in-out hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                        isLoading ? 'bg-gray-400 cursor-not-allowed' : ''
                    }`}
                    style={{ maxWidth: '200px', height: '50px' }}
                >
                    {isLoading ? 'Searching...' : 'Search'}
                </button>
            </div>
        </form>
    );
};

export default SearchForm;
