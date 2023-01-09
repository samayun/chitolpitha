<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="docs/terminal.gif" width="200" alt="Nest Logo" /></a>
</p>


## Description

2023 Goal project

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```



```graphql
mutation {
  signup(signupUserInput: {name: "SAMAYUN", email: "samayun@gmail.com", password: "123456"}) {
     accessToken
  }
}

query {
  signin(signinUserInput: { email: "samayun@gmail.com", password: "123456"}) {
     accessToken
  }
}


```