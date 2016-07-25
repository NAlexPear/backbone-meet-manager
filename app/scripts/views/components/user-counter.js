// Libraries and Modules
import Backbone from "backbone";
import _ from "underscore";
import $ from "jquery";

// Backbone Components
import UserCollection from "../../collections/users";
import UserModel from "../../models/user";
import UserListItemView from "./user-list-item";

// Internal Components
import template from "text!template/components/user-counter.html";

var UserCounterView = Backbone.View.extend( {
    "className": "user-counter",
    "template": _.template( template ),
    "events": {
        "submit form.add-user": function submitUser( event ){
            var model = new UserModel( {
                "name": $( ".name" ).val(),
                "gender": $( ".gender" ).val()
            } );

            event.preventDefault();

            this.collection.add( model );
            this.listUser( model );
        }
    },
    "initialize": function initialize(){
        this.collection = new UserCollection();

        this.listenTo(
            this.collection,
            "remove:user",
            function handleRemoveUserEvent( data ){
                data.view.remove();
                data.model.destroy( {
                    "wait": true
                } );
            }
        );

        this.listenTo(
            this.collection,
            "list:user",
            ( data ) => this.listUser( data.model )
        );

        this.render();
    },
    "render": function render(){
        this.$el.html( this.template() );

        this.listAllUsers();

        return this;
    },
    "listAllUsers": function listUsers(){
        this.collection.fetch( {
            "success": function handleCollection( collection ){
                _( collection.models ).each(
                    ( user ) => user.trigger( "list:user", {
                        "model": user
                    } )
                );
            }
        } );
    },
    "listUser": function listUserByModel( model ){
        var listItem = new UserListItemView( {
            "model": model
        } );

        model.save();

        listItem.appendToTargetList(
            this.$el.find( "tbody.user-list" )
        );
    }
} );

export default UserCounterView;
