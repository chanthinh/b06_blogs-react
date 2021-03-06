import { DEFAULT_AVATAR, MESSAGE_FORM_ERROR, ROUTER_POST } from "../constants";

export { formatRelativeDate } from './day'

export function getQueryStr(name, location) {
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
    nickname: user.nickname,
    avatar: user.avatar_urls[96]
  }
}

export const mappingMainMenus = menuItem => {
  const data = {
    id: menuItem.ID,
    url: menuItem.url,
    title: menuItem.title,
    childItems: menuItem.child_items || []
  }
  data.childItems = data.childItems.map(mappingMainMenus)
  return data
}

export const mappingComment = commentItem => {
  return {
    id: commentItem.id,
    postId: commentItem.post,
    parentId: commentItem.parent,
    authorName: commentItem.author_name,
    authorAvatar: commentItem.author_data.avatar || DEFAULT_AVATAR,
    contentHTML: commentItem.content.rendered,
    createdDate: commentItem.date,
    authorId: commentItem.author,
    replyCount: commentItem.comment_reply_count
  }
}

export function mappingPostDetailData(post) {
  return {
    ...mappingPostData(post),
    tagsId: post.tags,
    contentHTML: post.content.rendered,
    commentCount: post.comment_count
  }
}

export function handleHashCategoryById(categories) {
  const hashObj = {}
  categories.forEach(categoryItem => {
    const key = categoryItem.id
    hashObj[key] = {
      id: categoryItem.id,
      name: categoryItem.name,
      slug: categoryItem.slug,
      lang: categoryItem.lang
    }
  });
  return hashObj
}

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export function validateFormData({ value, name }) {
  let error = ''
  if (name === 'username' && !value) {
    error = "Username kh??ng ???????c r???ng"
  }

  if (name === 'password') {
    if (!value) error = 'Password kh??ng ???????c r???ng'
    else if (value.length < 6) error = 'Password ph???i c?? ??t nh???t 6 k?? t???'
  }
  return error
}

export function validateFormRegister({ value, name }) {
  let error = ''

  if (name === 'email') {
    if (!value) {
      error = MESSAGE_FORM_ERROR.email_required
    }
    else if (!validateEmail(value)) {
      error = MESSAGE_FORM_ERROR.rest_user_invalid_email
    }
  } else if (name === 'username' && !value) {
    error = MESSAGE_FORM_ERROR.username_required
  } else if (name === 'password') {
    if (!value) {
      error = MESSAGE_FORM_ERROR.password_required
    } else if (value.length < 6) {
      error = MESSAGE_FORM_ERROR.password_length
    }
  }
  return error
}

export function highlightText(queryStr, targetStr) {
  const reg = new RegExp(queryStr, 'gi');
  const final_str = targetStr.replace(reg, str => {
    return '<mark>' + str + '</mark>'
  });
  return final_str
}

export function genUserLink(authorId) {
  return `/user/${authorId}`
}

export function genPostLink(slug) {
  return ROUTER_POST.replace(':slug', slug)
}