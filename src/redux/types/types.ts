export type Author = {
  name: string
  lastname: string
}
export type News = {
  id: number
  title: string
  description: string
  created_at: string
  author: Author
}
export type Articles = {
  articles: Array<News>
}
export interface IData {
  messages: string
  is_seccess: boolean
  data: Articles
}
