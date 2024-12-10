'use client';
import { useState } from 'react';
import Image from "next/image";
import { useQuery } from '@tanstack/react-query';
import { fetchRepos } from '@/lib/github/github-api';
import RepoList from '@/components/RepoList';
import SearchForm from '@/components/SearchForm';
import { GitHubApiOutput, Sort, Direction } from '@/types';
import { getErrorMessage } from '@/utils/errorUtils';

export default function Home() {
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchType, setSearchType] = useState<'user' | 'org'>('user');
  const [sort, setSort] = useState<Sort>('stars'); // Default sort can be adjusted
  const [direction, setDirection] = useState<Direction>('asc'); // Default direction can be adjusted
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  // Use the query hook to fetch repositories
  const { data, isError, isLoading, isFetching } = useQuery<GitHubApiOutput>({
    queryFn: () => fetchRepos({
      user: searchType === 'user' ? searchInput : undefined,
      org: searchType === 'org' ? searchInput : undefined,
      page: currentPage,
      perPage,
      sort,
      direction,
      q: '' // You can pass a query string here if needed
    }),
    queryKey: ['data', searchInput, searchType, currentPage, sort, direction],
    enabled: !!searchInput,
  });

  const handleSearch = (input: string, type: 'user' | 'org') => {
    setSearchInput(input);
    setSearchType(type);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleSortChange = (newSort: Sort, newDirection: Direction) => {
    setSort(newSort);
    setDirection(newDirection);
  };

  return (
    <div className="flex flex-col justify-between p-8 ">
      <Image
        className="mx-auto"
        src={isLoading ? "/daftpunk.gif" : "/daftpunk.png"}
        alt="Next.js logo"
        width={200}
        height={100}
        priority
      />
      <main className="flex flex-col gap-8 items-center min-h-screen justify-start">
        <SearchForm onSearch={handleSearch} searchType={searchType} />
        {isError && <p className="text-red-500">{getErrorMessage(isError)}</p>}
        {data && data.repos.length > 0 ? (
          <div className="w-full max-w-4xl"> {/* Responsive width container */}
            <RepoList
              repos={data.repos}
              links={data.links}
              onPageChange={setCurrentPage}
              currentPage={currentPage}
              onSortChange={handleSortChange}
              sort={sort}
              direction={direction}
            />
          </div>
        ) : (
          <p>No repositories found.</p>
        )}
      </main>
    </div>
  );
}
