import './login.css'
import { Link } from "react-router-dom"
import Input from '../../components/shared/Input'
import Button from '../../components/shared/Button'
import { useState } from 'react'
import { validateFormData } from '../../helpers'
import { useDispatch } from 'react-redux'
import { actLoginAsync } from '../../store/auth/actions'

function LoginPage() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState('')
  const [isFormDirty, setIsFormDirty] = useState(false)
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

  function handleOnChange(evt) {
    const name = evt.target.name
    const value = evt.target.value.trim()
    const error = validateFormData({ value, name })

    setFormData({
      ...formData,
      [name]: {
        value,
        error
      }
    })

    setIsFormDirty(true)
  }

  function checkFormIsValid() {
    if (!isFormDirty) {
      setFormData({
        username: {
          value: '',
          error: validateFormData({
            value: '',
            name: 'username'
          })
        },
        password: {
          value: '',
          error: validateFormData({
            value: '',
            name: 'password'
          })
        }
      })
      return false
    }

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
    const { username, password } = formData
    if (loading) {
      return
    }
    setLoading(true)
    setFormError('')

    dispatch(actLoginAsync(username.value, password.value))
      .then(res => {
        if (res.ok) {
          console.log('Thành công', res)
        } else {
          console.log('error', res.error)
          setFormError(res.error)
        }
        setLoading(false)
      })
  }

  return (
    <main className="login">
      <div className="spacing" />
      <div className="tcl-container">
        <div className="tcl-row">
          <div className="tcl-col-12 tcl-col-sm-6 block-center">
            <h1 className="form-title text-center">Đăng nhập</h1>
            <div className="form-login-register">
              <p className='form-login__error'>{formError}</p>
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
                  <Button type="primary" size="large" loading={loading}>Đăng nhập</Button>
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