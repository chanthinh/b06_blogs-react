import Button from "../shared/Button"


function PageNotFound() {
    return (
        <div className="articles-list section">
            <div className="tcl-container">
                <div className="tcl-row tcl-jc-center">
                    <div className="tcl-col-3">
                        <img src="https://cdn.tgdd.vn/hoi-dap/580732/loi-404-not-found-la-gi-9-cach-khac-phuc-loi-404-not-3-800x534.jpg" alt='Page Not Found'></img>
                    </div>
                    <div className="tcl-col-5">
                        <h2>Không tìm thấy trang vui lòng thử lại sau</h2>
                        <Button size='large' href='/' as='a'>Trở về trang chủ</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageNotFound