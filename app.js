const port = process.env.PORT || 3000;
const host = ("RENDER" in process.env) ? `0.0.0.0` : `localhost`;

const fastify = require('fastify')({
  logger: true
})

fastify.get('/', function (request, reply) {
  reply.type('text/html').send(html)
})

fastify.post('/', function (request, reply) {
  console.log(" ")
  console.log(" ")
  console.log(" ")
  console.log(request.body)
  console.log(" ")
  console.log(" ")
  console.log(" ")
  var rqbody = JSON.stringify(request.body)
  var responsedata = game.resolveRequest(rqbody)
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
    this._gameState = this._gameState || new GameState();
    this._queue = [];
    this._requests = 0;
    this._pawn = 1;

    this.createUID = function() {
      return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
      );
    };

    this.requestNumber = function(){
      this._requests ++;
      return this._requests;
    };

    this.resolveRequest = function(request){
      var response
      var temp = JSON.parse(request);
      this._requestID = this.requestNumber();
      this._id = temp._id || null;
      this._command = temp._command || "bad request";

      if(temp._command == "connect"){
        var pwn = new Pawn(this._pawn);
        this._gameState._pawns.push(pwn);
        var cli = new Client(this.createUID(), pwn);
        this._clients.push(cli);
        this._pawn ++;
        response = JSON.stringify(cli);
      }
      if(temp._command == "move"){
        console.log("move command");
        response = JSON.stringify(this._gameState);
      }

      return response;
    };

  }
};

class Client {
  constructor(id, pawn){
    this._id = id;
    this._pawn = pawn;
    this._type = "client";
  }
};

class Pawn {
  constructor(id){    
    this._id = id;
    //Pawn's Image
    this._image = "Image Url Here";
    //Pawns location
    this._x;
    this._y;

    //Set Data Type for client
    this._type = "pawn";
  }
};

class GameState {
  constructor(){
    this._mapID = 0;
    this._mapName = "Map Name";
    this._mapImahe = "Image Url Here";
    this._pawns = [ , ];
    this._type = "gamestate";
  }
};

const game = new Sidebar();