import React from "react"
import Header from "../common/header/Header"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Home from "../home/Home"

import RECENT from "../home/Recent"

const Pages = () => {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/Recent' component={RECENT} />
          
        </Switch>
      </Router>
    </>
  )
}

export default Pages
