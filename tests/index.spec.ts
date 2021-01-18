import * as moment from 'moment'
import { itemsToRemove } from '../src/index'

test('An empty dates array should return an empty array.', () => {
  expect(itemsToRemove([])).toEqual([])
})

test('It should return in the same type of the dates array parameter.', () => {
  expect(itemsToRemove([
    { date: moment().format('YYYY-MM-DD') },
    { date: moment().subtract(3, 'years').format('YYYY-MM-DD') }
  ])).toEqual([
    { date: moment().subtract(3, 'years').format('YYYY-MM-DD') }
  ])
})

// todo: test if it works with date with time

// DEFAULT PERIODS TEST
describe('Individually test default periods.', () => {
  test('Dates in the 3 first months should not be removed.', () => {
    expect(itemsToRemove([
      moment().format('YYYY-MM-DD'),
      moment().subtract(10, 'day').format('YYYY-MM-DD'),
      moment().subtract(2, 'months').format('YYYY-MM-DD'),
      moment().subtract(3, 'months').format('YYYY-MM-DD')
    ])).toEqual([])
  })

  test('Only one date by weed should be keept for dates between 3 and 6 months.', () => {
    expect(itemsToRemove([
      moment().subtract(4, 'months').startOf('isoWeek').subtract(2, 'days').format('YYYY-MM-DD'),
      moment().subtract(4, 'months').startOf('isoWeek').subtract(1, 'day').format('YYYY-MM-DD'),
      moment().subtract(4, 'months').startOf('isoWeek').format('YYYY-MM-DD'),
      moment().subtract(4, 'months').startOf('isoWeek').add(1, 'day').format('YYYY-MM-DD')
    ])).toEqual([
      moment().subtract(4, 'months').startOf('isoWeek').format('YYYY-MM-DD'),
      moment().subtract(4, 'months').startOf('isoWeek').subtract(2, 'days').format('YYYY-MM-DD')
    ])
  })

  test('Only one date by month should be keept for dates between 6 and 24 months.', () => {
    expect(itemsToRemove([
      moment().subtract(8, 'months').startOf('month').add(2, 'days').format('YYYY-MM-DD'),
      moment().subtract(8, 'months').startOf('month').add(15, 'days').format('YYYY-MM-DD'),
      moment().subtract(9, 'months').startOf('month').format('YYYY-MM-DD'),
      moment().subtract(11, 'months').startOf('month').add(1, 'day').format('YYYY-MM-DD'),
      moment().subtract(11, 'months').startOf('month').add(2, 'days').format('YYYY-MM-DD'),
      moment().subtract(11, 'months').startOf('month').add(20, 'days').format('YYYY-MM-DD'),
      moment().subtract(12, 'months').startOf('month').format('YYYY-MM-DD')
    ])).toEqual([
      moment().subtract(8, 'months').startOf('month').add(2, 'days').format('YYYY-MM-DD'),
      moment().subtract(11, 'months').startOf('month').add(2, 'days').format('YYYY-MM-DD'),
      moment().subtract(11, 'months').startOf('month').add(1, 'day').format('YYYY-MM-DD')
    ])
  })

  test('Date after 24 months should be removed.', () => {
    expect(itemsToRemove([
      moment().subtract(24, 'months').startOf('month').format('YYYY-MM-DD'),
      moment().subtract(26, 'months').startOf('month').add(15, 'days').format('YYYY-MM-DD'),
      moment().subtract(26, 'months').startOf('month').format('YYYY-MM-DD'),
      moment().subtract(11, 'months').startOf('month').add(1, 'day').format('YYYY-MM-DD'),
    ])).toEqual([
      moment().subtract(24, 'months').startOf('month').format('YYYY-MM-DD'),
      moment().subtract(26, 'months').startOf('month').add(15, 'days').format('YYYY-MM-DD'),
      moment().subtract(26, 'months').startOf('month').format('YYYY-MM-DD')
    ])
  })
})

