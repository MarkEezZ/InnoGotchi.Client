import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import api from "../../../Api";
import useInput from "../../../CustomHooks/UseInput";
import { UserForAuthorizationDto } from "../../../Types/Types";
import "./LogInMenu.css";

interface ILogInMenuProps {
    logInClick: () => void;
    children: React.ReactNode;
}

const LogInMenu : React.FC<ILogInMenuProps> = ( {logInClick, children} ) => {
    const login = useInput("", { isEmpty: true, isContainSpaces: true });
    const password = useInput("", { isEmpty: true, isContainSpaces: true })
    const dispatch = useDispatch();
    let timeout: NodeJS.Timeout;

    function logInSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        clearTimeout(timeout);        
        dispatch({type: "SET_ISMESSAGE", payload: false});

        let userData: UserForAuthorizationDto = {
            login: login.value,
            password: password.value
        }

        let url = 'https://localhost:5177/innogotchi/users/log-in';
        api.post(url, userData)
        .then(() => {
            logInClick();
        })
        .catch((ex) => {
            dispatch({type: "SET_MESSAGE", payload: ex.response.data});
            dispatch({type: "SET_ISMESSAGE", payload: true});

            timeout = setTimeout(function () {
                dispatch({type: "SET_ISMESSAGE", payload: false});
            }, 3000);
        });            
    }

    return(
        <section id="log_in_section" className="section_base padd_b_base">
            {children}
            <form id="l_form" onSubmit={(e) => logInSubmit(e)}>
                <h2 className="black_rounded_h">Authorization</h2>
                <div>
                    {(login.isDirty && login.isEmptyError) && <div>Please, enter a login.</div>}
                    {(login.isDirty && login.isContainSpaceError) && <div>Login must not contain spaces.</div>}
                    <input onChange={(e) => login.onChange(e)} onBlur={(e) => login.onBlur(e)} value={login.value} type="text" id="l_login" placeholder="Login..."/>

                    {(password.isDirty && password.isEmptyError) && <div>Please, enter a password.</div>}
                    {(password.isDirty && password.isContainSpaceError) && <div>Password must not contain spaces.</div>}
                    <input onChange={(e) => password.onChange(e)} onBlur={(e) => password.onBlur(e)} value={password.value} type="password" id="l_password" placeholder="Password..."/>
                </div>
                <input disabled={!(login.isInputValid && password.isInputValid)} type="submit" id="l_submit" value="Log In"/>
            </form>
        </section>
    );
}

export default LogInMenu;