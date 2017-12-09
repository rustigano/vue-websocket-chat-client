export default class Room {
  constructor (id, creatorid, roomname, backgroundColor) {
    this.id = id
    this.creatorid = creatorid
    this.name = roomname
    this.users = []
    this.backgroundColor = backgroundColor
  }
}
