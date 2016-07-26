// Libraries and Modules
import Backbone from "backbone";

var MeetModel = Backbone.Model.extend( {
    "defaults": {
        "name": "",
        "adminId": 0,
        "date": "1975-01-01"
    }
} );

export default MeetModel;
