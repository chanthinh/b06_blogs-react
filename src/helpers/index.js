import { useLocation } from "react-router";

export function GetQueryStr(name) {
  const location = useLocation()
  return new URLSearchParams(location.search).get(name)
}


export function mappingPostData(post) {
  return {
    id: post.id,
    title: post.title.rendered,
    author: post.author_data,
    authorId: post.author,
    thumbnail: post.featured_media_url,
    createdDate: post.date,
    slug: post.slug,
    categoriesId: post.categories,
    viewCount: post.view_count,
    shortDescHTML: post.excerpt.rendered
  }
}

export function mappingCurrentUser(user) {
  return {
    id: user.id,
    email: user.email,
    nickname:user.nickname,
    avatar: user.avatar_urls[96]
  }
}

export function handleHashCategoryById(categories) {
  const hashObj = {}
  categories.forEach(categoryItem => {
    const key = categoryItem.id
    hashObj[key] = {
      id: categoryItem.id,
      name: categoryItem.name,
      slug: categoryItem.slug
    }
  });
  return hashObj
}

export function validateFormData({ value, name }) {
  let error = ''
  if (name === 'username' && !value) {
    error = "Username không được rỗng"
  }

  if (name === 'password') {
    if (!value) error = 'Password không được rỗng'
    else if (value.length < 6) error = 'Password phải có ít nhất 6 ký tự'
  }
  return error
}