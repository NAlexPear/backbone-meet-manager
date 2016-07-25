// Libraries and Modules
import Backbone from "backbone";

var UserModel = Backbone.Model.extend( {
    "defaults": {
        "name": "unknown",
        "gender": "other"
    }
} );

export default UserModel;
