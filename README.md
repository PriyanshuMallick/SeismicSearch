# Seismic Search

<!-- ![Seismic Search](link-to-image) -->

This repository contains the Seismic Search, an Earthquake Search App, a project built to learn how Elasticsearch works and how to use it in conjunction with a Node.js server to route client requests. The app enables users to search for earthquake data stored in Elasticsearch and retrieve earthquakes that match their specified criteria.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Credits](#credits)
- [License](#license)

## Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/PriyanshuMallick/SeismicSearch
   ```

2. Navigate to the project directory:

   ```shell
   cd SeismicSearch
   ```

3. Install the dependencies for the client side:

   ```shell
   cd ./client
   npm install
   ```

4. Install the dependencies for the server side:

   ```shell
   cd ../server
   npm install
   ```

## Usage

1. Create an API key to connect with Elasticsearch

   - You can do this by either running `generateApiKeys()` or `runMeToCreateAndLogApikey()` in `server/src/create_es_api_key.ts`

   - Or by creating an API Key with Kibana Interface

2. Create a `.env` file in the server directory referring `.env.example` located in the same directory with your data.

3. Start the server:

   ```shell
   cd server
   npm start
   ```

4. Open a browser and go to the following link

   ```
   http://localhost:3001/ingest_data/[your_index]
   ```

   Example:

   ```
   http://localhost:3001/ingest_data/earthquakes
   ```

   Assuming your node server is running on `http://localhost:3001`

5. Start the client:

   ```shell
   cd ../client
   npm start
   ```

6. Access the Seismic Search app in your browser at `http://localhost:3000`

## Features

- Search earthquakes based on type, magnitude, location, and date range.
- Sort the search results by ascending or descending order of magnitude.
- View detailed information about each earthquake in a user-friendly format.

## Credits

This project was inspired by Lisa Jung's ["Mini Beginner's Crash Course to Elasticsearch and Kibana"](https://www.youtube.com/watch?v=tViR2tehjaA&list=PL_mJOmq4zsHbcdoeAwNWuhEWwDARMMBta&index=23) Season 2 playlist on YouTube. The tutorial provided a foundation for understanding Elasticsearch and implementing the search functionality in this app.

## License

This project is licensed under the MIT License. Feel free to modify and use the code as per the terms of the license.
