export const date = (() => {
  let baseDate = new Date().toISOString().slice(0, 10).split('-')
  const year = parseInt(baseDate[0])
  const month = parseInt(baseDate[1])
  const day = parseInt(baseDate[2])
  let currentDate = year + month + day

  function incrementDays(days: number) {
    return currentDate += days
  }

  function isTodayOrPassed(dateToCheck: string){
    return parseInt(dateToCheck) <= currentDate
  }
  return {
    currentDate,
    incrementDays,
    isTodayOrPassed
  }
})()