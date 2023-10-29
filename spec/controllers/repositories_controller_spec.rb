# frozen_string_literal: true

require 'rails_helper'
require 'json'

RSpec.describe RepositoriesController, type: :controller do
  let(:valid_search_term) { 'example' }
  let(:invalid_search_term) { 'nonexistent1234120' }
  let(:per_page) { 25 }

  describe 'GET #index' do
    context 'when the request is successful' do
      it 'returns repository data and total pages' do
        allow_any_instance_of(GithubRepositorySearchService).to receive(:search_repositories)
          .with(valid_search_term, page: '1', per_page: per_page)
          .and_return([[], 0])

        get :index, params: { search_term: valid_search_term, page: '1' }
        expect(response).to have_http_status(200)

        json_response = JSON.parse(response.body)
        expect(json_response['repositories']).to be_an(Array)
        expect(json_response['total_pages']).to eq(0)
      end
    end

    context 'when the request fails with a non-200 status' do
      it 'returns an error response' do
        allow_any_instance_of(GithubRepositorySearchService).to receive(:search_repositories)
          .with(invalid_search_term, page: '1', per_page: per_page)
          .and_raise(GithubRepositorySearchService::GithubApiError.new('GitHub API Error', 404))

        get :index, params: { search_term: invalid_search_term, page: '1' }
        expect(response).to have_http_status(422)

        json_response = JSON.parse(response.body)
        expect(json_response['error']).to eq('An error occurred: GitHub API Error')
      end
    end

    context 'when an unexpected error occurs' do
      it 'returns an error response' do
        allow_any_instance_of(GithubRepositorySearchService).to receive(:search_repositories)
          .with(valid_search_term, page: '1', per_page: per_page)
          .and_raise(StandardError.new('Unexpected Error'))

        get :index, params: { search_term: valid_search_term, page: '1' }
        expect(response).to have_http_status(422)

        json_response = JSON.parse(response.body)
        expect(json_response['error']).to eq('An error occurred: Unexpected Error')
      end
    end
  end
end
