import './App.css';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from "./libs/state-management/";
import { Route, BrowserRouter as Router, Routes, useParams} from 'react-router-dom';
import Main from './page/main';
import { DetailPage, HomePage } from './page';


function App() {

  return (
    <>
    <Router>
    <Provider store={store}>
     <Main></Main>
     <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/detail/:id" element={<DetailPage />} />
          </Routes>
     </Provider>

    </Router>

   
    </>
  );
}

export default App;
