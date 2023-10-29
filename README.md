## GitHub Repository Search App

### Table of Contents
- [Overview](overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Testing](#testing)

### Overview

The GitHub Repository Search App is a web application that allows users to search for GitHub repositories using keywords. It provides a user-friendly interface for searching and viewing GitHub repositories.

### Features

- Search for GitHub repositories by keywords.
- View repository details, including name, description, owner, and more.
- Pagination support for large result sets.

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Ruby (version 3.2.2)
- Rails (version 7.0.8)

### Getting Started

To get started with the GitHub Repository Search App, follow these steps:

1. Clone the repository to your local machine:
   ```shell
   git clone https://github.com/aijaz-khan/github-repo-search-app.git
2. Change to the project directory:
   ```shell
   cd github-repo-search-app
   
3. Install Ruby gems:
   ```shell
   bundle install
4. Install JavaScript packages:
   ```shell
   yarn install
5. Start the Rails server:
   ```shell
   bin/dev
6. Open your web browser and access the app at http://localhost:3000.

### Usage
- Enter a search term in the search bar.
- Click the "Search" button to search for repositories.
- Browse through the search results and click on a repository to view more details.

### API Documentation
The app interacts with the GitHub REST API for repository search. You can find more information about the GitHub API at https://developer.github.com/v3/.

### Testing
Run Rails specs
   ```shell
   bundle exec rspec