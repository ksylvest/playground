Rails.autoloaders.each do |autoloader|
  autoloader.inflector.inflect("ipstack" => "IPStack")
end
