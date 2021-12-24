import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const handleMapMainMenu = menuItem => {
    return (
        <li key={menuItem.id}>
            {
                menuItem.url.startsWith('http')
                    ? <a href={menuItem.url} target="_blank" rel="noreferrer">{menuItem.title}</a>
                    : <Link to={menuItem.url}>{menuItem.title}</Link>
            }
            {
                menuItem.childItems.length > 0 && (
                    <ul>
                        {
                            menuItem.childItems.map(handleMapMainMenu)
                        }
                    </ul>
                )
            }
        </li>
    )
}

function HeaderMainMenu() {
    const mainMenus = useSelector(state => state.Menu.mainMenus)

    return (
        <ul className="header-nav__lists">
            {
                mainMenus.map(handleMapMainMenu)
            }
            {/* <li><a href="/">Home</a></li>
            <li>
                <a href="/">Our Team</a>
                <ul>
                    <li><a href="/">Our Team 1</a></li>
                    <li><a href="/">Our Team 2</a></li>
                    <li><a href="/">Our Team 3</a></li>
                </ul>
            </li>
            <li>
                <a href="/">Contact</a>
                <ul>
                    <li><a href="/">Contact 1</a></li>
                    <li><a href="/">Contact 2</a></li>
                    <li>
                        <a href="/">Contact 3</a>
                        <ul>
                            <li><a href="/">Contact 11</a></li>
                            <li><a href="/">Contact 12</a></li>
                            <li><a href="/">Contact 13</a></li>
                        </ul>
                    </li>
                </ul>
            </li> */}
        </ul>
    )
}

export default HeaderMainMenu