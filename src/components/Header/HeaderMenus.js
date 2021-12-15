import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { actLogout } from "../../store/auth/actions"
import HeaderMainMenu from './HeaderMainMenu'

function HeaderMenus() {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.Auth.currentUser)

  function handleLogout(evt) {
    evt.preventDefault()
    dispatch(actLogout())
  }

  return (
    <div className="tcl-col-6">
      {/* Nav */}
      <div className="header-nav">
        <HeaderMainMenu />
        <ul className="header-nav__lists">
          {
            currentUser ? (
              <li className="user">
                <Link to="/dashboard"><i className="icons ion-person" />{currentUser.nickname}</Link>
                <ul>
                  <li><a href='/' onClick={handleLogout}>Đăng Xuất</a></li>
                </ul>
              </li>
            ) : (
              <li className="user">
                <Link to="/login"><i className="icons ion-person" /> Tài khoản</Link>
              </li>
            )
          }
        </ul>
      </div>
    </div>
  )
}

export default HeaderMenus