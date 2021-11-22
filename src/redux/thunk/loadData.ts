import { MyImmerActionCreator } from '../appReducer'
import { IData } from '../types/types'

export const fetchData = () => {
  return (dispatch: (callback: any) => void) => {
    dispatch(MyImmerActionCreator.setIsLoading(true))
    fetch('https://test-api-app-for-react.herokuapp.com/api/v1/news')
      .then((response): Promise<IData> => response.json())
      .then((data) => {
        dispatch(MyImmerActionCreator.setData(data))
        dispatch(MyImmerActionCreator.setIsLoading(false))
      })
  }
}
