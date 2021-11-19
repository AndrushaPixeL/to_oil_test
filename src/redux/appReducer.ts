import { createActionCreators, ImmerReducer } from 'immer-reducer'
import { IData, News } from './types/types'

export interface MyImmerReducerInitialStateInt {
  data: IData
  news: Array<News>
  isLoading: boolean
}

export const myImmerReducerInitialState: MyImmerReducerInitialStateInt = {
  data: {
    messages: '',
    is_seccess: false,
    data: {
      articles: [
        {
          id: 0,
          title: '',
          description: '',
          created_at: '',
          author: { name: '', lastname: '' },
        },
      ],
    },
  },
  news: [
    {
      id: 0,
      title: '',
      description: '',
      created_at: '',
      author: { name: '', lastname: '' },
    },
  ],
  isLoading: false,
}

class MyImmerReducer extends ImmerReducer<MyImmerReducerInitialStateInt> {
  setData(data: IData) {
    this.draftState.news = data.data.articles
  }

  setIsLoading(isLoading: boolean) {
    this.draftState.isLoading = isLoading
  }
}

export const MyImmerActionCreater = createActionCreators(MyImmerReducer)

export default MyImmerReducer
