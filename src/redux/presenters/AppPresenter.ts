import { useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useMappedState } from 'redux-react-hook'
import { GlobalState } from '../../store'
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

export function useAppPresenter() {
  useInitialization()
  const values = useState()

  return {
    values,
  }
}
