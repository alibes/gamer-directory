Gamer Directory API

- Overview

This project is a Gamer Directory API that allows users to manage gamers, their geographic locations, the games they play, and their skill levels (INVINCIBLE, PRO, N00B). The API includes:

Linking a gamer to a game

Searching for gamers based on level, game, and geography

Fetching all gamers at a specific level for a given game

REST API with full validation and security protections (SQL Injection, Input Validation)

Unit tests using Jest & Supertest

Swagger API documentation

- Tech Stack

Backend: Node.js, Express.js

Database: MySQL

Validation: Zod

Testing: Jest, Supertest

API Docs: Swagger

- Setup Instructions

1- Install Dependencies:

  npm install

2- Run the API:

npm run dev

- API Endpoints:

* Gamer Routes:

1- Method:POST | Endpoint:/gamers/addGamer  | Description:Add a new gamer
2- Method:GET | Endpoint:/gamers/getAllGamers  | Description:Fetch all gamers

* Game Routes:

1- Method:POST | Endpoint:/games/addGame | Description:Add a new game
2- Method:GET | Endpoint:/games/getAllGames | Description:Fetch all games


* Play Routes (Linking Gamers & Games):

1-Method:POST | Endpoint:/play/linkGamerToGame | Description:Link a gamer to a game with a skill level
2-Method:GET | Endpoint:/play/searchGamers?level=PRO&game=COD&geography=USA | Description:Search gamers by level, game, and geography
3-Method:GET | Endpoint:/play/getGamersByLevel/INVINCIBLE/game/COD | Description:Get all gamers at a specific level for a game


- Security & Validation

SQL Injection Protection: All queries use parameterized queries.

Input Validation: Implemented using Zod.

CORS Enabled: Allows frontend applications to securely access the API.


- Running Tests

To run unit tests:

npm test

To run an individual test file:

npm test -- tests/gamer.test.js


