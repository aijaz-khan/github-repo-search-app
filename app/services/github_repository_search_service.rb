# app/services/github_repository_search_service.rb

class GithubRepositorySearchService
  GITHUB_API_URL = 'https://api.github.com/search/repositories'.freeze

  class GithubApiError < StandardError
    attr_reader :status_code

    def initialize(message, status_code)
      super(message)
      @status_code = status_code
    end
  end

  def search_repositories(query, page: 1, per_page: 100)
    url = "#{GITHUB_API_URL}?q=#{query}&page=#{page}&per_page=#{per_page}"

    begin
      response = RestClient.get(url)
      if response.code == 200
        result = parse_response(response)
        [result['items'], result['total_count'].to_i]
      else
        raise GithubApiError.new(handle_error(response), response.code)
      end
    rescue RestClient::ExceptionWithResponse => e
      raise GithubApiError.new(handle_error(e.response), e.response.code)
    end
  end

  private

  def parse_response(response)
    JSON.parse(response.body)
  end

  def handle_error(response)
    error_message = JSON.parse(response.body)
    "GitHub API Error: #{error_message['message']}"
  end
end
