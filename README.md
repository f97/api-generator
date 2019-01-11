# Api Generator
RESTful API generator using NodeJS, Express and Mongoose.

## CHANGLE LOG: 

### Version 0.0.1

 - Auto generator api with simple `config.json` *(demo)*.
 - Demo api in Demo folder.

### Version 0.0.2

 - `config.json` update type model.
 - `config.json` add port.
 - Add document API.

## How to build project:

### Clone the repo

```bash
$ git clone https://github.com/f97/api-generator.git
$ cd api-generator
```

### Install nodejs
```
Follow instructions to install nodejs and npm.
```
### Edit `config.json` file

Example `config.json`: 

```json
{
    "appName":"Demo",
    "mongoURL": "mongodb://Test123:Test123@ds145299.mlab.com:45299/dbtest123",
    "port": 2308,
    "posts": [
        {"id": "Number", "title": "String", "author": "String"}
    ],
    "comments": [ 
        {"body": "String", "postId": "Number"}
    ]
}
```

### Run project

```bash
npm start
```

### Try api demo:

```bash
cd Demo #appName
npm install
npm start
```

Go to the browser with url : [localhost:2308](http://localhost:2308)

Have fun