import { useSelector } from 'react-redux'
import { StoreState } from '@reducer/index'

export default function useAuth() {
  const { token } = useSelector((state: StoreState) => ({
    token: state.user.token
  }))

  return !!token
}
