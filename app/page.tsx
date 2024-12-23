"use client";
import { useState, useEffect } from 'react';
import Image from "next/image";
import { useQuery } from '@tanstack/react-query';
import { fetchRepos } from '@/api/github/github-api';
import Table from '@/components/Table/Table';
import SearchForm from '@/components/SearchForm';
import { Repo, SearchType } from '@/types';
import Footer from '@/components/Footer';

import { columns } from '@/components/Table/RepoTableColumns';

export default function Home() {
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchType, setSearchType] = useState<SearchType>('user');

  const [favorites, setFavorites] = useState<number[]>([]);

  // Load favorites from localStorage when the component mounts
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Use the query hook to fetch repositories
  const { data, isError, isLoading, error } = useQuery<Repo[]>({
    queryFn: () => fetchRepos({
      user: searchType === 'user' ? searchInput : undefined,
      org: searchType === 'org' ? searchInput : undefined,
    }),
    queryKey: ['data', searchInput, searchType],
    enabled: !!searchInput,
  });

  const handleSearch = (input: string, type: SearchType) => {
    setSearchInput(input);
    setSearchType(type);
  };

  const toggleFavorite = (repoId: number) => {
    setFavorites((prevFavorites: number[]) => {
      // Check if the repoId is already in the favorites
      if (prevFavorites.includes(repoId)) {
        // Remove it from favorites
        const updatedFavorites = prevFavorites.filter((id) => id !== repoId);
        // Update localStorage
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        return updatedFavorites; // Return the updated favorites
      } else {
        // Add it to favorites
        const updatedFavorites = [...prevFavorites, repoId];
        // Update localStorage
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        return updatedFavorites; // Return the updated favorites
      }
    });
  };


  const augmentedData = data?.map((repo: Repo) => ({
    ...repo,
    favorite: favorites.includes(repo.id),
  }))

  return (
    <div className="flex flex-col justify-between p-8 font-[family-name:var(--font-geist-mono)]">
      <Image
        className="mx-auto"
        src={isLoading ? "/daftpunk.gif" : "/daftpunk.png"}
        alt="Next.js logo"
        width={200}
        height={100}
        priority
      />
      <main className="flex flex-col gap-8 items-center min-h-screen justify-start">
        <SearchForm onSearch={handleSearch} searchType={searchType} isLoading={isLoading} />

        {isError && (
          <p className="text-red-500">
            {error instanceof Error ? error.message : 'An error occurred.'}
          </p>
        )}

        {data && data.length > 0 && (
          <div className="w-full max-w-5xl">
            <Table
              repos={augmentedData || []}
              columns={columns}
              toggleFavorite={toggleFavorite}
            />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
