// Libraries and Modules
import Backbone from "backbone";
import _ from "underscore";

// Internal Components
import template from "text!template/components/meet-list-item.html";

var MeetListItemView = Backbone.View.extend( {
    "tagName": "tr",
    "template": _.template( template ),
    "events": {
        "click button.delete": function deleteMeet( event ){
            event.preventDefault();

            this.model.trigger( "remove:meet", {
                "view": this,
                "model": this.model
            } );
        }
    },
    "initialize": function initialize( data ){
        this.model = data.model;

        this.render();
    },
    "render": function render(){
        this.$el.html( this.template( {
            "name": this.model.get( "name" ),
            "date": this.model.get( "date" ).split( "T" )[0],
        } ) );

        return this;
    },
    "appendToTargetList": function appendToTargetList( $tbody ){
        $tbody.append( this.$el );
    }
} );

export default MeetListItemView;
