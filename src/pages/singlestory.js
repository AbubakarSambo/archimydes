import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { Card, Button } from 'antd'
import styled from 'styled-components'
import API_URL, { isExpired } from '../utils/utility'
import StoriesContext from '../utils/context'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`
const CardRow = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`

const StyledButton = styled.button`
  background-color: green;
  margin-right: 10px;
  height: 32px;
  padding: 4px 15px;
  font-size: 14px;
  border-radius: 2px;
  color: #fff;
  border: 1px solid transparent;
  cursor: pointer;
  padding: ;
`

const H3 = styled.h3`
  flex-grow: 1;
`
const Detail = styled.p`
  flex-grow: 4;
  line-height: 28px;
`

const SingleStory = ({ activeStory }) => {
  const history = useHistory()
  const { adminStories, setActiveStory, setAdminStories } = useContext(
    StoriesContext
  )

  useEffect(() => {
    if (isExpired()) {
      localStorage.clear()
      history.push('/')
    }
    if (!activeStory.summary) {
      const id = window.location.pathname.split('/')[2]

      axios.get(`${API_URL}/stories/${id}`).then((response) => {
        setActiveStory(response.data)
      })
    }
  }, [activeStory.summary, setActiveStory, history])

  function handleAction(status) {
    const dataIndex = adminStories.findIndex(
      (story) => story.id === activeStory.id
    )
    if (dataIndex !== -1) {
      adminStories.splice(dataIndex, 1, { ...activeStory, status })
      setAdminStories([...adminStories])
    }
    history.push('/adminlist')
  }
  return (
    <Wrapper>
      <div>
        <Card title="User Story" bordered style={{ width: 400 }}>
          <CardRow>
            <H3>Summary:</H3>
            <Detail>{activeStory?.summary}</Detail>
          </CardRow>
          <CardRow>
            <H3>Description:</H3>
            <Detail>{activeStory?.description}</Detail>
          </CardRow>
          <CardRow>
            <H3>Type:</H3>
            <Detail>{activeStory?.type}</Detail>
          </CardRow>
          <CardRow>
            <H3>Complexity:</H3>
            <Detail>{activeStory?.complexity}</Detail>
          </CardRow>
          <CardRow>
            <H3>Est. Time:</H3>
            <Detail>
              {activeStory?.estimatedHrs} hr
              {activeStory?.estimatedHrs > 1 ? 's' : ''}
            </Detail>
          </CardRow>
          <CardRow>
            <H3>Cost:</H3>
            <Detail>${activeStory?.cost}</Detail>
          </CardRow>
          <CardRow>
            <H3>Status:</H3>
            <Detail>{activeStory?.status || 'Not Set'}</Detail>
          </CardRow>

          <StyledButton onClick={() => handleAction('approved')}>
            Accept
          </StyledButton>
          <Button type="danger" onClick={() => handleAction('rejected')}>
            Reject
          </Button>
        </Card>
      </div>
    </Wrapper>
  )
}

export default SingleStory
