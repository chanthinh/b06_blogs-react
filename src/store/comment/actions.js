import commentService from "../../services/comment"



function actFetchCommentsAsync({
    perPage = 2,
    currentPage = 1,
    postId,
    parentId = 0,
}) {
    return async dispatch => {
        try {
            if (!postId) {
                throw new Error('Invalid PostId')
            }

            const response = await commentService.getList({
                perPage,
                currentPage,
                postId,
                parentId,
            })

            console.log('response', response);

        } catch (err) {
            //TODO...
        }
    }
}

export default actFetchCommentsAsync