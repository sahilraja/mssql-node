# Introduction
This is a starter project to quickly get up and running with express js project using typescript.

# Install mongodb in local system
```
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/#install-mongodb-community-edition-using-deb-packages 

mongodb version: >=3.4.24
```

# Setup
```sh
git clone git@git.webileapps.com:js/appx-api.git

"Install Packages"
    npm install

"Run Typescript using"
    ./node_modules/typescript/bin/tsc


Open Visual Studio Code and Run (F5)

# Adding routers

A sample router for `users` is provided by default and mounted at `/users`.
```typescript
import * as usersRouter from "./users/router";
...

app.use('/users', usersRouter);


"Run Node Server using file in current working directory"

    node main.js

"Server Running on PORT 3000"
    
    Run in browser 


    http://localhost:3000/

"Response" 

    HELLO APIS ........!


```

