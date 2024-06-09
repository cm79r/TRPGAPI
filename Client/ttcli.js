/*
Table Top Client Code
This is just a reference doc in the form of some snipets and not an actual client.
*/

class TTCLI {
    constructor(id, command){
        // construct JSON to send to API.
        //Identifier assigned by API
        this._id = id || 0;

        //command made up of mixed string ID, action as lowercase string, X Y pairs for where the action should happen.
        this._commmand = command || [this._id, "string", [0,0]];

        // this may not be needed either.
        this._commandSent = false;

        //A few methods down here
        this.sendCommand = function(){           
            // Creating a XHR object
            var xhr = new XMLHttpRequest();
            var url = endpointhere;
       
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
 
            // Converting JSON data to string
            var data = JSON.stringify(this._commmand);
 
            // Sending data with the request
            xhr.send(data);
        }
    }
};