// Libraries and Modules
import Backbone from "backbone";

var UserModel = Backbone.Model.extend( {
    "defaults": {
        "username": "",
        "email": "",
        "password": ""
    },
    "url": "http://localhost:3000/api/v1/users"
} );

export default UserModel;
