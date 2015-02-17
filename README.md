# handlebars-plugfest

![image](assets/img/wip.png)

Using handlebars.js to enable language and data source/CMS agnostic interface for presentation tier to use

## Goals

* Late binding of template to content
* Granular reusable partials
* Work in the browser, in Node, in Rails and in Java

## Dependencies

* Node.js

## Usage

Install the Node and Bower dependencies:

    npm install
    bower install

And then run the nws webserver with 

    npm start

You can now navigate to [http://localhost:3030/](http://localhost:3030/) to see the Browser/JavaScript version

## The Tests

Once the server is up you can run the Mocha/Chai tests here: [http://localhost:3030/test.html](http://localhost:3030/test.html) 


## Notes

The example helper is adapted from this [answer](http://stackoverflow.com/a/14618035) to this [Stack Overflow Question](http://stackoverflow.com/questions/11523331/passing-variables-through-handlebars-partial)
