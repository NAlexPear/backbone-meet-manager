// Libraries and Modules
import Epoxy from "epoxy";
import _ from "underscore";
import $ from "jquery";
// import bcrypt from "bcrypt";

// Backbone Components
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
        this.viewModel = new Epoxy.Model( {
            "isNewUser": false
        } );

        this.listenTo(
            this.viewModel,
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
        var viewModel = this.viewModel;

        user.save( {}, {
            "success": function successfullyAddUser(){
                viewModel.trigger( "remove:login" );
            }
        } );
    },
    "validateLogin": function validateLogin( user ){
        var username = user.get( "username" );
        var password = user.get( "password" );
        var viewModel = this.viewModel;

        $.ajax( {
            "type": "GET",
            "url": "http://localhost:3000/test/login",
            "dataType": "json",
            "headers": {
                "Authorization": "Basic " + btoa( `${username}:${password}` )
            },
            "success": ( data ) => viewModel.trigger( "remove:login", data )
        } );
    }
} );

export default LoginView;
