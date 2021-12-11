import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArticleItem from "../ArticleItem";
import Button from "../shared/Button";
import MainTitle from "../shared/MainTitle";
import { actFetchArticlesAsync } from '../../store/post/actions'

function ArticleGeneral() {
  const dispatch = useDispatch()
  const { list: posts, currentPage, totalPages } = useSelector(state => state.Post.articlePaging)
  const [loading, setLoading] = useState(false)
  const hasMorePost = currentPage < totalPages
  // console.log('posts', posts)


  function handleLoadMore() {

    if (loading) {
      return
    }

    setLoading(true)
    dispatch(actFetchArticlesAsync({
      currentPage: currentPage + 1
    })).then(() => {
      setLoading(false)
    })
  }

  return (
    <div className="articles-list section">
      <div className="tcl-container">
        {/* Main Title */}
        <MainTitle btnLabel="Xem them">Bai Viet Tong Hop</MainTitle>
        {/* End Main Title */}
        {/* End Row News List */}
        <div className="tcl-row">
          {
            posts.map(item => {
              return (
                <div key={item.id} className="tcl-col-12 tcl-col-md-6">
                  <ArticleItem isStyleCard isShowAvatar={false} post={item} />
                </div>
              )
            })
          }
        </div>
        {/* End Row News List */}
        {
          hasMorePost && (
            <div className="text-center">
              <Button onClick={handleLoadMore} type="primary" size="large" loading={loading}>Tải thêm</Button>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default ArticleGeneral