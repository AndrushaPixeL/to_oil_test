import { useEffect, useCallback, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { useMappedState } from 'redux-react-hook'
import { GlobalState } from '../../store'
import { MyImmerActionCreater } from '../appReducer'
import { fetchData } from '../thunk/loadData'

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
      handleAddNews: () => {
        dispatch(
          MyImmerActionCreater.addNews({
            id: 1,
            title: 'Voluptate',
            description:
              'Quisquam et doloremque. Eligendi quo possimus. Non quia aut.',
            created_at: '2020-10-01T07:17:52.000Z',
            author: {
              name: 'Иван',
              lastname: 'Иванов',
            },
          })
        )
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
