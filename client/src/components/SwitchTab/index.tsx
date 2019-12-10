import React, { memo, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import style from './switchTab.module.sass'

interface Tab {
  title: string
  route?: string
  id: string
}
interface Props {
  tabOptions: Tab[]
  selectedID: string
}

export default memo(function SwitchTab({ tabOptions, selectedID }: Props) {
  const history = useHistory()
  const pushRoute = useCallback(
    (route: string) => () => {
      history.push(route)
    },
    [history]
  )
  return (
    <ul className={`d-flex ${style.switchTabCtr}`}>
      {tabOptions.map(tab => (
        <li
          key={tab.id}
          onClick={tab.route ? pushRoute(tab.route) : undefined}
          className={`d-flex justify-center ${style.tab} ${tab.id === selectedID ? style.selected : ''}`}
        >
          {tab.title}
        </li>
      ))}
    </ul>
  )
})
