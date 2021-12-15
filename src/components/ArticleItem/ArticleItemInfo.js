// import relativeTime from 'dayjs/plugin/relativeTime'
// import localeVi from 'dayjs/locale/vi'
// import dayjs from 'dayjs'
import { Link } from 'react-router-dom';
import { formatRelativeDate } from '../../helpers/day';
// import { DATE_TEMPLATE } from '../../constants';
import ArticleItemAvatar from './ArticleItemAvatar';

export default function ArticleItemInfo({
  isShowAvatar,
  author,
  createdDate,
  authorLink
}) {
  
  // dayjs.extend(relativeTime)
  // dayjs.locale(localeVi)
  
  // const dateRelative = createdDateObj.fromNow()
  // const createdDateObj = dayjs(createdDate)
  // const dateFormatted = createdDateObj.format(DATE_TEMPLATE)

const {dateRelative,dateFormatted } = formatRelativeDate(createdDate)

  return (
    <div className="article-item__info">
      {
        isShowAvatar && <ArticleItemAvatar avatar={author.avatar} authorLink={authorLink} nickname={author.nickname} />
      }
      <div className="article-item__info-right">
        <div className="article-item__author-name">
          <Link to={authorLink}><strong>{author.nickname}</strong></Link>
        </div>
        <div className="article-item__datetime">
          <div className="date">{dateFormatted}</div>
          <div className="time">
          &nbsp;
            <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 512 512" className="css-uk6cul" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z">
              </path>
            </svg>
            &nbsp;{dateRelative}</div>
        </div>
      </div>
    </div>
  )
}
