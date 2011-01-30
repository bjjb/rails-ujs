This is a reasonably small, framework agnostic Unobtrusive JavaScript library
for Ruby on Rails (3) applications.

To use it, copy rails.js into your public/javascripts directory. Be sure to
include 'rails.js' in your layout files.

You could update the default javascript inclusions in your config/application.rb
with the following snippet:

    config.action_view.javascript_expansions[:defaults] = %w(rails application)

then you can use

    <%= javascript_include_tag :defaults %>

as normal in your views.
