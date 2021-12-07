import { Link } from 'react-router-dom';

import { useSelector } from "react-redux"

export default function ArticleItemCategories({ categoriesId }) {
  const hashCategoryById = useSelector(state => state.Category.hashCategoryById)

  return (
    <ul className="article-item__categories">
      {categoriesId.map(cateId => {
        const category = hashCategoryById[cateId]

        if (!category) {
          return null
        }

        const categorySlugLink = '/category/' + category.slug

        return <li key={cateId}><Link to={categorySlugLink} className="btn btn-category">{category.name}</Link></li>
      })}
    </ul>
  )
}