import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Catalog from "./components/Catalog/Catalog.jsx";
import History from "./components/History/History";
import Banner from "./components/Banner/Banner";
import Alert from "./components/Alert/Alert";
import { Provider } from "react-redux";
import store from "./redux/store";

export const Context = React.createContext({
  openList: null,
  setOpenList: () => {},
  openAlert: null,
  setOpenAlert: () => {},
  openAlertPoints: null,
  setOpenAlertPoints: () => {},
  trackScrolling: null,
  setTrackScrolling: () => {},
});

function App() {
  const [openList, setOpenList] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openAlertPoints, setOpenAlertPoints] = useState(false);
  const [trackScrolling, setTrackScrolling] = useState(0);

  return (
    <Provider store={store}>
      <Context.Provider
        value={{
          openList,
          setOpenList,
          openAlert,
          setOpenAlert,
          openAlertPoints,
          setOpenAlertPoints,
          trackScrolling, 
          setTrackScrolling
        }}
      >
        <BrowserRouter>
          <Route path="/" component={Navbar} />
          <Route exact path="/" component={Banner} />
          <Route exact path="/" component={Catalog} />
          <Route exact path="/history" component={History} />
          <Route exact path="/alert" component={Alert} />
        </BrowserRouter>
      </Context.Provider>
    </Provider>
  );
}

export default App;
