import React, { useRef, useState } from "react";
import "./Header.css";

import { ReactComponent as SearchLogo } from "../../assets/images/icons/search-logo.svg";
import { ReactComponent as CloseLogo } from "../../assets/images/icons/close-logo.svg";

const Header = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const inputRef = useRef();

  return (
    <header className="header">
      <h1 className="header_title">To Do</h1>
      <div className={openSearch ? "search search--show" : "search"}>
        <SearchLogo
          className="search_icon"
          onClick={() => {
            setOpenSearch(true);
            inputRef.current.style.display = "block";
            inputRef.current.focus();
          }}
        />
        <input type="text" className="search_input" ref={inputRef} />
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
        <div className="profile">
          <span className="profile_content">AA</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
