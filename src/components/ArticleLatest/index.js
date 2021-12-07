import './latest-news-list.css'
import ArticleItem from "../ArticleItem";
import MainTitle from '../shared/MainTitle'
import { useSelector } from 'react-redux';

function ArticleLatest() {

  const posts = useSelector(state => state.Post.articleLatest)
  // console.log("posts", posts)

  return (
    <div className="latest-news section">
      <div className="tcl-container">

        <MainTitle>Bài viết mới nhất</MainTitle>

        <div className="latest-news__list spacing">

          {posts.map((post) => {
            return (
              <div className="latest-news__card" key={post.id}>
                <ArticleItem post={post} />
              </div>
            )
          })}

        </div>
      </div>
    </div>

  )
}

export default ArticleLatest