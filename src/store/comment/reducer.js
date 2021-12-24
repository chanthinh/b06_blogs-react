import { ACT_FETCH_COMMENTS_PARENT, ACT_INIT_CHILDREN_PAGING } from "./actions";

const initState = {
    parentPaging: {
        list: [],
        currentPage: 1
    },
    hashChildPaging: {}
}

function reducer(commentState = initState, action) {
    switch (action.type) {
        case ACT_FETCH_COMMENTS_PARENT:
            return {
                ...commentState,
                parentPaging: {
                    ...commentState.parentPaging,
                    list: action.payload.currentPage === 1
                        ? action.payload.comments
                        : [
                            ...commentState.parentPaging.list,
                            ...action.payload.comments
                        ],
                    total: action.payload.total,
                    totalPages: action.payload.totalPages,
                    currentPage: action.payload.currentPage
                }
            }
        case ACT_INIT_CHILDREN_PAGING:
            return {
                ...commentState,
                hashChildPaging: {
                    ...commentState.hashChildPaging,
                    ...action.payload.comments.reduce((output, commentItem) => {
                        if (commentItem.replyCount > 0) {
                            output[commentItem.id] = {
                                list: [],
                                currentPage: 0,
                                total: 0,
                                totalPages: 1
                            }
                        }
                        return output
                    }, {})
                }
            }
        default:
            return commentState
    }
}

export default reducer