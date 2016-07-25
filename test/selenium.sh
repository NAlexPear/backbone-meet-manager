#!/usr/bin/env bash

iflag=false
tflag=false
runner='dot'

while getopts "itnv" option
do
    case $option in
        i  ) iflag=true;;
        t  ) tflag=true;;
        n  ) runner='nyan';;
        v  ) runner='spec';;
        \? ) echo "Unknown option: -$OPTARG" >&2; exit 1;;
    esac
done


if $iflag; then
    echo "Enter the URL of the site you would like to test (http://localhost:9000): "

    read URL

    echo "Enter the browser you would like to use for testing (chrome/phantomjs): "

    read BROWSER

    if [ -z "$URL" ]; then
        URL="http://develop.pivot.local"
    fi

    if [ -z "$BROWSER" ]; then
        BROWSER="phantomjs"
    fi
else
    if $tflag; then
        echo "Getting target and browser from testing environment"
    else
        URL="http://localhost:9000"
        BROWSER="phantomjs"
    fi
fi

export env TARGET=$URL
export env BROWSER=$BROWSER

echo "Running tests on $TARGET with $BROWSER"


grunt babel:test && mocha test/run/runner.js -c --harmony -u bdd -R $runner -s 10000 -t 40000
