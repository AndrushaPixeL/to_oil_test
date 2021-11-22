import { createActionCreators, ImmerReducer } from 'immer-reducer'
import { IData, News } from './types/types'

export interface MyImmerReducerInitialStateInt {
  news: Array<News>
  isLoading: boolean
}

export const myImmerReducerInitialState: MyImmerReducerInitialStateInt = {
  news: [],
  isLoading: false,
}

class MyImmerReducer extends ImmerReducer<MyImmerReducerInitialStateInt> {
  setData(data: IData) {
    this.draftState.news = data.data.articles
  }

  setIsLoading(isLoading: boolean) {
    this.draftState.isLoading = isLoading
  }

  addNews(news: News) {
    this.draftState.news.push(news)
  }

  deleteNews(id: number) {
    this.draftState.news = this.draftState.news.filter((el) => {
      return el.id !== id
    })
  }
}

export const MyImmerActionCreator = createActionCreators(MyImmerReducer)

export default MyImmerReducer
