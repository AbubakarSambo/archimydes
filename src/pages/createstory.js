import React, { useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { Form, Input, Button, Select, InputNumber } from 'antd'
import API_URL, { isExpired } from '../utils/utility'

const { Option } = Select

const Formwrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 10px;
`
const UserStory = () => {
  const history = useHistory()
  const [form] = Form.useForm()

  useEffect(() => {
    if (isExpired()) {
      localStorage.clear()
      history.push('/')
    }
  }, [history])

  const onFinish = (values) => {
    axios
      .post(`${API_URL}/stories`, { ...values, cost: parseFloat(values.cost) })
      .then(() => {
        history.push('/list')
      })
  }
  const onTypeChange = (value) => {
    switch (value) {
      case 'enhancement':
        form.setFieldsValue({ type: 'enhancement' })
        return
      case 'bugfix':
        form.setFieldsValue({ type: 'bugfix' })
        return
      case 'qa':
        form.setFieldsValue({ type: 'qa' })
        return
      case 'development':
        form.setFieldsValue({ type: 'development' })
        return
      default:
        return
    }
  }

  const onComplexityChange = (value) => {
    switch (value) {
      case 'low':
        form.setFieldsValue({ complexity: 'low' })
        return
      case 'mid':
        form.setFieldsValue({ complexity: 'mid' })
        return
      case 'high':
        form.setFieldsValue({ complexity: 'high' })
        return
      default:
        return
    }
  }
  function logout() {
    localStorage.removeItem('user')
    localStorage.removeItem('expiresAt')
    history.push('/')
  }

  return (
    <Formwrapper data-testid="create">
      <div>
        <Header>
          <h3>Create a Story</h3>
          <Button type="danger" onClick={logout}>
            Log out
          </Button>
        </Header>
        <Form form={form} name="basic" onFinish={onFinish}>
          <Form.Item
            label="Summary"
            name="summary"
            rules={[{ required: true, message: 'Please input Summary!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: 'Please input the description!' },
            ]}
          >
            <Input.TextArea rows={5} />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: 'Please input the type!' }]}
            label="Type"
            name="type"
          >
            <Select onChange={onTypeChange}>
              <Option value="enhancement">Enhancement</Option>
              <Option value="bugfix">Bug-Fix</Option>
              <Option value="qa">QA</Option>
              <Option value="development">Development</Option>
            </Select>
          </Form.Item>
          <Form.Item
            rules={[
              { required: true, message: 'Please input the complexity!' },
            ]}
            label="Complexity"
            name="complexity"
          >
            <Select onChange={onComplexityChange}>
              <Option value="low">Low</Option>
              <Option value="mid">Mid</Option>
              <Option value="high">High</Option>
            </Select>
          </Form.Item>
          <Form.Item
            rules={[
              { required: true, message: 'Please input the estimated time!' },
            ]}
            label="Estimated Time(Hrs)"
            name="estimatedHrs"
          >
            <Input />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: 'Please input the cost!' }]}
            label="Cost"
            name="cost"
          >
            <InputNumber
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Formwrapper>
  )
}

export default UserStory
