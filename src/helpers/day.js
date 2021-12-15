import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localeVi from 'dayjs/locale/vi'
import { DATE_TEMPLATE } from '../constants';

dayjs.extend(relativeTime)
dayjs.locale(localeVi)

export const formatRelativeDate = (date) => {
    const createdDateObj = dayjs(date)
    const dateFormatted = createdDateObj.format(DATE_TEMPLATE)
    const dateRelative = createdDateObj.fromNow()

    return { dateRelative, dateFormatted }
}