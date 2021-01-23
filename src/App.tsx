import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './theme.scss';
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
import { useStore } from './store/store';
import currService from './services/currService';

function App() {
  const [loading, setLoading] = useState(true);
  const state: any = useStore()[0];
  const dispatch: any = useStore(false)[1];

  useEffect(() => {
    let updatedState: any = []
    currService.fetchItems().then(response => {
      updatedState = response;
      dispatch('LIST_CURRENCY', { updatedState });
    })
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, []);


  return (
    <div className={`App ${state.theme}`}>
      {loading ?
        // <Transition in={loading} timeout={300}>
        //   {state => { <div style={{ opacity: state === 'exited' ? 0 : 1 }}><LoadingPage /> </div> }}

        // </Transition>
        <LoadingPage />
        :
        <Layout>
          <div className={`app-bg`}>
            <div className={`bg-vector ${state.theme}`}>
              <div className="pt-6" style={{ height: "100%", overflow: "auto", paddingTop: "60px" }}>
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
