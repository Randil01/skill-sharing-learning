
import { Routes, Route, useNavigate } from "react-router-dom";
import Authentication from './componets/authentication/Authentication';
import Homepage from './componets/home/home';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from './Store/Auth/Action';

function App() {

  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector(store => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (jwt) {
      dispatch(getUserProfile(jwt));
      navigate("/home");
    }
  }, [auth.jwt, dispatch, jwt, navigate]);

  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={auth.user ? <Homepage /> : <Authentication />} />
      </Routes>
    </div>
  );
}

export default App;
