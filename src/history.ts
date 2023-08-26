import * as moment from 'moment'

interface Parameters {
  keepAllLimitInMonth?: number
  keepOneByWeekLimitInMonth?: number
  keepOneByMonthLimitInMonth?: number
}

export function itemsToRemove (dataArray: any[], options: Parameters = {}): any[] {
  // todo: remove all items which are not passing some tests
  // for us, this should be items with a size which is bellow 5 Ko ?
  // todo: allow to limit items to a max of x items
  // todo: allow the latest x items to newer be removed ?

  const keepAllLimitInMonth: number = options.keepAllLimitInMonth || 3
  const keepOneByWeekLimitInMonth: number = options.keepOneByWeekLimitInMonth || 6
  const keepOneByMonthLimitInMonth: number = options.keepOneByMonthLimitInMonth || 24

  let isStringInput: boolean = true

  if (dataArray.length && !dataArray[0].date) {
    isStringInput = false
    dataArray = dataArray.map(item => {
      return { date: item }
    })
  }

  // const datesToKeep: string[] = []
  const datesToRemove: any[] = []

  let latestWeek: string = '0000-00'
  let latestMonth: string = '0000-00'

  dataArray.sort((a: any, b: any) => {
    return (new Date(b.date)).getTime() - (new Date(a.date)).getTime()
  })
  // console.log(dates)

  dataArray.forEach((data: any) => {
    // todo: remove items with duplicates dates ?

    // keep all for the latest 3 months
    const keepAllLimit = new Date()
    keepAllLimit.setMonth(keepAllLimit.getMonth() - keepAllLimitInMonth)

    if ((new Date(data.date)).getTime() > keepAllLimit.getTime()) {
      // console.log('is in the 3 first months', keepAllLimit, (new Date(date)))
      // datesToKeep.push(date)
      return
    }

    // keep one item by week from 3 to 6 months
    const keepOneByWeekLimit = new Date()
    keepOneByWeekLimit.setMonth(keepOneByWeekLimit.getMonth() - keepOneByWeekLimitInMonth)

    if ((new Date(data.date)).getTime() > keepOneByWeekLimit.getTime()) {
      // console.log('is in the 3-6 months', keepOneByWeekLimit, (new Date(date)))

      const currentWeek = moment(data.date).format('YYYY-WW')
      // console.log('currentWeek', currentWeek)

      if (latestWeek === currentWeek) {
        datesToRemove.push(data)
      }
      latestWeek = currentWeek

      // datesToKeep.push(date)
      return
    }

    // keep one item by month from 6 to 24 months
    const keepOneByMonthLimit = new Date()
    keepOneByMonthLimit.setMonth(keepOneByMonthLimit.getMonth() - keepOneByMonthLimitInMonth)

    if ((new Date(data.date)).getTime() > keepOneByMonthLimit.getTime()) {
      // console.log('is in the 6-24 months', keepOneByMonthLimit, (new Date(date)))

      const currentMonth = moment(data.date).format('YYYY-MM')
      // console.log('currentMonth', currentMonth)

      if (latestMonth === currentMonth) {
        datesToRemove.push(data)
      }
      latestMonth = currentMonth

      // datesToKeep.push(date)
      return
    }

    // console.log('is after 24 months', (new Date(date)))
    datesToRemove.push(data)

    // items which are more than 24 months are deleted if the limit is reach ?
  })

  return isStringInput ? datesToRemove : datesToRemove.map((item: any) => item.date)
}

/* export function add() {
  console.log('add')
} */
