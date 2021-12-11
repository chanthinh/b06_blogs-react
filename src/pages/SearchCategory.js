import { useSelector } from "react-redux"
import ArticleItem from "../components/ArticleItem"
import MainTitle from "../components/shared/MainTitle"

function SearchCategory() {
    
    const isFetchedCategories = useSelector(state => state.Category.isFetched)
    const isFetchedById = useSelector(state => state.Category.hashCategoryById)

    console.log('isFetchedCategories', isFetchedCategories)
    console.log('hashCategoryById', isFetchedById)

    return (
        <div className="articles-list section">
            <div className="tcl-container">

                <MainTitle type="search">10 kết quả tìm kiếm với danh mục "FE"</MainTitle>

                <div className="tcl-row tcl-jc-center">
                    <div className="tcl-col-12 tcl-col-md-8">
                        <ArticleItem
                            isStyleCard
                            isShowCategoies
                            isShowAvatar={false}
                            isShowDesc={false}
                        />
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default SearchCategory