// Libraries and Modules
import Epoxy from "epoxy";
import _ from "underscore";
import $ from "jquery";

// Backbone Components
import UserCollection from "../../collections/users";
import UserModel from "../../models/user";

// Internal Components
import template from "text!template/components/login.html";

var LoginView = Epoxy.View.extend( {
    "className": "login crate",
    "template": _.template( template ),
    "bindings": {
        ".email": "toggle:isNewUser",
        ".label": "text:prompt",
        ".prompt": "attr:{'value':prompt}",
        "button.alt-prompt": "text:altPrompt"
    },
    "computeds": {
        "prompt": {
            "deps": [ "isNewUser" ],
            "get": function getPrompt( isNewUser ){
                return isNewUser ? "Sign Up" : "Log In";
            }
        },
        "altPrompt": {
            "deps": [ "isNewUser" ],
            "get": function getAlternatePrompt( isNewUser ){
                return isNewUser ? "Login" : "Sign Up";
            }
        }
    },
    "events": {
        "click button.alt-prompt": function handleAlternateButtonClick( event ){
            event.preventDefault();

            this.toggleNewUser();
        },
        "click input.prompt": function handleFormSubmission( event ){
            var model = new UserModel( {
                "username": $( ".username" ).val(),
                "password": $( ".password" ).val()
            } );

            event.preventDefault();

            if( this.viewModel.get( "isNewUser" ) ){
                model.set( "email", $( ".email" ).val() );
                this.addNewUser( model );
            }
            else{
                this.validateLogin( model );
            }
        }
    },
    "initialize": function initialize(){
        this.collection = new UserCollection();
        this.collection.fetch();

        this.viewModel = new Epoxy.Model( {
            "isNewUser": false
        } );

        this.listenTo(
            this.collection,
            "remove:login",
            this.remove
        );

        this.render();
    },
    "render": function render(){
        this.$el.html( this.template() );

        return this;
    },
    "toggleNewUser": function toggleNewUser(){
        var newUserState = this.viewModel.get( "isNewUser" );

        this.viewModel.set( "isNewUser", !newUserState );
    },
    "addNewUser": function addNewUser( user ){
        this.collection.add( user );

        user.save( {}, {
            "success": function successfullyAddUser(){
                user.trigger( "remove:login" );
            }
        } );
    },
    "validateLogin": function validateLogin( data ){
        var users = this.collection.models;
        var formData = {
            "username": data.get( "username" ),
            "password": data.get( "password" )
        };

        _( users ).each(
            ( user ) => {
                var userData = {
                    "username": user.get( "username" ),
                    "password": user.get( "password" )
                };

                if( _( formData ).isEqual( userData ) ){
                    user.trigger( "remove:login" );
                }
            }
        );
    }
} );

export default LoginView;
