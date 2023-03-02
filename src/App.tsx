import StartMenu from "./Components/Pages/StartMenu/StartMenu";
import AuthorizationMenu from "./Components/Pages/AuthorizationMenu/AuthorizationMenu";
import LogInMenu from "./Components/Pages/LogInMenu/LogInMenu";
import RegistrationMenu from "./Components/Pages/RegistrationMenu/RegistrationMenu";
import GameField from "./Components/Pages/GameField/GameField";
import BackButton from "./Components/Buttons/BackButton/BackButton";
import FarmsMenu from "./Components/Pages/FarmsMenu/FarmsMenu";

import "./App.css";
import { Windows } from "./Enums/Enums";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import api from "./Api";

function App() {
  const [window, setWindow] = useState<string>(Windows.START);
  const isMessage = useSelector((state: RootState) => state.isMessage);
  const message = useSelector((state: RootState) => state.message);
  const dispatch = useDispatch();
  let timeout: NodeJS.Timeout;

  useEffect(() => {
    clearTimeout(timeout);
    dispatch({type: "SET_ISMESSAGE", payload: false});

    api.get("https://localhost:5177/innogotchi/users/isautorized")
    .then((response) => {
      if (response.data === true) {
        setWindow(Windows.FARMS)
      }
      else {
        setWindow(Windows.START);
      }
    })
    .catch((ex) => {
      dispatch({type: "SET_MESSAGE", payload: ex.response.data});
      dispatch({type: "SET_ISMESSAGE", payload: true});

      timeout = setTimeout(function () {
          dispatch({type: "SET_ISMESSAGE", payload: false});
      }, 3000);
    });
  }, [])

  function setMainWindow(str: string) {
    setWindow(str);
  }

  return (
    <>
      {isMessage && <div className="message message_animation">{message}</div>}
      {window === Windows.START && 
        <StartMenu startClick={() => setWindow(Windows.AUTH)}></StartMenu>
      }
      {window === Windows.AUTH && 
        <AuthorizationMenu regClick={() => setWindow(Windows.REG)} logInClick={() => setWindow(Windows.LOGIN)}>
          <BackButton backClick={() => setWindow(Windows.START)}></BackButton>
        </AuthorizationMenu>
      }
      {window === Windows.REG && 
        <RegistrationMenu registerClick={() => setWindow(Windows.AUTH)}>
          <BackButton backClick={() => setWindow(Windows.AUTH)}></BackButton>
        </RegistrationMenu>
      }
      {window === Windows.LOGIN && 
        <LogInMenu logInClick={() => setWindow(Windows.FARMS)}>
          <BackButton backClick={() => setWindow(Windows.AUTH)}></BackButton>
        </LogInMenu>
      }
      {window === Windows.FARMS && 
        <FarmsMenu farmClick={() => setWindow(Windows.GAME)}>
          <BackButton backClick={() => setWindow(Windows.AUTH)}></BackButton>
        </FarmsMenu>
      }
      {window === Windows.GAME && 
        <GameField setMainWindow={setMainWindow}>
          <BackButton backClick={() => setWindow(Windows.FARMS)}></BackButton>
        </GameField>
      }
    </>
  );
}


export default App;
