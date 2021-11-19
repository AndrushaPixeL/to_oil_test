import { MyImmerActionCreater } from '../appReducer'
import { IData } from '../types/types'

export const fetchData = () => {
  return (dispatch: (callback: any) => void) => {
    dispatch(MyImmerActionCreater.setIsLoading(true))
    fetch('https://test-api-app-for-react.herokuapp.com/api/v1/news')
      .then((response): Promise<IData> => response.json())
      .then((data) => {
        dispatch(MyImmerActionCreater.setData(data))
        dispatch(MyImmerActionCreater.setIsLoading(false))
      })
  }
}
