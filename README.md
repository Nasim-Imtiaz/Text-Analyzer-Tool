<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

# Project Setup

Follow the steps below to set up and run the project locally using Docker.

## Prerequisites

- [Docker](https://www.docker.com/) installed
- [Docker Compose](https://docs.docker.com/compose/) installed

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/Nasim-Imtiaz/Text-Analyzer-Tool
   cd Text-Analyzer-Tool

2. **Create the `.env` file**

   Copy the example environment configuration and create your `.env` file:

   ```bash
   cp .env.example .env

 Update the `.env` file with your own configuration if necessary.

3. **Build and run the application with Docker Compose**

   ```bash
   docker-compose up -d --build
   ```

This will build the Docker images and start all services in detached mode.

4. **Access the application**

   The application should now be running and accessible at:

   ```
   http://localhost:<port>
   ```

   Replace `<port>` with the actual port specified in your `.env` or `docker-compose.yml` file.

### Quotes Endpoint

You can interact with quotes at:

   ```
   http://localhost:<port>/quotes
   ```

- View all quotes
- Add a new quote
- Update an existing quote
- Delete a quote

### API Endpoints
- `GET /quotes/word-count/:id` — Get word count of a specific quote
- `GET /quotes/character-count/:id` — Get character count of a specific quote
- `GET /quotes/sentence-count/:id` — Get sentence count of a specific quote
- `GET /quotes/paragraph-count/:id` — Get paragraph count of a specific quote
- `GET /quotes/longest-words/:id` — Get longest words in a specific quote
- `GET /quotes/analyze/:id` — Get full analysis of a specific quote

> Replace `:id` with the actual ID of the quote you want to analyze.

## Stopping the Application

To stop and remove the containers, run:

```bash
docker-compose down
```

---

## Troubleshooting

- Make sure Docker is running.
- Ensure the ports defined in `.env` or `docker-compose.yml` are not already in use.


## Home Screen Preview
<img src="https://i.postimg.cc/MKRPJfPZ/Screenshot-at-May-20-17-28-02.png">