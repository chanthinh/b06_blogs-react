import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localeVi from 'dayjs/locale/vi'
import { DATE_TEMPLATE, DATE_TEMPLATE_FULL } from '../constants';

dayjs.extend(relativeTime)
dayjs.locale(localeVi)

export const formatRelativeDate = (date, isFull) => {
    const createdDateObj = dayjs(date)
    const dateFormatted = createdDateObj.format(isFull ? DATE_TEMPLATE_FULL : DATE_TEMPLATE)
    const dateRelative = createdDateObj.fromNow()

    return { dateRelative, dateFormatted }
}