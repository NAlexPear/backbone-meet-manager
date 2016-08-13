// Libraries and Modules
import Backbone from "backbone";

// Internal Components
import UserModel from "../models/user";

var UserCollection = Backbone.Collection.extend( {
    "model": UserModel,
    "url": "http://localhost:3000/api/v1/users"
} );

export default UserCollection;
