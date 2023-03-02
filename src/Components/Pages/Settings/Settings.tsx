import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import api from '../../../Api';
import useInput from '../../../CustomHooks/UseInput';
import { UserInfoDto, UserInfoDtoWithoutPassword } from '../../../Types/Types';
import './Settings.css';

interface ISettingsProps {
    children: React.ReactNode;
    userInfo: UserInfoDtoWithoutPassword;
    setGameWindow: () => void
}

const Settings : React.FC<ISettingsProps> = ({ children, userInfo, setGameWindow }) => {
    const [showPasswordFields, setPasswordFields] = useState<boolean>(false);
    const [showAvatarInput, setAvatarInput] = useState<boolean>(false);

    const [isMusic, setMusic] = useState<boolean>(userInfo.isMusic);
    const [isActive, setActive] = useState<boolean>(userInfo.isInGame);
    const [avatarLink, setAvatarLink] = useState<string>(userInfo.avatarFileName);
    const name = useInput(userInfo.name, { isEmpty: true, minLength: 2, maxLength: 50 });
    const surname = useInput(userInfo.surname, { isEmpty: true, minLength: 2, maxLength: 50 });
    const age = useInput(`${userInfo.age}`, { isContainSpaces: false, minValue: 0, maxValue: 150, isNumber: true});
    const oldPassword = useInput("", { isContainSpaces: true })
    const newPassword = useInput("", { isContainSpaces: false, minLength: 6, maxLength: 50 });

    let timeout: NodeJS.Timeout;
    const dispatch = useDispatch();

    function infoSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        let newInfo: UserInfoDto = {
            login: userInfo.login,
            email: userInfo.email,
            avatarFileName: avatarLink,
            age: Number(age.value),
            name: name.value,
            surname: surname.value,
            isInGame: isActive,
            isMusic: isMusic,
            password: oldPassword.value !== "" ? oldPassword.value : null,
            newPassword: newPassword.value !== "" ? newPassword.value : null
        }
        changeUserInfo(newInfo);
        setGameWindow();
    }

    function changeUserInfo(info: UserInfoDto) {
        clearTimeout(timeout);
        dispatch({type: "SET_ISMESSAGE", payload: false});

        let url = "https://localhost:5177/innogotchi/users/user-info";
        api.put(url, info)
        .then((response) => {
            console.log(response.data);
        })
        .catch((ex) => {
            dispatch({type: "SET_MESSAGE", payload: ex.response.data});
            dispatch({type: "SET_ISMESSAGE", payload: true});

            timeout = setTimeout(function () {
                dispatch({type: "SET_ISMESSAGE", payload: false});
            }, 3000);
        });
    }

    const onChangeLink = (e : React.FormEvent<HTMLInputElement>) => {
        setAvatarLink(e.currentTarget.value)
    }

    return (
        <section id='settings' className='section_base'>
            {children}
            <form className='user_info' onSubmit={(e) => infoSubmit(e)}>
                <div className='guest_avatar_wrapper'>
                    <div className="guest_avatar user_info_avatar" onClick={() => setAvatarInput(!showAvatarInput)} style={
                        userInfo.avatarFileName === "ava_default.png" ? {backgroundImage: `url(assets/ava_default.png)`} : {backgroundImage: `url(${userInfo?.avatarFileName})`}
                    }>
                        <div className='avatar_blackout'></div>
                    </div>
                    <h2>{userInfo?.login}</h2>
                </div>
                {showAvatarInput &&
                    <div>
                        <input onChange={(e) => onChangeLink(e)} value={avatarLink} className='info_text_input' type="text" placeholder='Image URL...'/>
                        <div onClick={() => setAvatarLink("ava_default.png")} className='set_default_ava'>Set default</div>
                    </div>                    
                }
                {(name.isDirty && name.isEmptyError) && <div>Name could not be empty.</div>}
                {(name.isDirty && name.isMinLengthError) && <div>Name must be longer than 0 characters.</div>}
                {(name.isDirty && name.isMaxLengthError) && <div>Name must be shorter than 50 characters.</div>}
                <div>
                    <p>Name:</p>
                    <input onChange={(e) => name.onChange(e)} onBlur={(e) => name.onBlur(e)} value={name.value} className='info_text_input' type="text" placeholder='Name...'/>
                </div>
                {(surname.isDirty && surname.isEmptyError) && <div>Surname could not be empty.</div>}
                {(surname.isDirty && surname.isMinLengthError) && <div>Surname must be longer than 0 characters.</div>}
                {(surname.isDirty && surname.isMaxLengthError) && <div>Surname must be shorter than 50 characters.</div>}
                <div>
                    <p>Surname:</p>
                    <input onChange={(e) => surname.onChange(e)} onBlur={(e) => surname.onBlur(e)} value={surname.value} className='info_text_input' type="text" placeholder='Surname...'/>
                </div>
                <div>
                    <p>Email:</p>
                    <h3>{userInfo.email}</h3>
                </div>
                {(age.isDirty && age.isContainSpaceError) && <div>Age could not contain spaces.</div>}
                {(age.isDirty && age.isMinValueError && !age.isNumberError) && <div>Age must be not less than 0.</div>}
                {(age.isDirty && age.isMaxValueError && !age.isNumberError) && <div>Age must be less than 150.</div>}
                {(age.isDirty && age.isNumberError) && <div>Age must be a number.</div>}   
                <div>                 
                    <p>Age:</p>
                    <input onChange={(e) => age.onChange(e)} onBlur={(e) => age.onBlur(e)} value={age.value} type="text" className='age_input info_text_input' placeholder='Age...'/>
                </div>
                <div className='space_between'>
                    <p>Activity status:</p>
                    <div className='button_div'>
                        <h3>Online</h3>
                        <div className='radio_button'>
                            <input defaultChecked={isActive} type="checkbox" className='radio_button_checkbox' id='activity_checkbox'/>
                            <label onClick={() => setActive(!isActive)} htmlFor="activity_checkbox" className='radio_button_circle'></label>
                        </div>
                        <h3>Offline</h3>
                    </div>
                </div>
                <div className='space_between'>
                    <p>On / Off music:</p>
                    <div className='button_div'>
                        <h3>On</h3>
                        <div className='radio_button'>
                            <input defaultChecked={isMusic} type="checkbox" className='radio_button_checkbox' id='music_checkbox'/>
                            <label onClick={() => setMusic(!isMusic)} htmlFor="music_checkbox" className='radio_button_circle'></label>
                        </div>
                        <h3>Off</h3>
                    </div>
                </div>
                <div>
                    <div onClick={() => {setPasswordFields(!showPasswordFields)}} className='change_password_button'>Change password</div>                    
                </div>
                {showPasswordFields &&
                    <>
                        {(oldPassword.isDirty && oldPassword.isEmptyError) && <div>Please, enter a password.</div>}
                        {(oldPassword.isDirty && oldPassword.isContainSpaceError) && <div>Password must not contain spaces.</div>}
                        <div>
                            <input onChange={(e) => oldPassword.onChange(e)} onBlur={(e) => oldPassword.onBlur(e)} className='max_width_input info_text_input' type="password" placeholder="Old password..."/>
                        </div>
                        {(newPassword.isDirty && newPassword.isEmptyError) && <div>Password could not be empty.</div>}
                        {(newPassword.isDirty && newPassword.isContainSpaceError) && <div>Password could not contain spaces.</div>}
                        {(newPassword.isDirty && newPassword.isMinLengthError) && <div>Password must be longer than 5 characters.</div>}
                        {(newPassword.isDirty && newPassword.isMaxLengthError) && <div>Password must be shorter than 50 characters.</div>}     
                        <div>                   
                            <input onChange={(e) => newPassword.onChange(e)} onBlur={(e) => newPassword.onBlur(e)} className='max_width_input info_text_input' type="password" placeholder="New password..."/>
                        </div>
                    </>
                }
                <div>
                    <input disabled={!(((showPasswordFields && oldPassword.isInputValid && newPassword.isInputValid) || !showPasswordFields) && 
                        name.isInputValid && surname.isInputValid && age.isInputValid)}
                        className='max_width_button' id='info_submit_button' type="submit" value="Submit"/>
                </div>
            </form>
        </section>
    );
}

export default Settings;