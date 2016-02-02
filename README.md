# Monday

This is a very basic [Mondo](https://getmondo.co.uk) application using [Ionic](https://ionic.io).  
In addition to being very basic, it is a very quickly thrown together.  
So... no promises.

There are various issues with the current implementation. Most of which boil down
to the code not being elegant or working optimally. You'll notice a lot of redirects,
flickering, etc.  
But it gets the job done.

Also I currently do not refresh the tokens. This is the first thing that needs to
get fixed.

The current to-do list involves a more transaction information, daily/weekly/monthly
aggregations, some charts, and... not sure yet.

## Configuration

In order to get this to work, copy `www/js/config-sample.js` to `www/js/config.js`
and change the various options to match your Mondo developer account and development
environment.

## Running

Get [Ionic CLI](https://github.com/driftyco/ionic-cli) if you don't already have it.

The first time you'll want to run `npm install`, `bower install` and `ionic state restore` to
download the various node modules, JS libraries, and Cordova plugins for the Android platform.

You will also be missing the icon, which you can regenerate with `ionic resources --icon`.

You can now test the application locally by `ionic serve`, or push it to your
device using `ionic run android`.

## Screenshots

![screenshot_2016-02-02-21-39-31](https://cloud.githubusercontent.com/assets/88447/12765559/19adfa90-c9f7-11e5-8cea-987aa1dc9086.png)
![screenshot_2016-02-02-21-39-55](https://cloud.githubusercontent.com/assets/88447/12765560/19b223b8-c9f7-11e5-9812-8663fad22b4b.png)
![screenshot_2016-02-02-21-40-07](https://cloud.githubusercontent.com/assets/88447/12765561/19b5414c-c9f7-11e5-9852-46a84485ae5a.png)
