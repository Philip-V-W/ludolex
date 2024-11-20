import { IGDB } from '@/types/api'

class IGDBClient {
  private accessToken: string | null = null
  private tokenExpiry: number = 0

  private async getAccessToken() {
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken
    }

    const response = await fetch('https://id.twitch.tv/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: process.env.IGDB_CLIENT_ID,
        client_secret: process.env.IGDB_CLIENT_SECRET,
        grant_type: 'client_credentials',
      }),
    })

    const data: IGDB.AccessToken = await response.json()
    this.accessToken = data.access_token
    this.tokenExpiry = Date.now() + data.expires_in * 1000
    return this.accessToken
  }

  private async fetch<T>(endpoint: string, query: string): Promise<T> {
    const token = await this.getAccessToken()

    const response = await fetch(`https://api.igdb.com/v4/${endpoint}`, {
      method: 'POST',
      headers: {
        'Client-ID': process.env.IGDB_CLIENT_ID!,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'text/plain',
      },
      body: query,
    })

    if (!response.ok) {
      throw new Error(`IGDB API error: ${response.statusText}`)
    }

    return response.json()
  }

  async searchGames(search: string, limit: number = 10) {
    const query = `
      search "${search}";
      fields name,slug,cover.*,first_release_date,summary,rating,genres.*,platforms.*;
      limit ${limit};
    `
    return this.fetch<IGDB.Game[]>('games', query)
  }

  async getGame(id: number) {
    const query = `
      fields name,slug,cover.*,first_release_date,summary,rating,genres.*,platforms.*;
      where id = ${id};
    `
    return this.fetch<IGDB.Game[]>('games', query).then((games) => games[0])
  }
}

export const igdbClient = new IGDBClient()
