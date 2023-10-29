# spec/models/github_repository_search_service_spec.rb

require 'rails_helper' # Make sure to require the appropriate file if not in a Rails context
require_relative '../../app/services/github_repository_search_service'

RSpec.describe GithubRepositorySearchService do
  let(:service) { described_class.new }

  describe '#search_repositories' do
    context 'when the request is successful' do
      it 'returns repository data' do
        result, total_count = service.search_repositories('example')

        expect(result).to be_an(Array)
        expect(total_count).to be > 0
      end
    end

    context 'when the there is no repo in result ' do
      it 'returns 0 repository data' do
        result, total_count = service.search_repositories('nonexistent1234120')

        expect(result).to be_an(Array)
        expect(total_count).to eq(0)
      end
    end

    describe '#parse_response' do
      it 'parses a JSON response and returns a hash' do
        json_response = '{"key": "value"}'
        response = double(code: 200, body: json_response)
        parsed_data = service.send(:parse_response, response)

        expect(parsed_data).to be_a(Hash)
        expect(parsed_data['key']).to eq('value')
      end
    end

    describe '#handle_error' do
      it 'extracts the error message from a JSON response' do
        json_response = '{"message": "Error message"}'
        response = double(code: 400, body: json_response)
        error_message = service.send(:handle_error, response)

        expect(error_message).to eq('GitHub API Error: Error message')
      end
    end
  end
end
