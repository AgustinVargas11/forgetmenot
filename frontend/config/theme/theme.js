'use strict';

var app = angular.module('TodoApp');

app.config(function ($mdThemingProvider) {

    $mdThemingProvider.theme('default')
        .primaryPalette('teal', {
            'default': '500', // by default use shade 400 from the pink palette for primary intentions
            'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
            'hue-2': '300', // use shade 600 for the <code>md-hue-2</code> class
            'hue-3': '300' // use shade 600 for the <code>md-hue-2</code> class

        })
        // If you specify less than all of the keys, it will inherit from the
        // default shades
        .accentPalette('green', {
            'default': '200' // use shade 200 for default, and keep all other shades the same
        });

    // Enable browser color
    $mdThemingProvider.enableBrowserColor({
        theme: 'default', // Default is 'default'
        palette: 'accent', // Default is 'primary', any basic material palette and extended palettes are available
        hue: '200' // Default is '800'
    });
    $mdThemingProvider.theme("success-toast");
    $mdThemingProvider.theme("warn-toast");
});