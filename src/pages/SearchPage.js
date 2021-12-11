import Button from "../components/shared/Button";
import ArticleItem from "../components/ArticleItem";
import MainTitle from "../components/shared/MainTitle";
import { getQueryStr } from "../helpers";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actFetchArticlesAsync } from "../store/post/actions";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

function SearchPage() {
  const location = useLocation()
  const dispatch = useDispatch()
  const queryStr = getQueryStr('q', location)

  const { list: posts, currentPage, total } = useSelector(state => state.Post.articlePaging)

  useEffect(() => {
    dispatch(actFetchArticlesAsync({
      search: queryStr,
      perPage: 2
    }))
  }, [queryStr, dispatch])

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

        <div className="text-center">
          <Button type="primary" size="large">Tải thêm</Button>
        </div>
      </div>
    </div>

  )
}

export default SearchPage