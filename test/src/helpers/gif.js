// Libraries
import { exec } from "child_process";

var date = new Date();
var day = date.toISOString().split( "T" )[0];
var time = date.toTimeString().split( " " )[0].split( ":" ).join( "" );

export default function createScreenshotGif(){
    exec( `convert -delay 50 -loop 0 ${__dirname}/screenshots/start*.png ${__dirname}/gifs/${day}_${time}.gif` );
}
