# -*- encoding: utf-8 -*-
$:.push File.expand_path("../lib", __FILE__)
require "rails-ujs/version"

Gem::Specification.new do |s|
  s.name        = "rails-ujs"
  s.version     = RailsUjs::VERSION
  s.platform    = Gem::Platform::RUBY
  s.authors     = ["JJ Buckley"]
  s.email       = ["jj@bjjb.org"]
  s.homepage    = "http://jjbuckley.guthub.com/rails-ujs"
  s.summary     = %q{A framework-agnostic Rails Unobtrusive JavaScript backend}
  s.description = %q{rails-ujs is an unobtrusive Javascript library for Rails
    projects which don't include any extra Javascript framework
    libraries. It's potentially useful for mobile webapps, or other projects
    which target only browsers with modern Javascript support.}

  s.rubyforge_project = "rails-ujs"

  s.files         = `git ls-files`.split("\n")
  s.test_files    = `git ls-files -- {test,spec,features}/*`.split("\n")
  s.executables   = `git ls-files -- bin/*`.split("\n").map{ |f| File.basename(f) }
  s.require_paths = ["lib"]
end
