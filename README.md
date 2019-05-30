[![10.16.0](https://img.shields.io/node/v/npm.svg?style=flat)](http://nodejs.org/download/)

# Andromeda Backend Server

## Contents

- [Introduction](#intro)
- [Endpoints](#ep)

<a name = "intro"></a>
## Introduction 
This repository provides backend endpoints, services and data handling for the Andromeda project - a series of IoT enabled devices delivering smart irrigation and agriculture to farms. The server currently exists on `Heroku` at `morning-fjord-65576.herokuapp.com` and will be referred to as **andromeda-host**. 

### Installation & Running 
Once in the root directory, run the following commands to install the modules encased in the `packages.json` file and running the server:

``` bash
npm init
node backend/src/index.js
```

For development, navigate to `backend/src/` and utilize `nodemon` (can be installed via `npm install nodemon` - more information available at https://nodemon.io/). The `packages.json` also outlines the currently compatible versions of the modules required, as well as the latest version of node.js - which can be downloaded from https://nodejs.org/en/.

### File directory
```
Andromeda Backend
|
+-- backend
|  +-- src
|    +-- controllers
|      +-- sprayheadControllers.js
|    +-- models
|      +-- sprayhead.js
|    +-- routes
|      +-- api.js
|    +-- index.js
+-- package.json
|
+-- README.md
```
<a name = "ep"></a>
## Endpoints

Data is stored in a NoSQL, document-based format using MongoDB with the following schema:

```javascript
{
    latitude: { type: Number },
    longitude: { type: Number },
    state: { type: Boolean, default: false },
    created: { type: Date, default: Date.now },
    node_id: { type: String }
}
```

Information such as `_id`, `created` and `state` are automatically generated and do not need to be provided by the user. 

### GET

The following requests will make use of the url format `andromeda-host.com/api/sprayheads/param-name/:param-value` (except for one which will not specify the `param-name`. `param-name` will specify things such as latitude, longitude, state, and additional information in the future. 

#### GET by NODE_ID

`andromeda-host.com/api/sprayheads/:id` where `id` is a parameter the client can pass in.

#### GET by Latitude

`andromeda-host.com/api/sprayheads/lat/:lat`

#### GET by Longitude

`andromeda-host.com/api/sprayheads/long/:long`

#### GET all

`andromeda-host.com/api/sprayheads/`

### POST

To post a complete data object, we use the following endpoint

`andromeda-host.com/api/sprayheads` 

with the post body in JSON format

```json
{
     "lat": "<lat-string>",
     "long": "<long-string>",
     "nodeid": "<device-based ID>"
}
```

Additional attributes will be added as the overall system grows. The default generated values do not need to be set by the client. 

### PUT/UPDATE/DELETE

Coming soon...

