import React, {useContext, useRef, useState} from "react";
import {userContext} from "../../context/userContext";
import useSingOut from "../../hooks/useSingOut";
import {Link} from "react-router-dom";
import "./Header.css";

// icons
import {ReactComponent as SearchLogo} from "../../assets/images/icons/search-logo.svg";
import {ReactComponent as CloseLogo} from "../../assets/images/icons/close-logo.svg";


const Header = () => {
    const [openSearch, setOpenSearch] = useState(false);
    const {user: {user}} = useContext(userContext);
    const {handleSingOut, isPending} = useSingOut()
    const inputRef = useRef();

    const handleLogout = async () => {
        await handleSingOut()
    }
    return (
        <header className="header">
            <h1 className="header_title">ToDo</h1>
            <div className={openSearch ? "search search--show" : "search"}>
                <SearchLogo
                    className="search_icon"
                    onClick={() => {
                        setOpenSearch(true);
                        inputRef.current.style.display = "block";
                        inputRef.current.focus();
                    }}
                />
                <input type="text" className="search_input" ref={inputRef}/>
                <CloseLogo
                    onClick={() => {
                        setOpenSearch(false);
                        inputRef.current.style.display = "none";
                    }}
                    className={
                        openSearch ? "search_close search_close--show" : "search_close"
                    }
                />
            </div>
            <div className="header_right">
                {user ? (
                    <>
                        <button onClick={handleLogout}
                                className="logout-button">{isPending ? "is pending" : "logout"}</button>
                        <div className="profile">
                            <span className="profile_content">{user.displayName.toUpperCase().slice(0,2)}</span>
                        </div>
                    </>
                ) : (
                    <Link to="/sing-up" className="header-link" >sing up</Link>
                )}
            </div>
        </header>
    );
};

export default Header;
