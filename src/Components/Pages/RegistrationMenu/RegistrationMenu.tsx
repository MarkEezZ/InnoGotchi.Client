import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import api from "../../../Api";
import useInput from "../../../CustomHooks/UseInput";
import { UserForRegistrationDto } from "../../../Types/Types";
import "./RegistrationMenu.css";

interface IRegistrationMenuProps {
    registerClick: () => void;
    children: React.ReactNode;
}

const RegistrationMenu : React.FC<IRegistrationMenuProps> = ({ registerClick, children }) => {

    const login = useInput("", { isEmpty: true, isContainSpaces: false, minLength: 5, maxLength: 50 });
    const email = useInput("", { isEmpty: true, isEmail: true });
    const password = useInput("", { isEmpty: true, isContainSpaces: false, minLength: 6, maxLength: 50 });
    const passwordConfirm = useInput("", { isEmpty: true, isContainSpaces: false, minLength: 6, maxLength: 50 });
    const name = useInput("", { isEmpty: true, minLength: 2, maxLength: 50 });
    const surname = useInput("", { isEmpty: true, minLength: 2, maxLength: 50 });
    const age = useInput("", { isContainSpaces: false, minValue: 0, maxValue: 150, isNumber: true});
    const dispatch = useDispatch();
    let timeout: NodeJS.Timeout;

    function registerSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        clearTimeout(timeout);
        dispatch({type: "SET_ISMESSAGE", payload: false});

        let userData: UserForRegistrationDto = {
            login: login.value,
            email: email.value,
            password: password.value,
            passwordConfirm: passwordConfirm.value,
            name: name.value,
            surname: surname.value,
            age: Number(age.value)
        }

        let url = 'https://localhost:5177/innogotchi/users/register';
        api.post(url, userData)
        .then(() => {
            registerClick();
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
        <section id="registration_section" className="section_base padd_b_base">
            {children}
            <form id="r_form" onSubmit={(e) => registerSubmit(e)}>
                <h2 className="black_rounded_h">Registration</h2>
                <div>
                    {(login.isDirty && login.isEmptyError) && <div>Login could not be empty.</div>}
                    {(login.isDirty && login.isContainSpaceError) && <div>Login could not contain spaces.</div>}
                    {(login.isDirty && login.isMinLengthError) && <div>Login must be longer than 4 characters.</div>}
                    {(login.isDirty && login.isMaxLengthError) && <div>Login must be shorter than 50 characters.</div>}
                    <input onChange={(e) => login.onChange(e)} onBlur={(e) => login.onBlur(e)} value={login.value} type="text" id="r_login" placeholder="Login..."/>

                    {(email.isDirty && email.isEmptyError) && <div>Email could not be empty.</div>}
                    {(email.isDirty && email.isEmailError) && <div>Invalid email adress.</div>}
                    <input onChange={(e) => email.onChange(e)} onBlur={(e) => email.onBlur(e)} value={email.value} type="email" id="r_email" placeholder="Email..."/>

                    {(password.isDirty && password.isEmptyError) && <div>Password could not be empty.</div>}
                    {(password.isDirty && password.isContainSpaceError) && <div>Password could not contain spaces.</div>}
                    {(password.isDirty && password.isMinLengthError) && <div>Password must be longer than 5 characters.</div>}
                    {(password.isDirty && password.isMaxLengthError) && <div>Password must be shorter than 50 characters.</div>}
                    <input onChange={(e) => password.onChange(e)} onBlur={(e) => password.onBlur(e)} value={password.value} type="password" id="r_password" placeholder="Password..."/>

                    {(passwordConfirm.isDirty && passwordConfirm.isEmptyError) && <div>Password could not be empty.</div>}
                    {(passwordConfirm.isDirty && passwordConfirm.isContainSpaceError) && <div>Password could not contain spaces.</div>}
                    {(passwordConfirm.isDirty && passwordConfirm.isMinLengthError) && <div>Password must be longer than 5 characters.</div>}
                    {(passwordConfirm.isDirty && passwordConfirm.isMaxLengthError) && <div>Password must be shorter than 50 characters.</div>}
                    {(passwordConfirm.isDirty && passwordConfirm.value !== password.value) && <div>Passwords do not match.</div>}
                    <input onChange={(e) => passwordConfirm.onChange(e)} onBlur={(e) => passwordConfirm.onBlur(e)} value={passwordConfirm.value} type="password" id="r_password_confirm" placeholder="Confirm password..."/>

                    {(name.isDirty && name.isEmptyError) && <div>Name could not be empty.</div>}
                    {(name.isDirty && name.isMinLengthError) && <div>Name must be longer than 1 characters.</div>}
                    {(name.isDirty && name.isMaxLengthError) && <div>Name must be shorter than 50 characters.</div>}
                    <input onChange={(e) => name.onChange(e)} onBlur={(e) => name.onBlur(e)} value={name.value} type="text" id="r_name" placeholder="Name..."/>

                    {(surname.isDirty && surname.isEmptyError) && <div>Surname could not be empty.</div>}
                    {(surname.isDirty && surname.isMinLengthError) && <div>Surname must be longer than 1 characters.</div>}
                    {(surname.isDirty && surname.isMaxLengthError) && <div>Surname must be shorter than 50 characters.</div>}
                    <input onChange={(e) => surname.onChange(e)} onBlur={(e) => surname.onBlur(e)} value={surname.value} type="text" id="r_surname" placeholder="Surname..."/>

                    {(age.isDirty && age.isContainSpaceError) && <div>Age could not contain spaces.</div>}
                    {(age.isDirty && age.isMinValueError && !age.isNumberError) && <div>Age must be not less than 0.</div>}
                    {(age.isDirty && age.isMaxValueError && !age.isNumberError) && <div>Age must be less than 150.</div>}
                    {(age.isDirty && age.isNumberError) && <div>Age must be a number.</div>}
                    <input onChange={(e) => age.onChange(e)} onBlur={(e) => age.onBlur(e)} value={age.value} type="text" id="r_age" placeholder="Age..."/>
                </div>
                <input disabled={!(login.isInputValid && email.isInputValid && password.isInputValid && passwordConfirm.isInputValid && 
                                   name.isInputValid && surname.isInputValid && age.isInputValid && passwordConfirm.value === password.value)} 
                                   type="submit" id="r_submit" value="Register"/>
            </form>
        </section>
    );
}

export default RegistrationMenu;