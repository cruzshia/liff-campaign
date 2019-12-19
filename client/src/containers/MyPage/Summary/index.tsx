import React, { useMemo } from 'react'
import SummaryMain from './SummaryMain'
import { useSelector } from 'react-redux'
import { StoreState } from '@reducer/index'
import { EstimationLogModel } from '@src/reducer/user/userModel'

// const filterEstimationLog = (estimationLog: EstimationLogModel[]) =>
//   estimationLog.reduce(
//     (acc: EstimationLogModel[], current) =>
//       acc.find(el => {
//         el.week === current.week && el.createdAt < current.createdAt
//       })
//         ? acc
//         : acc.concat([current]),
//     []
//   )

const filterEstimationLog = (estimationLog: EstimationLogModel[]) => {
  return estimationLog.reduce((acc: number[], current) => (current.offalFat ? acc.concat([current.offalFat]) : acc), [])
}

export default function Summary() {
  const { profile, estimationLog, linePoints } = useSelector((store: StoreState) => store.user)

  const week = useMemo(
    () => linePoints.reduce((acc, current) => (current.week && current.week > acc ? current.week : acc), 0),
    [linePoints]
  )

  const barChartData = useMemo(() => (estimationLog ? filterEstimationLog(estimationLog) : []), [estimationLog])

  const compareToLastWeek = useMemo(() => {
    const length = barChartData.length
    if (length === 1) return 'increase'
    else if (barChartData[length - 1] - barChartData[length - 2] > 0) return 'increase'
    else return 'decrease'
  }, [barChartData])

  return (
    <SummaryMain
      offalFat={(profile && profile.offalFat) || null}
      week={week}
      barChartData={barChartData}
      compareToLastWeek={compareToLastWeek}
    />
  )
}
