import { useSelector } from 'react-redux'
import { StoreState } from '@reducer/index'
import { UserModelType } from '@reducer/user/userModel'

interface UserAccountReturn {
  userChecked: boolean
  isAccount: boolean
  profile?: UserModelType
}

// this hook is to check wether user is our account
export default function useAccount(): UserAccountReturn {
  const { userChecked, profile } = useSelector((state: StoreState) => ({
    userChecked: state.user.userChecked,
    profile: state.user.profile
  }))

  return {
    userChecked,
    isAccount: userChecked ? !!profile : true,
    profile
  }
}
