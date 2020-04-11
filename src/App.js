import React, { useState } from 'react'
import axios from 'axios'
import 'antd/dist/antd.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './pages/login'
import CreateStory from './pages/createstory'
import SingleStory from './pages/singlestory'
import UserStoryList from './pages/userstorylist'
import AdminStoryList from './pages/adminstorylist'
import StoriesContext from './utils/context'

import './App.scss'

const user = JSON.parse(localStorage.getItem('user'))
const accessToken = user?.token
axios.defaults.headers.common.Authorization = `${accessToken || ''}`

function App() {
  const [adminStories, setAdminStories] = useState([])
  const [activeStory, setActiveStory] = useState({})
  const [fetched, setFetched] = useState(false)
  return (
    <StoriesContext.Provider
      value={{
        adminStories,
        setAdminStories,
        setActiveStory,
        fetched,
        setFetched,
      }}
    >
      <Router>
        <Route exact path="/" component={Login} />
        <div>
          <Route exact path="/story" component={CreateStory} />
          <Route exact path="/list" component={UserStoryList} />
          <Route exact path="/adminlist" component={AdminStoryList} />
          <Route
            exact
            path="/adminlist/:id"
            render={() => <SingleStory activeStory={activeStory} />}
          />
        </div>
      </Router>
    </StoriesContext.Provider>
  )
}

export default App
