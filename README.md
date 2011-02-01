Rails UJS
=========

This is a reasonably small, framework agnostic Unobtrusive JavaScript library
for [Ruby on Rails][rails] (3) applications.

Usage
-----

To use it, copy rails.js into your public/javascripts directory. Be sure to
include 'rails.js' in your layout files.

You could update the default javascript inclusions in your config/application.rb
with the following snippet:

    config.action_view.javascript_expansions[:defaults] = %w(rails application)

then you can use

    <%= javascript_include_tag :defaults %>

as normal in your views.

Caveats
-------

rails-ujs is targeted mainly at modern browsers, such as Firefox, Chrome,
Safari and Webkit-based mobile browsers. It will need more work to operate on
non-W3-compliant browsers (like Internet Explorer) - if you need to support
every platform, you'd be better off with one of the existing UJS packages,
like the one that ships with Rails (using [Prototype][protype]) or
[jquery-ujs][jquery].

[rails]: http://rubyonrails.org
[prototype]: http://prototypejs.org
[jquery]: http://jquery.com
