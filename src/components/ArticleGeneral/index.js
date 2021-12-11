import ArticleItem from "../ArticleItem";
import MainTitle from "../shared/MainTitle";
import { usePostsPaging } from '../../hooks/usePostsPaging'

function ArticleGeneral() {

  const { posts, renderButtonLoadMore } = usePostsPaging()

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
        {renderButtonLoadMore()}
      </div>
    </div>
  )
}

export default ArticleGeneral