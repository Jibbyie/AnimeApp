export const isValidDate = (dateString) => {
  const regex = /^(\d{4})-(\d{2})-(\d{2})$/
  if (!regex.test(dateString)) {
    return false
  }

  const date = new Date(dateString)
  return (
    date.getFullYear() === parseInt(dateString.slice(0, 4)) &&
    date.getMonth() === parseInt(dateString.slice(5, 7)) - 1 &&
    date.getDate() === parseInt(dateString.slice(8, 10))
  )
}

export const isInFuture = (dateString) => {
  const date = new Date(dateString)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return date > today
}

export const isEndDateBeforeStartDate = (startDateString, endDateString) => {
  const startDate = new Date(startDateString)
  const endDate = new Date(endDateString)
  return endDate < startDate
}
