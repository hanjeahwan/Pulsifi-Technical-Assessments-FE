import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export const $relativeTime = (date) => {
    if (!date) return 'N/A'
    return dayjs(date).fromNow()
}

export const $formatDateTime = (date, format) => {
    if (!date) return 'N/A'
    return dayjs(date).format(format)
}

export const $filterURLQuery = (query, ignore) => {
  const hasIgnore =  ignore && ignore.length > 0 
  for (let key in query) {
    if (ignore) continue
    if (!query[key]) {
      delete query[key]
    }
  }
  return query
}
