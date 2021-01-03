import { useSelector, shallowEqual } from 'react-redux'
import { StoreState } from '@/store/reducers'

export const useUser = () => {
  return useSelector((store: StoreState) => store.user, shallowEqual)
}