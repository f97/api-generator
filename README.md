# Api Generator
CLI Tool generator REST API  using NodeJS, Express and Mongoose.

## How to build project:

### Installation

```bash
npm install -g grapi
```

This will install grapit globally on your system.

### Basic Usages

#### Create `config.json` on project folder.

Example `config.json`:

```json
{
    "appName":"Demo",
    "mongoURL": "mongodb://Test123:Test123@ds145299.mlab.com:45299/dbtest123",
    "port": 2308,
    "authenticate": true,
    "posts": [
        {"id": "Number", "title": "String", "author": "String"}
    ],
    "comments": [ 
        {"body": "String", "postId": "Number"}
    ]
}
```

#### Create a New Rest API

On current folder, open terminal and run 

```bash
grapi new
```

Basic Directory Structure
```
- api
|-- controllers
|-- models
|-- routes
- .gitignore
- package.json
- server.js
```

Running API:

```bash
cd Demo #appName
npm install
npm start
```

Start your API at http://localhost:2308/ *(Your PORT config)*

Documents API at http://localhost:2308/api-docs

To Get help about this CLI

```
grapi --help
```

Happy Coding..!!