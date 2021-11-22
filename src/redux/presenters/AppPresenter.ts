import { useEffect, useCallback, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { useMappedState } from 'redux-react-hook'
import { GlobalState } from '../../store'
import { MyImmerActionCreater } from '../appReducer'
import { fetchData } from '../thunk/loadData'
import { News } from '../types/types'

function useInitialization() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch])
}
function useState() {
  const mapState = useCallback(
    (state: GlobalState) => ({
      news: state.news,
      isLoading: state.isLoading,
    }),
    []
  )
  return useMappedState(mapState)
}
function useEventHandlers() {
  const dispatch = useDispatch()
  const eventHandlers = useMemo(
    () => ({
      handleAddNews: (newNews: News) => {
        dispatch(MyImmerActionCreater.addNews(newNews))
      },
      handleDeleteNews: (id: number) => {
        dispatch(MyImmerActionCreater.deleteNews(id))
      },
    }),
    []
  )
  return eventHandlers
}
export function useAppPresenter() {
  useInitialization()
  const values = useState()
  const eventHandlers = useEventHandlers()

  return {
    values,
    eventHandlers,
  }
}
