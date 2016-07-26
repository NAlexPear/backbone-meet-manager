// Libraries and Modules
import Backbone from "backbone";

// Internal Components
import MeetModel from "../models/meet";

var MeetCollection = Backbone.Collection.extend( {
    "model": MeetModel,
    "url": "http://localhost:3000/api/v1/meets"
} );

export default MeetCollection;
