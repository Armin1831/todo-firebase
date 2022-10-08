import React, {useContext, useEffect, useRef, useState} from "react";
import {userContext} from "../../context/userContext";
import useSingOut from "../../hooks/useSingOut";
import {Link, useLocation, useNavigate} from "react-router-dom";
import "./Header.css";

// icons
import {ReactComponent as SearchLogo} from "../../assets/images/icons/search-logo.svg";
import {ReactComponent as CloseLogo} from "../../assets/images/icons/close-logo.svg";


const Header = () => {
    const [openSearch, setOpenSearch] = useState(false);
    const location = useLocation();
    const [search, setSearch] = useState("");
    const {user: {user}} = useContext(userContext);
    const {handleSingOut, isPending} = useSingOut();
    const navigate = useNavigate();
    const inputRef = useRef();

    useEffect(() => {
        if (!location.pathname.includes("search")) {
            setSearch("")
        }
    }, [location.pathname]);

    const handleLogout = async () => {
        await handleSingOut()
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
        navigate(`/tasks/search/${e.target.value}`)
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
                <input
                    type="text"
                    className="search_input"
                    ref={inputRef}
                    value={search}
                    onChange={handleSearch}
                />
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
                            <span className="profile_content">{user.displayName.toUpperCase().slice(0, 2)}</span>
                        </div>
                    </>
                ) : (
                    <Link to="/sing-up" className="header-link">sing up</Link>
                )}
            </div>
        </header>
    );
};

export default Header;
