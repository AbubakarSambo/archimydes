import React, { useEffect, useContext } from 'react'
import styled from 'styled-components'
import { Table, Button } from 'antd'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import API_URL, { columns, isExpired } from '../utils/utility'
import StoriesContext from '../utils/context'

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
const AdminStoryList = () => {
  const history = useHistory()
  const {
    adminStories,
    setActiveStory,
    setAdminStories,
    fetched,
    setFetched,
  } = useContext(StoriesContext)
  useEffect(() => {
    if (isExpired()) {
      localStorage.clear()
      history.push('/')
    }
    if (!fetched) {
      axios.get(`${API_URL}/stories`).then((response) => {
        const { data: dataFromApi } = response
        setAdminStories(
          dataFromApi.map((singleItem) => {
            return {
              ...singleItem,
              key: singleItem.id,
              status: '',
            }
          })
        )
      })
      setFetched(true)
    }
  }, [setAdminStories, fetched, setFetched, history])

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
        <Table
          rowClassName={(record, index) =>
            record.status === ''
              ? 'table-row-dark'
              : record.status === 'rejected'
              ? 'table-row-red'
              : 'table-row-green'
          }
          onRow={(record) => {
            return {
              onClick: () => {
                setActiveStory(record)
                history.push(`/adminlist/${record.id}`)
              },
            }
          }}
          columns={columns}
          dataSource={adminStories}
        />
      </div>
    </Wrapper>
  )
}

export default AdminStoryList
