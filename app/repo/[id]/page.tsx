"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Use this hook to access route parameters
import { Repo } from '@/types'; // Adjust the import based on your actual types file

const RepoDetail = () => {
    const { id } = useParams(); // Get the repo ID from the URL
    const [repo, setRepo] = useState<Repo | null>(null);

    useEffect(() => {
        if (id) {
            //TODO: fetch
        }
    }, [id]);

    if (!repo) return <p>Loading...</p>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">{repo.name}</h1>
            <p>{repo.description}</p>
            <p>Stars: {repo.stargazers_count}</p>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                View on GitHub
            </a>
        </div>
    );
};

export default RepoDetail;
