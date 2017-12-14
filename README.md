# Vue Chat client using websockets
---
> Made with [Vue.js](https://vuejs.org/), [Vuex](https://vuex.vuejs.org/en/) and [Buefy](https://buefy.github.io)
>
> This is the client, use it with this server: https://github.com/tobiasbeuving/node-websocket-chatserver 
---

## Features

* Connect supplying a username without a roundtrip, other connected users get notified
* Chatroom: a 2D space where users are represented by an avatar (profile picture)
* Create and delete chatrooms
* Move from chatroom to chatroom
* User list 
* Move avatar across the chatroom: click anywhere in the chatroom and the avatar moves (animates) to that position 
* Send and receive messages: messages are displayed in textballoons near the avatar in the chatroom, and also logged in a messagewindow 
* Whisper mode: click on another user to whisper a message in private
* Change avatar: drop an image < 200kb directly from your system on your avatar to change it. The image gets sent to the server who in turn sends it to the other users
* Connection indicator
* Server side ping pong (so the server can verify if connections to the clients are still alive)
* (custom) Client side ping pong (so the client can verify if it is still connected to the server)
* Disconnect and notify other users

##### install dependencies
``` bash
npm install
```
##### serve with hot reload at localhost:8080
``` bash
npm run dev
```
##### build for production with minification
``` bash
npm run build
```
##### build for production and view the bundle analyzer report
``` bash
npm run build --report
```
