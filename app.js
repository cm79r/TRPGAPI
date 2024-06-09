const port = process.env.PORT || 3000;
const host = ("RENDER" in process.env) ? `0.0.0.0` : `localhost`;

const fastify = require('fastify')({
  logger: true
})

const game = new Sidebar()

fastify.get('/', function (request, reply) {
  reply.type('text/html').send(html)
})

fastify.post('/', function (request, reply) {
  var responsedata = request.body
  responsedata += " + 1"
  reply.type('text/html').send(responsedata)
})

fastify.listen({host: host, port: port }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})

const html = "Test Complete"

class Sidebar{
  constructor(){
    this._clients = [];
    this._gameState = this._gameState || new GameState()

    this.createUID = function() {
      return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
      );
    };


  }
};

class GameState {
  constructor(){
    this._mapID = 0
    this._mapName = "Map Name"
    this._mapImahe = "Image Url Here"
    this._pawns = [ , ]
    this._type = "gamestate"
  }
};

class Pawn {
  constructor(){
    //UID of client that controls this Pawn
    this._controllerID = 10000000-1000-4000-8000-100000000000
    
    //Pawn's Image
    this._image = "Image Url Here"
    //Pawns location
    this._x
    this._y

    //Set Data Type for client
    this._type = "pawn"
  }
};
