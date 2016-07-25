// Libraries and Modules
import Backbone from "backbone";

var UserModel = Backbone.Model.extend( {
    "defaults": {
        "username": "",
        "email": "",
        "password": ""
    }
} );

export default UserModel;
