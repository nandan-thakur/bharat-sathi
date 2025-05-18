# BHARAT-SATHI

A Next.js application for accessing and visualizing data from data.gov.in APIs.

## Overview

BHARAT-SATHI is a web application that provides an intuitive interface to browse, search, and visualize government data from data.gov.in. The application allows users to explore both state-wise and central government datasets, with powerful filtering capabilities and detailed resource views.

## Features

- **Resource Browser**: Explore 10,000+ datasets from data.gov.in
- **Advanced Filtering**: Filter resources by organization type, sectors, sources, and more
- **Search Functionality**: Find specific datasets using keyword search
- **Data Visualization**: View data in tables with sorting capabilities
- **API Integration**: Fetch live data using your data.gov.in API key
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js 15.3.2
- **UI Framework**: React 19.0.0
- **Styling**: Tailwind CSS 4.0
- **Data Fetching**: Server Components + Client Components

## Project Structure

```
BHARAT-SATHI/
├── .next/                  # Next.js build output
├── data/                   # Data files
│   └── data.json           # Resource metadata
├── node_modules/           # Dependencies
├── public/                 # Static assets
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── layout.js       # Root layout
│   │   ├── page.js         # Home page
│   │   ├── state-data/     # State data routes
│   │   ├── central-data/   # Central data routes
│   │   └── resources/      # Resources browser
│   ├── components/         # React components
│   ├── lib/                # Utility functions
│   └── hooks/              # Custom React hooks
├── .gitignore              # Git ignore file
├── jsconfig.json           # JavaScript configuration
├── next.config.mjs         # Next.js configuration
├── package.json            # Project metadata
├── package-lock.json       # Dependency lock file
├── postcss.config.mjs      # PostCSS configuration
└── README.md               # Project documentation
```

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nandan-thakur/bharat-sathi.git
   cd bharat-sathi
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a data folder and add your data.json file:
   ```bash
   mkdir -p data
   # Add your data.json file to the data folder
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Browsing Resources

Navigate to the Resources page to browse all available datasets. Use the filters on the left sidebar to narrow down results by organization type, sectors, or sources.

### Viewing Resource Details

Click on any resource to view its detailed information. You can enter your data.gov.in API key to fetch the actual data for the selected resource.

### State and Central Data

The State Data and Central Data sections provide specialized views for state-wise and central government data respectively.

## API Integration

To use the data.gov.in API:

1. Register for an API key at [data.gov.in](https://data.gov.in)
2. Enter your API key in the resource detail page
3. Click "Fetch Data" to retrieve the latest information

## Troubleshooting

### Common Issues

- **Filter display problems**: If filters show values like `['Central']` with brackets, try clearing browser cache
- **API calls failing**: Verify your API key is valid and has proper permissions
- **Build errors with dynamic routes**: Make sure to use `dynamicParams: true` in your route configuration

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [data.gov.in](https://data.gov.in) for providing the API and datasets
- [Next.js](https://nextjs.org/) for the React framework
- [Tailwind CSS](https://tailwindcss.com/) for the styling