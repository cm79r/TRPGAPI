/*
Table Top Client Code
This is just a reference doc in the form of snipet(s) and not an actual client.
*/

class Client {
    constructor(pawn, endpoint){
        this._id = "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c => (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16) );
        this._pawn = pawn || "assign";
        this._command = ""

        this.sendCommand = function(command){           
            // Creating a XHR object
            var xhr = new XMLHttpRequest();
            var url = endpoint;
       
            // open a connection
            xhr.open("POST", url, true);
 
            // Set the request header i.e. which type of content you are sending
            xhr.setRequestHeader("Content-Type", "application/json");
 
            // Create a state change callback
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                     console.log(xhr.responseText);
                }
            };
 
            
            var data = {};
            data._id = this._id
            data._command = command


            // Converting JSON data to string
 
            // Sending data with the request
            xhr.send(data);
        }

        this.connect = function(){
            this.sendCommand("connect")
        }
    }
};