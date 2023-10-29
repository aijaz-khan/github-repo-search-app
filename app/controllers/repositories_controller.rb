# frozen_string_literal: true

# Controller for Repositories
class RepositoriesController < ApplicationController
  before_action :github_search_service, only: :index

  def index
    search_term = search_params[:search_term]
    page = search_params[:page] || 1
    per_page = 25

    begin
      repositories, total_repositories = @github_search_service.search_repositories(search_term, page: page, per_page: per_page)
      total_pages = (total_repositories.to_f / per_page).ceil
      render json: { repositories: repositories, total_pages: total_pages }
    rescue StandardError => e
      error_message = "An error occurred: #{e.message}"
      render json: { error: error_message }, status: :internal_server_error
    end
  end

  private

  def search_params
    params.permit(:search_term, :page)
  end

  def github_search_service
    @github_search_service ||= github_search_service_instance
  end

  def github_search_service_instance
    GithubRepositorySearchService.new
  end
end

