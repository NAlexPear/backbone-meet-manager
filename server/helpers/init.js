/* eslint-disable no-process-env */
"use strict";

var pg = require( "pg" );
var path = require( "path" );
var configUrl = require(
    path.join(
        __dirname.split( "server" )[0],
        "conf",
        "db",
        "config.json"
    )
).url;
var connectionString = process.env.DATABASE_URL || configUrl;
var client = new pg.Client( connectionString );
var query;

client.connect();

query = client.query(
            "CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;" +
            "CREATE TABLE IF NOT EXISTS users(" +
                "id             SERIAL          PRIMARY KEY," +
                "username       CITEXT          not null," +
                "email          CITEXT                  ," +
                "password       TEXT            not null" +
            ");" +
            "CREATE TABLE IF NOT EXISTS meets(" +
                "id             SERIAL          PRIMARY KEY," +
                "name           TEXT            not null," +
                "date           DATE            not null," +
                "adminId        SMALLINT        not null" +
            ");"
        );

query.on( "end", () => client.end() );
