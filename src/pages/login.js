import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { Form, Input, Button, Switch } from 'antd'
import API_URL, { setExpiration } from '../utils/utility'

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #9090901c;
`
const LoginBox = styled.div`
  min-width: 300px;
  border: 1px solid rgb(225, 228, 226);
  border-radius: 5px;
  display: flex;
  justify-content: center;
  padding: 80px;
  background-color: white;
`
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
}

export const Login = () => {
  const [isAdmin, toggleIsAdmin] = useState(false)

  const history = useHistory()
  const onFinish = (values) => {
    axios.post(`${API_URL}/signin`, { ...values, isAdmin }).then((response) => {
      const { data } = response
      setExpiration()
      localStorage.setItem('user', JSON.stringify(data))
      axios.defaults.headers.common.Authorization = `${data?.token || ''}`
      data.role === 'user' ? history.push('/story') : history.push('/adminlist')
    })
  }
  return (
    <PageWrapper data-testid="login">
      <LoginBox>
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your Email!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item label="Admin">
            <Switch
              checked={isAdmin}
              onChange={() => toggleIsAdmin((isAdmin) => !isAdmin)}
            />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </LoginBox>
    </PageWrapper>
  )
}

export default Login
