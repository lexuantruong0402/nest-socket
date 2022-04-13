# NestJs chat example

A app create by NestJs, Socket.io, MongoDB, TypeOrm

## Authors

- [@truonglx](lexuantruong0402@gmail.com)

## API Reference

#### Get all rooms

```http
  GET /api/rooms
```

| Parameter | Type     | Description                           |
| :-------- | :------- | :------------------------------------ |
| `api_key` | `string` | get all Rooms and history of messages |

#### Create new api

`src/controller/room.controller.ts`

#### Gateway

check `src/gateway/chat.gateway.ts`.
Gateway have 3 message

`msgToServer`: send message from client to server. Write this message into FE file.

`msgToClient`: send message from server to client. Write this message into gateway BE file.

`joinRoom`: create and join a room. Write this messages into FE file. BE side request join room with: `client.join(room)`

#### MongoDB

Save room and history of chat. create database by Docker

## Installation

Go to root folder

#### Run up database

Create MongoDB with docker. If you want to change user, password of db. Please check: `docker-compose-files/initdbs.js` then change data in .env file

```bash
  docker-compose up
```

#### Install package then run the project

```bash
  npm install
  npm run start
```

Go to `localhost:3000`.

#### Port of project

If you want to change default port. Please check: `src/main.ts`

#### Client side

Edit HTML, please check `public/index.html`

## Acknowledgements

- [NestJs](https://nestjs.com/)
- [Socket IO](https://socket.io/)
- [TypeOrm](https://typeorm.io/)
