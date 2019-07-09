class Types::SessionStatusEnum < GraphQL::Schema::Enum
  value 'ONLINE', value: 'online'
  value 'OFFLINE', value: 'offline'
end
