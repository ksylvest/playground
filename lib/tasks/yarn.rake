if ENV['NODE_ENV'].eql?('production')
  namespace :yarn do
    task :install do
      puts 'SKIPPING yarn:install'
    end
  end
end
