# Generative AI Journal System

## Overview
This project is a backend system for a Generative AI-powered journal application that allows users to create, modify, and manage journal entries. It leverages cutting-edge technologies to deliver a secure, efficient, and seamless journaling experience.

## Features
- **Generative AI with Gemini**: Provides intelligent text suggestions and allows users to generate or modify journal entries effortlessly.
- **JWT-Based Authentication**: Ensures secure and stateless user authentication and authorization.
- **Redis Caching**: Enhances performance with fast data caching.
- **MongoDB Atlas**: Utilizes a scalable cloud-based NoSQL database for reliable data storage.

## Technologies Used
- **Programming Language**: Java (Spring Boot)
- **Database**: MongoDB Atlas
- **Caching**: Redis
- **Authentication**: JWT (JSON Web Tokens)
- **AI Integration**: Gemini

## Getting Started
### Prerequisites
- Java Development Kit (JDK 11 or higher)
- Maven
- Redis installed locally or accessible via a server
- MongoDB Atlas account

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/gen-ai-journal.git
   cd gen-ai-journal
   ```
2. Configure environment variables:
   - Add the following environment variables in your IDE or system:
     ```
     WEATHER_API_KEY=<your_api_key>
     GOOGLE_CLIENT_ID=<your_client_id>
     GOOGLE_CLIENT_SECRET=<your_client_secret>
     REDIS_PASSWORD=<your_redis_password>
