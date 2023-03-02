import "./AuthorizationMenu.css";

interface IAuthorizationMenuProps {
    regClick: () => void;
    logInClick: () => void;
    children: React.ReactNode;
}

const AuthorizationMenu : React.FC<IAuthorizationMenuProps>= ({ regClick, logInClick, children }) => {
    return (
        <section id="authorization_section" className="section_base">
            {children}
            <div>
                <button className="register_button" onClick={regClick}>Register</button>
                <button className="log_in_button" onClick={logInClick}>Log In</button>
            </div>
        </section>
    );
}

export default AuthorizationMenu;