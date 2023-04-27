import { useDispatch, useSelector } from "react-redux";
import { Sidebar } from "./components";
import React from "react";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";

function App() {
  const profile = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  //проверка на авторизацию
  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return <Sidebar profile={profile} />;
}

export default App;
