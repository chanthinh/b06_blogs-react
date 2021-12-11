import Button from "../components/shared/Button";
import ArticleItem from "../components/ArticleItem";
import MainTitle from "../components/shared/MainTitle";
import { getQueryStr } from "../helpers";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actFetchArticlesAsync } from "../store/post/actions";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";

function SearchPage() {
  const location = useLocation()
  const dispatch = useDispatch()
  const queryStr = getQueryStr('q', location)

  const {
    list: posts,
    currentPage,
    totalPages,
    total
  } = useSelector(state => state.Post.articlePaging)
  const [loading, setLoading] = useState(false)
  const hasMorePost = currentPage < totalPages

  useEffect(() => {
    dispatch(actFetchArticlesAsync({
      search: queryStr,
      // perPage: 2
    }))
  }, [queryStr, dispatch])

  function handleLoadMore() {

    if (loading) {
      return
    }

    setLoading(true)
    dispatch(actFetchArticlesAsync({
      currentPage: currentPage + 1,
      search: queryStr
    })).then(() => {
      setLoading(false)
    })
  }

  return (
    <div className="articles-list section">
      <div className="tcl-container">

        <MainTitle type="search">{total} kết quả tìm kiếm với từ khóa "{queryStr}"</MainTitle>

        <div className="tcl-row tcl-jc-center">
          {
            posts.map(postItem => (
              <div key={postItem.id} className="tcl-col-12 tcl-col-md-8">
                <ArticleItem
                  isStyleCard
                  isShowCategoies
                  isShowAvatar={false}
                  isShowDesc={false}
                  post={postItem}
                />
              </div>
            ))
          }
        </div>

        {/* <div className="text-center">
          <Button type="primary" size="large">Tải thêm</Button>
        </div> */}
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

export default SearchPage