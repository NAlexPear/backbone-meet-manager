// Libraries and Modules
import Backbone from "backbone";

// Internal Components
import MeetModel from "../models/meet";

/* eslint-disable no-console */
var MeetCollection = Backbone.Collection.extend( {
    "initialize": function initialize( data = {} ){
        this.id = data.id;
    },
    "model": MeetModel,
    "url": function createUrl(){
        var root = "http://localhost:3000/api/v1/meets";

        return this.id ? `${root}/${this.id}` : root;
    }
} );

export default MeetCollection;
