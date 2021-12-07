import { Link } from 'react-router-dom';

export default function ArticleItemThumb({ thumbnail, slugLink, title }) {
  
  return (
    <div className="article-item__thumbnail">
      <Link to={slugLink}>
        <img src={thumbnail} alt={title} />
      </Link>
    </div>
  )
}