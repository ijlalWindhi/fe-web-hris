# Website OMIS

<div align="center">
  <img src="public/images/logo.webp" width="300" />
</div>

## Description

This project is built using **Next.js v15.0.4** with **App Router**. It also utilizes **ShadcnUI** as a styled component library and **Tailwind CSS** for flexible component styling.

## Features

- **Next.js v15.0.4**: A React framework for building high-performance web applications.
- **App Router**: A dynamic routing system for handling page navigation.
- **ShadcnUI**: A design system for building UI components.
- **Tailwind CSS**: A utility-first CSS framework for flexible styling.
- **Husky**: Facilitates the use of Git hooks.
- **Prettier**: Automatically formats code.
- **Tanstack Query**: Data fetching

## Requirment

- Node Package Manager(npm) command already exist in your command line
- Node v18.17 or latest

## Installation

Follow these steps to set up the project:

Clone this repository:

```bash
  git clone <url-repository>
```

Navigate to the project directory:

```bash
  cd fe-web-hris
```

Install the necessary dependencies:

```bash
  npm install
```

Run the project in development environment:

```bash
  npm run dev
```

Start the development server on `http://localhost:3000`

## Deployment

Build the application for production:

```bash
    npm run build
```

Locally preview production build:

```bash
    npm run start
```

## Project Structure

```
├── .husky/               # Git hooks for automated tasks
├── app/                  # App router directory (Next.js 14 app directory)
├── components/          # Reusable React components
├── constants/           # Application constants and configuration values
├── kubescript/          # Kubernetes configuration scripts
├── lib/                 # Library code and utility functions
├── nginx/               # Nginx configuration files
├── node_modules/        # Node.js dependencies
├── public/              # Static files served by Next.js
├── service/             # Service routes and endpoints
├── stores/              # State management stores
├── types/               # TypeScript type definitions
├── utils/               # Utility functions and helpers
```

### Directory Details

`/app`

Contains the main application code using Next.js 14 App Router. This is where you'll find your pages and layouts.

`/components`

Houses all reusable React components. These components are shared across different pages and features.

`/api`

Contains API routes and endpoints. Used for backend functionality and API route handlers.

`/stores`

State management related files. This could include Zustand state management solutions.

`/types`

TypeScript type definitions and interfaces used throughout the project.

`/utils`

Helper functions, formatters, and other utility code used across the application.

`/lib`

Core library code and third-party service integrations.

`/constants`

Application-wide constants, configuration values, and static data.

`/public`

Static assets such as images, fonts, and other files that are served directly.

### Development Tools

- `Husky`: Git hooks for code quality checks
- `ESLint`: JavaScript/TypeScript linting
- `Prettier`: Code formatting
- `Docker`: Containerization
- `Nginx`: Web server configuration
- `Kubernetes`: Container orchestration

## Available Scripts

Here are some of the available scripts you can use:

- **`npm run dev`**: Runs the application in development mode.
- **`npm run build`**: Builds the application for production.
- **`npm run start`**: Runs the built application.
- **`npm run lint`**: Runs linting using ESLint.
- **`npm run format`**: Formats the code using Prettier.
- **`npm run prepare`**: Prepares Husky for Git hooks.

## Testing

This project uses Jest for unit and integration tests. Here are the available scripts for running tests:

- **`npm run test`**: Runs all test cases.
- **`npm run test:watch`**: Runs test cases in watch mode, automatically re-running tests on file changes.
- **`npm run test:coverage`**: Runs tests and generates a coverage report.
- **`npm run test:clear`**: Clears the Jest cache.

## Commit Message Standard

To maintain consistency and readability, we follow a standard commit message format in this repository. This helps other developers understand the changes made at a glance. Here we use husky for Git hook, which if you do not follow the defined commit format you will not be able to commit the code.

### Commit Message Convention

This document outlines our commit message convention that follows the Conventional Commits specification.

### Format

All commit messages MUST follow this format:

```
<type>(<scope>): <subject>
```

### Rules

#### Header Length
- Maximum length: 250 characters

#### Type
Type MUST be one of the following and in lowercase:

#### Primary Types
- **feat**: New features or significant additions
- **fix**: Bug fixes
- **docs**: Documentation changes only
- **style**: Changes that don't affect code logic (formatting, spaces, etc.)
- **refactor**: Code changes that neither fix bugs nor add features
- **test**: Adding or modifying tests
- **chore**: Maintenance tasks, build changes, etc.

#### Additional Types
- **perf**: Performance improvements
- **ci**: Changes to CI configuration
- **build**: Changes affecting build system or dependencies
- **revert**: Reverting a previous commit

#### Scope
- MUST be in lowercase
- MUST NOT be empty
- Should indicate the module, component, or area of change

#### Subject
- MUST NOT be empty
- MUST be at least 10 characters long
- Should clearly describe the change

### Examples

```bash
# New feature
feat(auth): implement OAuth2 authentication system with Google provider

# Bug fix
fix(payment): resolve incorrect currency conversion calculation in checkout

# Documentation
docs(api): update API endpoints documentation with new response formats

# Style changes
style(components): format user profile component according to style guide

# Refactoring
refactor(database): optimize user query performance by implementing caching

# Testing
test(auth): add unit tests for password reset functionality

# Maintenance
chore(deps): update dependencies to latest stable versions

# Performance
perf(images): optimize image loading with lazy loading implementation

# CI Changes
ci(pipeline): configure automated deployment to staging environment

# Build System
build(webpack): update webpack configuration for production optimization

# Revert
revert(feature): revert user profile redesign due to performance issues
```

### Invalid Examples

These would fail the commit lint rules:

```bash
# Invalid: Empty scope
feat: add new feature

# Invalid: Uppercase type
FIX(auth): correct login issue

# Invalid: Subject too short
fix(api): update

# Invalid: Missing scope
docs: update readme

# Invalid: Uppercase scope
fix(AUTH): resolve login issues
```

### Tips for Writing Commit Messages

- **Clear and Descriptive**: Ensure that the commit message clearly explains the changes made.
- **Relevant Module**: Use the relevant module name to make it easier to track changes within specific parts of the application.
- **Concise but Informative**: Keep the commit message short but informative, with a title length of up to 50 characters.


## Made with ❤️ by Dhisa