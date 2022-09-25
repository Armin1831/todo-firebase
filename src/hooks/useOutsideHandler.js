import React, {useEffect, useRef} from "react";


function useOutsideHandler(ref, setInformationMenus = null, menu = null, uiState = null, uiStateHandler = null) {


    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                if (ref.current.firstChild.classList.contains('list-option') && uiState.isListOptionsOpen) {
                    uiStateHandler("isListOptionsOpen", true)
                }
                if (ref.current.firstChild.classList.contains('main-header_right') && uiState.isSortMenuOpen) {
                    uiStateHandler("isSortMenuOpen", true)
                }
                if (ref.current.firstChild.classList.contains('details-option__top')) {
                    setInformationMenus((prev) => {
                        return {
                            ...prev,
                            [menu]: false
                        }
                    })

                }
            }

        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, setInformationMenus, menu, uiState, uiStateHandler]);
}


export default function OutsideHandler(props) {
    const {setInformationMenus, menu, uiState, uiStateHandler} = props
    const wrapperRef = useRef(null);
    useOutsideHandler(wrapperRef, setInformationMenus, menu, uiState, uiStateHandler);

    return <div ref={wrapperRef}>{props.children}</div>;
}