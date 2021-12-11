import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import ArticleItem from "../components/ArticleItem"
import PageNotFound from "../components/PageNotFound/PageNotFound"
import IconLoading from "../components/shared/IconLoading"
import MainTitle from "../components/shared/MainTitle"
import { usePostsPaging } from "../hooks/usePostsPaging"
import { actFetchArticlesAsync } from "../store/post/actions"

function SearchCategory() {
    const dispatch = useDispatch()
    const { slug } = useParams()
    const [category, setCategory] = useState(undefined)
    const isFetchedCategories = useSelector(state => state.Category.isFetched)
    const hashCategoryById = useSelector(state => state.Category.hashCategoryById)

    useEffect(() => {
        // let isFound = false
        // if (isFetchedCategories) {
        //     Object
        //         .keys(hashCategoryById)
        //         .forEach(categoryId => {
        //             const categoryValue = hashCategoryById[categoryId]
        //             if (categoryValue.slug === slug && categoryValue.lang === 'vi') {
        //                 isFound = true
        //                 setCategory(categoryValue)
        //             }
        //         })
        //     if (isFound === false) {
        //         setCategory(null) // Không trỏ tới category nào cả
        //     }
        // }
        if (isFetchedCategories) {
            const foundId = Object
                .keys(hashCategoryById)
                .find(categoryId =>
                    hashCategoryById[categoryId].slug === slug && hashCategoryById[categoryId].lang === 'vi'
                )
            if (foundId) {
                setCategory(hashCategoryById[foundId])
            } else {
                setCategory(null)
            }
        }

    }, [isFetchedCategories, hashCategoryById, slug])

    const {
        total,
        posts,
        renderButtonLoadMore
    } = usePostsPaging({
        extraParams: { categories: category ? category.id : '' },
    })

    useEffect(() => {
        if (category) {
            dispatch(actFetchArticlesAsync({
                categories: category.id
                // perPage: 2
            }))
        }
    }, [category, dispatch])

    if (category === undefined) {
        return (
            <div className="articles-list section">
                <div className="tcl-container">
                    <div className="tcl-row tcl-jc-center">
                        <IconLoading width='150px' />
                    </div>
                </div>
            </div>
        )
    }

    if (category === null) {
        return <PageNotFound />
    }
    console.log('slug', slug)

    return (
        <div className="articles-list section">
            <div className="tcl-container">

                <MainTitle type="search">{total} kết quả tìm kiếm với danh mục "{slug}"</MainTitle>

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
                {renderButtonLoadMore()}
            </div>
        </div>
    )
}

export default SearchCategory