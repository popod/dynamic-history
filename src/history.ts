import * as moment from 'moment'

export function itemsToRemove(dates: string[], options: object = {}) {
  // todo: remove all items which are not passing some tests
  // for us, this should be items with a size which is bellow 5 Ko ?
  // todo: allow to limit items to a max of x items
  
  // const datesToKeep: string[] = []
  const datesToRemove: string[] = []

  let latestWeek: string = '0000-00'
  let latestMonth: string = '0000-00'

  dates.sort((a, b) => {
    return (new Date(b)).getTime() - (new Date(a)).getTime()
  })
  // console.log(dates)

  dates.forEach(date => {
    // todo: remove items with duplicates dates ?

    // keep all for the latest 3 months
    const keepAllLimit = new Date()
    keepAllLimit.setMonth(keepAllLimit.getMonth() - 3)

    if ((new Date(date)).getTime() > keepAllLimit.getTime()) {
      // console.log('is in the 3 first months', keepAllLimit, (new Date(date)))
      // datesToKeep.push(date)
      return
    }

    // keep one item by week from 3 to 6 months
    const keepOneByWeekLimit = new Date()
    keepOneByWeekLimit.setMonth(keepOneByWeekLimit.getMonth() - 6)

    if ((new Date(date)).getTime() > keepOneByWeekLimit.getTime()) {
      // console.log('is in the 3-6 months', keepOneByWeekLimit, (new Date(date)))

      const currentWeek = moment(date).format('YYYY-WW')
      // console.log('currentWeek', currentWeek)

      if (latestWeek === currentWeek) {
        datesToRemove.push(date)
      }
      latestWeek = currentWeek

      // datesToKeep.push(date)
      return
    }

    // keep one item by month from 6 to 24 months
    const keepOneByMonthLimit = new Date()
    keepOneByMonthLimit.setMonth(keepOneByMonthLimit.getMonth() - 24)

    if ((new Date(date)).getTime() > keepOneByMonthLimit.getTime()) {
      // console.log('is in the 6-24 months', keepOneByMonthLimit, (new Date(date)))

      const currentMonth = moment(date).format('YYYY-MM')
      // console.log('currentMonth', currentMonth)

      if (latestMonth === currentMonth) {
        datesToRemove.push(date)
      }
      latestMonth = currentMonth

      // datesToKeep.push(date)
      return
    }

    // console.log('is after 24 months', (new Date(date)))
    datesToRemove.push(date)

    // items which are more than 24 months are deleted if the limit is reach ?
  })

  return datesToRemove
}
/* export function add() {
  console.log('add')
} */
