import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Table, Button } from 'antd'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import API_URL, { columns, isExpired } from '../utils/utility'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 15px;
  margin: 20px;
`
const UserStoryList = () => {
  const [stories, setStories] = useState([])
  const history = useHistory()
  useEffect(() => {
    if (isExpired()) {
      localStorage.clear()
      history.push('/')
    }
    axios.get(`${API_URL}/stories`).then((response) => {
      const { data: dataFromApi } = response
      setStories(
        dataFromApi.map((singleItem) => {
          return {
            ...singleItem,
            key: singleItem.id,
          }
        })
      )
    })
  }, [setStories, history])

  function logout() {
    localStorage.removeItem('user')
    localStorage.removeItem('expiresAt')
    history.push('/')
  }
  return (
    <Wrapper>
      <div>
        <Header>
          <h3>List Of Stories</h3>
          <Button type="danger" onClick={logout}>
            Log out
          </Button>
        </Header>
        <Table bordered columns={columns} dataSource={stories} />
      </div>
    </Wrapper>
  )
}

export default UserStoryList