// DEFAULT LIMITS TEST
describe('Test default limits.', () => {
  test('Limit for the first 3 months should be correct.', () => {
    expect(itemsToRemove([
      moment().subtract(3, 'months').add(1, 'day').format('YYYY-MM-DD'),
      moment().subtract(3, 'months').format('YYYY-MM-DD'),
      moment().subtract(3, 'months').subtract(1, 'day').format('YYYY-MM-DD'),
      moment().subtract(3, 'months').subtract(2, 'day').format('YYYY-MM-DD')
    ])).toEqual([
      moment().subtract(3, 'months').subtract(1, 'day').format('YYYY-MM-DD'),
      moment().subtract(3, 'months').subtract(2, 'day').format('YYYY-MM-DD')
    ])
  })

  test('Limit for months 3 to 6 should be correct.', () => {
    expect(itemsToRemove([
      moment().subtract(6, 'months').add(1, 'day').format('YYYY-MM-DD'),
      moment().subtract(6, 'months').format('YYYY-MM-DD'),
      moment().subtract(6, 'months').subtract(1, 'day').format('YYYY-MM-DD'),
      moment().subtract(6, 'months').subtract(2, 'day').format('YYYY-MM-DD')
    ])).toEqual([
      moment().subtract(6, 'months').subtract(1, 'day').format('YYYY-MM-DD'),
      moment().subtract(6, 'months').subtract(2, 'day').format('YYYY-MM-DD')
    ])
  })

  test('Limit for months 24 and after should be correct.', () => {
    expect(itemsToRemove([
      moment().subtract(24, 'months').add(1, 'day').format('YYYY-MM-DD'),
      moment().subtract(24, 'months').format('YYYY-MM-DD'),
      moment().subtract(24, 'months').subtract(1, 'day').format('YYYY-MM-DD'),
      moment().subtract(24, 'months').subtract(2, 'day').format('YYYY-MM-DD')
    ])).toEqual([
      moment().subtract(24, 'months').format('YYYY-MM-DD'),
      moment().subtract(24, 'months').subtract(1, 'day').format('YYYY-MM-DD'),
      moment().subtract(24, 'months').subtract(2, 'day').format('YYYY-MM-DD')
    ])
  })
})

// CUSTOMS LIMITS TEST
describe('Test customs limits.', () => {
  test('Limit custom for "keep all" items of 1 months should be correct.', () => {
    expect(itemsToRemove([
      moment().subtract(1, 'months').add(1, 'day').format('YYYY-MM-DD'),
      moment().subtract(1, 'months').format('YYYY-MM-DD'),
      moment().subtract(1, 'months').subtract(1, 'day').format('YYYY-MM-DD'),
      moment().subtract(1, 'months').subtract(2, 'day').format('YYYY-MM-DD')
    ], { keepAllLimitInMonth: 1 })).toEqual([
      moment().subtract(1, 'months').subtract(1, 'day').format('YYYY-MM-DD'),
      moment().subtract(1, 'months').subtract(2, 'day').format('YYYY-MM-DD')
    ])
  })

  test('Limit for customs "keep one by week" between 3 and 8 months should be correct.', () => {
    expect(itemsToRemove([
      moment().subtract(8, 'months').add(1, 'day').format('YYYY-MM-DD'),
      moment().subtract(8, 'months').format('YYYY-MM-DD'),
      moment().subtract(8, 'months').subtract(1, 'day').format('YYYY-MM-DD'),
      moment().subtract(8, 'months').subtract(2, 'day').format('YYYY-MM-DD')
    ], { keepOneByWeekLimitInMonth: 8 })).toEqual([
      moment().subtract(8, 'months').subtract(1, 'day').format('YYYY-MM-DD'),
      moment().subtract(8, 'months').subtract(2, 'day').format('YYYY-MM-DD')
    ])
  })

  test('Limit for customs "keep one by month" between 6 and 9 months should be correct.', () => {
    expect(itemsToRemove([
      moment().subtract(9, 'months').add(1, 'day').format('YYYY-MM-DD'),
      moment().subtract(9, 'months').format('YYYY-MM-DD'),
      moment().subtract(9, 'months').subtract(1, 'day').format('YYYY-MM-DD'),
      moment().subtract(9, 'months').subtract(2, 'day').format('YYYY-MM-DD')
    ], { keepOneByMonthLimitInMonth: 9 })).toEqual([
      moment().subtract(9, 'months').format('YYYY-MM-DD'),
      moment().subtract(9, 'months').subtract(1, 'day').format('YYYY-MM-DD'),
      moment().subtract(9, 'months').subtract(2, 'day').format('YYYY-MM-DD')
    ])
  })
})