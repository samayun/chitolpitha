```zsh
        __ _   _ ___ _____ ___  _         __ ___ _____ _          _    
       / ___| | | |_ _|_   _/ _ \| |     |  _ \_ _|_   _| | | |  / \   
      | |   | |_| || |  | || | | | |     | |_) | |  | | | |_| | / _ \  
      | |___|  _  || |  | || |_| | |___  |  __/| |  | | |  _  |/ ___ \ 
       \____|_| |_|___| |_| \___/|_____| |_|  |___| |_| |_| |_/_/   \_\

```
<!-- <p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="docs/terminal.gif" width="400" height="220" alt="Nest Logo" /></a>
</p>
 -->

## Description
Chitolpitha is a scalable, reusable boilerplate which helps to build SASS Application

## Commands and Installation

```bash

cp .env.example .env

sudo make build

sudo make logs

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

```bash
curl http://localhost:2023/media -F 'file=@./docs/terminal.gif' -F 'name=test'

```