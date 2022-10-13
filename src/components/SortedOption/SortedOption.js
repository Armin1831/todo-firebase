import React from 'react';

// icons
import {ReactComponent as CloseLogo} from "../../assets/images/icons/close-logo.svg";

const SortedOption = ({sortedBy, setSortOption, list}) => {

    const clearSort = () => {
        setSortOption(prevState => {
            return {
                ...prevState,
                [list.id]: null
            }
        })
    }

    return (
        <div className="container is-sorted print-display-none">
            sorted by {sortedBy}
            <CloseLogo
                onClick={clearSort}
                style={{width: "14px", height: "14px", cursor: "pointer"}}
            />
        </div>
    );
};

export default SortedOption;
