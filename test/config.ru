run lambda { |env|
  case env['PATH_INFO']
  when '/rails.js'
    puts "Serving the script..."
    [200, { 'Content-Type' => 'text/javascript' }, File.new('../src/rails.js')]
  when '/'
    puts "Serving the page, coz PATH_INFO = #{env['PATH_INFO']}"
    [200, { 'Content-Type' => 'text/html' }, File.new('index.html')]
  when '/test'
    if env['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest'
      [200, { 'Content-Type' => 'text/javascript' }, StringIO.new('alert("OK");')]
    else
      [301, { 'Content-Type' => 'text/plain', 'Location' => '/' }, StringIO.new('Redirecting...')]
    end
  else
    puts "Serving a 404, coz PATH_INFO = #{env['PATH_INFO']}"
    [404, { 'Content-Type' => 'text/plain'}, StringIO.new("Not found")]
  end
}
# vi:ft=ruby
