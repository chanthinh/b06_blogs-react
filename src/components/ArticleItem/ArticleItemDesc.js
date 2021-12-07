

export default function ArticleItemDesc({ shortDescHTML }) {
  const shortDesc = shortDescHTML
    .replace('<p>', '')
    .replace('</p>', '')

  let str = shortDesc
    .split(' ')
    .splice(0, 20)
    .join(' ')

  if (str !== shortDesc) {
    str += '...'
  }

  return (
    <p className="article-item__desc">{str}</p>
  )
}