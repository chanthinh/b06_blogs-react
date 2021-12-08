import './login.css'
import { Link } from "react-router-dom"
import Input from '../../components/shared/Input'
import Button from '../../components/shared/Button'
import { useState } from 'react'

function LoginPage() {
  const [formData, setFormData] = useState({
    username: {
      value: '',
      error: ''
    },
    password: {
      value: '',
      error: ''
    }
  })

  function validateFormData({ value, name }) {
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

  function handleOnChange(evt) {
    const name = evt.target.name
    const value = evt.target.value
    const error = validateFormData({ value, name })

    setFormData({
      ...formData,
      [name]: {
        value,
        error
      }
    })
  }

  function checkFormIsValid() {
    if (formData.username.error || formData.password.error) {
      return false
    }
    return true
  }

  function handleSubmit(evt) {
    evt.preventDefault()

    const isValid = checkFormIsValid()
    if (!isValid) {
      return console.log('Submit Error')
    }
    console.log('Submit Thành Công')
  }

  return (
    <main className="login">
      <div className="spacing" />
      <div className="tcl-container">
        <div className="tcl-row">
          <div className="tcl-col-12 tcl-col-sm-6 block-center">
            <h1 className="form-title text-center">Đăng nhập</h1>
            <div className="form-login-register">
              <form autoComplete="off" onSubmit={handleSubmit}>
                <Input
                  label="Tên đăng nhập"
                  placeholder="Nhập tên đăng nhập ..."
                  autoComplete="off"
                  name="username"
                  onChange={handleOnChange}
                  value={formData.username.value}
                  error={formData.username.error}
                  isShowError
                />
                <Input
                  type="password"
                  label="Mật khẩu"
                  placeholder="Nhập mật khẩu của bạn ..."
                  autoComplete="new-password"
                  name="password"
                  onChange={handleOnChange}
                  value={formData.password.value}
                  error={formData.password.error}
                  isShowError
                />

                <div className="d-flex tcl-jc-between tcl-ais-center">
                  <Button type="primary" size="large">Đăng nhập</Button>
                  <Link to="/register">Đăng ký</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="spacing" />
    </main>

  )
}

export default LoginPage