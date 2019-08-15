require 'rails_helper'

RSpec.describe Mutations::Password::ChangeMutation do
  describe '#resolve' do
    subject :execute do
      Current.auth!(user: user)
      AppSchema.execute(gql, variables: { input: input })
    end

    let(:gql) do
      <<~GQL
        mutation ChangePassword($input: PasswordInput!) {
          changePassword(input: $input) {
            status
          }
        }
      GQL
    end

    let(:user) { create(:user) }

    context 'with valid input' do
      let(:input) do
        {
          current: user.password,
          replacement: user.password.reverse,
        }
      end

      it 'resolves "OK"' do
        expect(execute['errors']).to be_nil
        expect(execute['data']['changePassword']['status']).to eql('OK')
      end
    end

    context 'with invalid input' do
      let(:input) do
        {
          current: user.password.reverse,
          replacement: user.password,
        }
      end

      it 'resolves "UNPROCESSABLE"' do
        expect(execute['errors']).to be_nil
        expect(execute['data']['changePassword']['status']).to eql('UNPROCESSABLE')
      end
    end
  end
end
