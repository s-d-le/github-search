# GitHub Search Monorepo

This monorepo contains a Next.js application for searching GitHub profiles, Playwright test suite and a shared ui-components library. It demonstrates the use of Server-Side Rendering (SSR), API routes, shared dependencies and integration with external APIs.

## Features

- Search for GitHub users by username
- Server-Side Rendering for improved performance and SEO
- API route to securely handle GitHub API requests
- Form validation using React Hook Form
- Playwright tests for end-to-end testing

## Tech Stack

- [pnpm](https://pnpm.io/)
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Hook Form](https://react-hook-form.com/)
- [CSS Modules](https://github.com/css-modules/css-modules)
- [Playwright](https://playwright.dev/)

## Getting Started

### Installation

1. Clone the repository:

   ```
   git clone git@github.com:s-d-le/github-search.git
   cd github-search
   ```

2. Install dependencies:

   ```
   pnpm install
   cd packages/github-search
   ```

3. Create a `.env.local` file in `packages/github-search` add your GitHub Personal Access Token:

   ```
   GITHUB_TOKEN=your_github_personal_access_token
   ```

   To create a GitHub Personal Access Token:

   - Go to GitHub Settings > Developer settings > Personal access tokens
   - Click "Generate new token"
   - Give it a name and select the `user` scope
   - Copy the generated token

### Running the Application

1. Start the NextJS development server:

   ```
   pnpm run dev
   ```

## API Routes

The application uses a Next.js API route to securely handle requests to the GitHub API. This route is located at `pages/api/search-users.ts`. It accepts a query parameter `q` and returns the search results from the GitHub API.

## Server-Side Rendering (SSR)

The main page (`pages/index.tsx`) uses Server-Side Rendering. This means that the initial HTML is generated on the server, which can improve performance and SEO. The search functionality then uses client-side rendering for a smooth user experience.

## Testing

The application includes Playwright tests for end-to-end testing. To run the tests:

1. Ensure the application is running on `http://localhost:3000`
2. In a separate terminal, run:
   ```
   npx playwright test
   ```

## Deployment

This application can be easily deployed to platforms like Vercel or Netlify. Remember to set the `GITHUB_TOKEN` environment variable in your deployment platform's settings.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
