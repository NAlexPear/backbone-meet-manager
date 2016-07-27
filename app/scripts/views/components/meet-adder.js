// Libraries and Modules
import Backbone from "backbone";
import _ from "underscore";
import $ from "jquery";

// Backbone Components
import MeetModel from "../../models/meet";

// Internal Components
import template from "text!template/components/meet-adder.html";

var MeetAdderView = Backbone.View.extend( {
    "className": "crate meet-adder",
    "template": _.template( template ),
    "events": {
        "submit form.add-meet": function submitMeet( event ){
            var model = new MeetModel( {
                "name": $( ".name" ).val(),
                "date": $( ".date" ).val()
            } );

            event.preventDefault();

            this.collection.add( model );

            model.save( {}, {
                "success": function triggerAddMeetEvent(){
                    model.trigger( "list:meet", {
                        "model": model
                    } );
                }
            } );
        }
    },
    "initialize": function initialize( data ){
        this.collection = data.collection;

        this.render();
    },
    "render": function render(){
        this.$el.html( this.template() );

        return this;
    },
    "addtoTarget": function addAdderToTarget( $target ){
        $target.append( this.$el );
    }
} );

export default MeetAdderView;
