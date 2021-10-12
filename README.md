# Introduction
This is a starter project to quickly get up and running with express js project using typescript.

# Install mssql in local system
```
https://docs.microsoft.com/en-us/sql/linux/quickstart-install-connect-ubuntu?view=sql-server-ver15

Run ms server in local system

```

# Install nodejs stable local system
```
https://www.geeksforgeeks.org/installation-of-node-js-on-linux/
```



# Setup
```sh
git clone https://github.com/sahilraja/mssql-node.git

"Install Packages"
    npm install

"Run Typescript using"
    ./node_modules/typescript/bin/tsc


Open Visual Studio Code and Run (F5)

# Adding routers

A sample router for `surveys` is provided by default and mounted at `/surveys`.
```typescript
import * as surveysRouter from "./surveys/router";
...

app.use('/surveys', surveysRouter);


"Run Node Server using file in current working directory"

    node main.js

"Server Running on PORT 3000"
    
    Run in browser 


    http://localhost:3000/

"Response" 

    HELLO APIS ........!


```

# Code Structure
```sh


"main.ts"
    node server intialize file

"api.ts"
    Multiple Api Routers File
    
"app.ts"
    npm modules defination file

"database.ts"
    Database Connection File

"surveys"
    module.ts -> where specific module db queries or functions defined
    survey-model.ts -> where specific table/model  defined
    router.ts -> where specific module routes defined

"utils"
    where custom Functions defined

```