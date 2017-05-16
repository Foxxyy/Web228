var app = angular.module("exampleBlock", []);
app.directive("exBl", function() {
    return {
        template : '<img src="img/for.png"><h2>FIRST PROJECT THEME</h2><h3>Erik Padamans</h3><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p><button>LEARN MORE</button>'
    };
});
