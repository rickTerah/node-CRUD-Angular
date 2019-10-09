# Node CRUD Angular

> ### Node CRUD Angular. A simple project that shows CRUD in NODE JS, Authentication, Login.

# Getting started

- Clone this repo `https://github.com/Terahpatrick/node-CRUD-Angular.git`.
- `npm install` to install all required dependencies
- Install MongoDB Community Edition ([instructions](https://docs.mongodb.com/manual/installation/#tutorials)) and run it by executing `mongod`
- set an environment variable jwtPrivateKey `set jwtPrivateKey=something`
- `nodemon` to start the local server

# Code Overview

## Dependencies

- [express](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [express-jwt](https://github.com/auth0/express-jwt) - Middleware for validating JWTs for authentication
- [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to javascript 
- [mongoose-unique-validator](https://github.com/blakehaswell/mongoose-unique-validator) - For handling unique validation errors in Mongoose. Mongoose only handles validation at the document level, so a unique index across a collection will throw an exception at the driver level. The `mongoose-unique-validator` plugin helps us by formatting the error like a normal mongoose `ValidationError`.
- @hapi/joi
- lodash
- config
- nodemon
- multer
- jsonwebtoken
- bcrypt

## Application Structure

- `index.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also requires the routes and models we'll be using in the application.
- `config/` - This folder contains configuration for passport as well as a central location for configuration/environment variables.
- `routes/` - This folder contains the route definitions for our API.
- `models/` - This folder contains the schema definitions for our Mongoose models.
- `startup/` - This folder contains modules that are required in `index.js`.
- `controllers/` - This folder contains the logic to implement routes.
- `middleware/` - This folder contains defined middlewares.
- `images/` - This folder contains stored images.

## Error Handling

In `models` folder I have defined a schema that explain what the database expected as per every field, if this schema rule is defiled a message error will to send to the user. I have also used @hapi/joi to validate input.

## Authentication

Requests are authenticated using the `Authorization` header with a valid JWT. We define two express middlewares in `routes/auth.js` that can be used to authenticate requests. The `required` middleware configures the `express-jwt` middleware using our application's secret and will return a 401 status code if the request cannot be authenticated. The payload of the JWT can then be accessed from `req.payload` in the endpoint. The `optional` middleware configures the `express-jwt` in the same way as `required`, but will *not* return a 401 status code if the request cannot be authenticated.

