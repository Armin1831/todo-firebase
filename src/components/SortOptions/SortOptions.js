import React from 'react';
import "./SortOptions.css";

// icons
import {ReactComponent as StarLogo} from "../../assets/images/icons/star-logo.svg";
import {ReactComponent as DueDateLogo} from "../../assets/images/icons/due-date.svg";
import {ReactComponent as SunLogo} from "../../assets/images/icons/sun-logo.svg";
import {ReactComponent as SortLogo} from "../../assets/images/icons/sort-logo.svg";
import {ReactComponent as CreationDateLogo} from "../../assets/images/icons/creation-date.svg";

const sortMenus = [
    {
        name: "Importance",
        logo: StarLogo
    },
    {
        name: "Due date",
        logo: DueDateLogo
    },
    {
        name: "Added to My Day",
        logo: SunLogo
    },
    {
        name: "Alphabetically",
        logo: SortLogo
    },
    {
        name: "Creation date",
        logo: CreationDateLogo
    }
];


const SortOptions = ({setSortOption, ...props}) => {

    return (
        <div id="sortMenu" {...props}>
            <h4 className="sort-menu__title">Sort by</h4>
            <ul className="sort-options">
                {sortMenus.map(sortMenu => {
                    const Logo = sortMenu.logo
                    return (
                        <li className="sort-options__item"
                            key={sortMenu.name}
                            onClick={() => setSortOption(sortMenu.name)}
                        >
                            <Logo style={{color: "#6b6a6a"}}/>
                            <span className="sort-options__title">{sortMenu.name}</span>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
};

export default SortOptions;