import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../../Api';
import { RootState } from '../../../store';
import { GuestInfo } from '../../../Types/Types';
import GuestRecord from './GuestRecord/GuestRecord';
import './InviteFriends.css';

type InviteFriendsProps = {
    children: React.ReactNode,
    farmGuestsLocal: GuestInfo[],
    usersToInviteLocal: GuestInfo[]
}

const InviteFriends : React.FC<InviteFriendsProps> = ({ children, farmGuestsLocal, usersToInviteLocal }) => {
    const currentFarm = useSelector((state: RootState) => state.farmRecordReducer.currentFarmRecord);
    const [guests, setGuests] = useState<GuestInfo[]>(farmGuestsLocal);
    const [users, setUsers] = useState<GuestInfo[]>(usersToInviteLocal);
    const [searchUserText, setSearchUserText] = useState<string>("");
    const [searchGuestText, setSearchGuestText] = useState<string>("");
    const dispatch = useDispatch();
    let timeout: NodeJS.Timeout;

    async function searchUserSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault(); 

        await api.get(`https://localhost:5177/innogotchi/farms/${currentFarm?.farmName}/guests/users`)
        .then((response) => {
            if (searchUserText.trim() !== "") { 
                setUsers(response.data.filter((info: GuestInfo) => info.login.includes(searchUserText)));
            }
            else {
                setUsers(response.data);
            }
        })
        .catch((ex) => {
            setUsers([]);

            dispatch({type: "SET_MESSAGE", payload: ex.response.data});
            dispatch({type: "SET_ISMESSAGE", payload: true});

            timeout = setTimeout(function () {
                dispatch({type: "SET_ISMESSAGE", payload: false});
            }, 3000);
        });
    }

    async function searchGuestSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        
        await api.get(`https://localhost:5177/innogotchi/farms/${currentFarm?.farmName}/guests`)
        .then((response) => {
            if (searchGuestText.trim() !== "") { 
                setGuests(response.data.filter((info: GuestInfo) => info.login.includes(searchGuestText)));
            }
            else {
                setGuests(response.data);
            }
        })
        .catch((ex) => {
            setGuests([]);

            dispatch({type: "SET_MESSAGE", payload: ex.response.data});
            dispatch({type: "SET_ISMESSAGE", payload: true});

            timeout = setTimeout(function () {
                dispatch({type: "SET_ISMESSAGE", payload: false});
            }, 3000);
        });
    }

    function setGuest(isInvited: boolean, guest: GuestInfo) {
        clearTimeout(timeout);
        dispatch({type: "SET_ISMESSAGE", payload: false});

        if (isInvited) {
            let url = `https://localhost:5177/innogotchi/farms/${currentFarm!.farmName}/guests/delete`;
            api.delete(url, {data: guest})
            .then((response) => {
                setGuests(guests.filter((info) => info.login !== guest.login));
                setUsers([...users, guest]);
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
        else {
            let url = `https://localhost:5177/innogotchi/farms/${currentFarm!.farmName}/guests/invite`;
            api.post(url, guest)
            .then((response) => {
                setUsers(users.filter((info) => info.login !== guest.login));
                setGuests([...guests, guest]);
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
    }

    return (
        <section id='invite_friends' className='section_base'>
            {children}
            <div>
                <div className='guests_half'>
                    <h2 className='black_rounded_h'>Farm Guests</h2>
                    <form className="search_guest_form" onSubmit={(e) => searchGuestSubmit(e)}>
                        <input id="find_users_input" onChange={(e) => setSearchGuestText(e.target.value)} type="text" placeholder='Login...'/>
                        <input id="find_users_button" type="submit" value=""/>
                    </form>
                    <div className='guests_wrapper'>
                        {guests.map((guest, index) => {
                            if (index < 50) 
                                return <GuestRecord key={guest.login} guest={guest} isInvited={true} buttonClick={setGuest}></GuestRecord>
                        })}
                    </div>
                </div>
                <div className='guests_half'>
                    <h2 className='black_rounded_h'>Invite Users</h2>
                    <form className="search_guest_form" onSubmit={(e) => searchUserSubmit(e)}>
                        <input id="find_users_input" onChange={(e) => setSearchUserText(e.target.value)} type="text" placeholder='Login...'/>
                        <input id="find_users_button" type="submit" value=""/>
                    </form>
                    <div className='guests_wrapper'>
                        {users.map((guest, index) => {
                            if (index < 50) 
                                return <GuestRecord key={guest.login} guest={guest} isInvited={false} buttonClick={setGuest}></GuestRecord>
                        })}
                    </div>                    
                </div>
            </div>
        </section>
    );
}

export default InviteFriends;