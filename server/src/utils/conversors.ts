export function ConvertHourStringToMinutes(hourString: string) {

  const [hour, minutes] = hourString.split(":").map(Number)

  const minutesAmount = (hour * 60) + minutes

  return minutesAmount
}

export function ConvertMinutesToHourString(minutesAmount: number) {
  const hours = Math.floor(minutesAmount / 60)
  const minutes = minutesAmount % 60

  const formatedHour = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`

  return formatedHour
}