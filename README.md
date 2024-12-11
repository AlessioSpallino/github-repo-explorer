# GitHub Repo Explorer

A simple and efficient web application for exploring GitHub repositories using the GitHub REST API. This project allows users to search for repositories by username or organization and view details, including sorting and filtering options.

## Getting Started

These instructions will help you set up the project locally and run it.

### Prerequisites

Make sure you have the following installed:

- Node.js (version 14 or higher)
- Yarn (version 1.22 or higher)

### Installation

Clone the repository:

```bash
git clone https://github.com/AlessioSpallino/github-repo-explorer
cd github-repo-explorer
```

Install dependencies using Yarn:
```
yarn install
```

## Environment Variables
To run the application locally, you need to create an .env.local file in the root directory of the project. This file should contain your GitHub personal access token as follows:

```GITHUB_TOKEN=your_personal_access_token_here```

## Running the Application
To run the application in development mode, use the following command:

```yarn run dev```
This will start the Next.js development server, and you can view the application in your browser at http://localhost:3000.

## Running ESLint
To run ESLint for linting your code, execute:

```yarn lint```
This command will check your code for any linting errors based on the configured rules.

## Running Component Tests
To run the tests for your components, use the command:

```yarn test```
This will execute the Jest test suite, which includes unit tests for your React components.

## Framework Choices
### Next.js
I chose Next.js for this project because it simplifies code organization and enhances developer productivity with its file-based routing system. Next.js effectively handles pagination, making it easy to manage large data sets. Additionally, its support for server-side rendering (SSR) ensures efficient API calls by fetching data at the server level, which improves performance and SEO.

### React Query
I chose React Query for handling data fetching and state management in this project. It simplifies asynchronous operations by caching requests and managing all states during the fetch process. The automatic caching feature was a key factor in my decision to use it.

### Octokit
For interacting with the GitHub REST API, I utilized Octokit. It provides a simple and efficient way to fetch data from GitHub.

### Material-UI Grid Table
I decided to use the Material-UI Grid Table instead of building a custom table component because it offers built-in functionalities such as sorting and filtering with many options. This reduces development time and effort, allowing me to focus on other aspects of the application. However, one downside is that customizing the styling and colors can be somewhat challenging due to the constraints of the Material-UI theming system.

### Tailwind CSS
I chose Tailwind CSS for styling the application because it provides a utility-first approach to CSS. This allows for rapid design and customization. Tailwind’s flexibility makes it easy to create responsive designs and ensures consistency across the application.

## Code Quality
The code is fully typed using TypeScript.
