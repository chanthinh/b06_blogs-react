import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"


export function useNotAuthenticated() {
    const history = useHistory()
    const isAuthenticated = useSelector(state => Boolean(state.Auth.token))

    useEffect(() => {
        if (isAuthenticated) {
          history.push('/')
        }
      }, [isAuthenticated])
}