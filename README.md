# Your Exhibition

## Overview

The (Your Exhibition) Virtual Exhibition Project is a web application that enables users to search, filter, and curate artworks from multiple museum APIs. Users can create personalized exhibitions with a responsive, mobile-friendly interface.

## Website

[Your Exhibition Website](https://yourexhibition.netlify.app)

![Your Exhibition Website Preview](https://github.com/user-attachments/assets/6ee91997-cd54-433a-a1eb-9d9276017705)


### Features
- **Search**: Fetch artworks from Harvard Art Museums and Rijksmuseum APIs
- **Filter & Sort**: Filter by source and sort artworks by title
- **Curate Exhibition**: Add and remove artworks from a personalized collection
- **Error Handling**: Uses Winston for clean error logging
- **Testing**: Unit tests with Jest

### Tech Stack
- **Frontend**: Next.js, React.js, Material-UI
- **State Management**: React Hooks
- **Error Handling**: Winston
- **Testing**: Jest
- **Hosting**: Netlify

### APIs Used:
1- Harvard Art Museums
2- Rijksmuseum

## Getting Started

### Prerequisites

Node.js (version 14+)
npm or yarn
Clone the Repository

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

