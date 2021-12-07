import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ArticleGeneral from "../components/ArticleGeneral";
import ArticleLatest from "../components/ArticleLatest";
import ArticlePopular from "../components/ArticlePopular";
import { actFetchArticleGeneralAsync, actFetchArticleLastestAsync, actFetchArticlePopularAsync } from "../store/post/actions";

function HomePage() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(actFetchArticleLastestAsync())
    dispatch(actFetchArticlePopularAsync())
    dispatch(actFetchArticleGeneralAsync())
  }, [dispatch])

  return (
    <>
      <ArticleLatest />
      <ArticlePopular />
      <ArticleGeneral />
    </>
  )
}

export default HomePage