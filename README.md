# Your Exhibition

## Overview

The (Your Exhibition) Virtual Exhibition Project is a web application that enables users to search, filter, and curate artworks from multiple museum APIs. Users can create personalized exhibitions with a responsive, mobile-friendly interface.

## Website

[Your Exhibition Website](https://yourexhibition.netlify.app)

<img src="https://github.com/user-attachments/assets/3265abd6-a441-4b9d-8660-0452b080ef81" alt="Your Exhibition Website Preview" width="600">

### Features
- **Search and Filter**: Fetch artworks using the Harvard Art Museums and Rijksmuseum APIs, with options to filter by museum and sort by title.
- **Curate Exhibition**: Add and remove artworks to create a customized exhibition. Selected artworks are displayed in a persistent TopBanner component.
- **Error Handling**: Includes robust error handling with Winston for clean logging and user-friendly error messages.
- **User Session Management**: Users are informed that selected artworks is stored in session storage for best performance.
- **Interactive Modals**: Clicking on "Preview" opens a modal displaying detailed artwork information from the API.
- **Notifications**: Integrated snackbar notifications display status messages for user actions.
- **Testing**: Unit tests are implemented using Jest to ensure reliability and performance.

### Tech Stack
- **Frontend**: Next.js, React.js, Material-UI for styling
- **State Management**: React Hooks
- **Error Handling**: Winston
- **Testing**: Jest
- **Hosting**: Netlify

### APIs Used:
1- Harvard Art Museums
2- Rijksmuseum

## Getting Started

### Prerequisites

Node.js (version 20.10.0 or later)
npm or yarn

### Clone the Repository

```
git clone https://github.com/Magdyz/exhibition-curator.git
cd exhibition-curator
```
### Install Dependencies

```npm install```
or
```yarn install```

### Environment Variables

Create a .env.local file in the root directory and add your API keys:

```
NEXT_PUBLIC_HARVARD_API_KEY=your_harvard_api_key
NEXT_PUBLIC_RIJKS_API_KEY=your_rijksmuseum_api_key
```


Running Locally

`npm run dev`
or
`yarn dev`

Access the application at http://localhost:3000.

### Building for Production

`npm run build`
or
`yarn build`

Running Tests

`npm test`
or
`yarn test`

