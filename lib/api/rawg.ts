class RAWGClient {
  private baseUrl = process.env.RAWG_BASE_URL
  private apiKey = process.env.RAWG_API_KEY

  async fetch<T>(endpoint: string, params: Record<string, string> = {}) {
    const queryParams = new URLSearchParams({
      key: this.apiKey!,
      ...params,
    })

    const response = await fetch(`${this.baseUrl}/${endpoint}?${queryParams}`)

    if (!response.ok) {
      throw new Error(`RAWG API error: ${response.statusText}`)
    }

    return response.json() as Promise<T>
  }
}

export const rawgClient = new RAWGClient()