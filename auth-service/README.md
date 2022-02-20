# Auth Service

This is a REST service which provides basic authentication.

## Disclaimer

I make no guarantees about the security of this service. Please don't use it in a production app. I built this for fun (and school).

## Design

Auth Service provides JWT-based authentication for users. 

Users can create accounts by specifying their email and password. If the account is valid (ie there is not a preexisting account with the same email), then Auth Service will create a record for the user.

User passwords are not stored directly, their salted hashes (SHA512) are stored instead. When the user attempts to log back in, the password they provide is salted and hashed, and compared to their stored version. If they match, then the user is authenticated.

The session tokens that Auth Service generates are JSON Web Tokens (JWTs). Auth Service generates and signs them and gives them to the client if their credentials are valid. Peer services can check the validity of JWTs provided by Auth Service by using the Auth Service API. JWTs are neat because we can let an untrusted client handle them, and we can be reasonably sure that they won't be able to tamper with them because ... math.

### Components
Auth Service consists of:
* an Express.js app which provides a REST API for this service
* a backend MongoDB database which provides persistence for the Service.

Clients should not interact with the Mongo DB directly. But do whatever you want. I'm a README, not a cop.

### API

The API provides 3 endpoints:

* `POST /register` - creates a new user. Returns a session token.
* `POST /login` - accepts user credentials. If they're valid, creates a session token for the user.
* `POST /verify_token` - accepts a session token and determines whether it's valid.

`/register` and `/login` can be called by untrusted clients. Typically, you'd only want to call `/verify_token` from a trusted client (eg. your backend service).

Note: See [tests/manual_test.http](tests/manual_test.http) for example requests.

### Example interaction with this API

In this example, a user is interacting with an app called "PetsNStuff". PetsNStuff is run as a separate service from Auth Service.

1. A new user is directed to a "Register for an account" page in PetsNStuff, the form in that page sends a request to `POST /register`. The response returns a session token which the user stores in their browser.
2. That user requests an authorized resource in PetsNStuff. PetsNStuff will require that the user's request contains their session token, then PetsNStuff sends the session token to `POST /verify_token`, if the token is valid, then PetsNStuff allows the user to access it. If the token is invalid or missing, then PetsNStuff can redirect the user to a login page.

If you want a more real example, see the React app in frontend/ in this repo.

## Set up

There are two options for running Auth Service. You can run Auth Service in your native OS, or you can run it in Docker. If you're familiar with Docker, this is the easier route since you don't need to install Nodejs and MongoDB. If you're not familiar with Docker, and you don't want to be bothered to learn about it, you can do the "Native" setup.

### Native

Prerequisites:
* Nodejs (I developed this with v16.13.2)
* MongoDB

Steps:
1. clone this repo
2. cd into this dir
3. Start a MongoDb server
4. Update `MONGODB_URI` in the `.env` file to match your MongoDb server
5. run `npm install`
6. run `npm run start`

Auth service will be available at http://localhost:4000

To stop it: ctrl-c

### Docker

Prerequisites:
* Docker

Steps:
1. clone this repo
2. cd into this dir
3. `docker-compose up`

The initial `up` will take a while since Docker needs to prepare the Mongo and node containers. Subsequent `up`'s will be a lot faster.

Auth service will be available at http://localhost:4000

To stop it: ctrl-c

To fully remove the container (which will delete the mongodb db and any users you've created): `docker-compose rm`

## Citations

* https://www.section.io/engineering-education/how-to-build-authentication-api-with-jwt-token-in-nodejs/ 
* https://www.loginradius.com/blog/async/password-hashing-with-nodejs/