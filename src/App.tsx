import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.scss';
import Borrow from './components/View/Borrow/Borrow';
import Info from './components/View/Info/Info';
import Layout from './components/Layout/Layout';
import Lend from './components/View/Lend/Lend';
import Migrate from './components/View/Migrate/Migrate';
import Mining from './components/View/Mining/Mining';
import Swap from './components/View/Swap/Swap';
import LoadingPage from './components/View/UI/LoadingPage/LoadingPage';
import Redeem from './components/View/Redeem/Redeem';
import Repay from './components/View/Repay/Repay';
import { Transition } from 'react-transition-group';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])


  return (
    <div className="App">
      {loading ?
        // <Transition in={loading} timeout={300}>
        //   {state => { <div style={{ opacity: state === 'exited' ? 0 : 1 }}><LoadingPage /> </div> }}

        // </Transition>
        <LoadingPage />
        :
        <Layout>
          <div className="app-bg-light">
            <div className="bg-vector">
              <div style={{ height: "100%", overflow: "auto" }}>
                <Switch>
                  <Route path="/swap" exact component={Swap} />
                  <Route path="/lend" exact component={Lend} />
                  <Route path="/borrow" exact component={Borrow} />
                  <Route path="/migrate" exact component={Migrate} />
                  <Route path="/mining" exact component={Mining} />
                  <Route path="/redeem" exact component={Redeem} />
                  <Route path="/repay" exact component={Repay} />
                  <Route path="/info" exact component={Info} />
                  <Redirect from="/" to="/swap" />
                </Switch>
              </div>
            </div>
          </div>
        </Layout>}
    </div>
  );
}

export default App;
