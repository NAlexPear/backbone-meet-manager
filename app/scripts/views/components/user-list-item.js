// Libraries and Modules
import Backbone from "backbone";
import _ from "underscore";

// Internal Components
import template from "text!template/components/user-list-item.html";

var UserCounterView = Backbone.View.extend( {
    "tagName": "tr",
    "template": _.template( template ),
    "events": {
        "click button.delete": function deleteUser( event ){
            event.preventDefault();

            this.model.trigger( "remove:user", {
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
            "gender": this.model.get( "gender" )
        } ) );

        return this;
    },
    "appendToTargetList": function appendToTargetList( $tbody ){
        $tbody.append( this.$el );
    }
} );

export default UserCounterView;
