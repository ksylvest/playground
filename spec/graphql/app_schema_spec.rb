require 'rails_helper'

RSpec.describe AppSchema do
  let(:schema) { File.read(Rails.root.join('app', 'graphql', 'app_schema.graphql')) }

  it 'requires a "rake graphql:schema:generate" be run for changes' do
    expect(GraphQL::Schema::Printer.print_schema(AppSchema))
      .to eq(schema), 'Mismatched GraphQL schema. Run "rake graphql:schema:dump"'
  end
end
