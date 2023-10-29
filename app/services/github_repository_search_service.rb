class GithubRepositorySearchService
  GITHUB_API_URL = 'https://api.github.com/search/repositories'.freeze

  def search_repositories(query, page: 1, per_page: 100)
    url = "#{GITHUB_API_URL}?q=#{query}&page=#{page}&per_page=#{per_page}"

    response = RestClient.get(url)
    if response.code == 200
      result = parse_response(response)
      [result['items'], result['total_count'].to_i]
    else
      handle_error(response)
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
