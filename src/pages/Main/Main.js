import React, { useLayoutEffect } from "react";
import { Outlet, useParams, useNavigate } from "react-router-dom";
import "./Main.css";

// components

// icons

import { ReactComponent as SidebarLogo } from "../../assets/images/icons/sidebar-logo.svg";
import { ReactComponent as PaintingCanvasLogo } from "../../assets/images/icons/painting-canvas.svg";
import { ReactComponent as RightArrowLogo } from "../../assets/images/icons/right-arrow.svg";
import { ReactComponent as PrintLogo } from "../../assets/images/icons/print-logo.svg";
import { ReactComponent as StarLogo } from "../../assets/images/icons/star-logo.svg";
import { ReactComponent as DueDateLogo } from "../../assets/images/icons/due-date.svg";
import { ReactComponent as SunLogo } from "../../assets/images/icons/sun-logo.svg";
import { ReactComponent as SortLogo } from "../../assets/images/icons/sort-logo.svg";
import { ReactComponent as CreationDateLogo } from "../../assets/images/icons/creation-date.svg";
import { ReactComponent as PlusLogo } from "../../assets/images/icons/plus-logo.svg";
import { ReactComponent as CalendarLogo } from "../../assets/images/icons/calendar-logo.svg";
import { ReactComponent as ReminderLogo } from "../../assets/images/icons/reminder-logo.svg";
import { ReactComponent as RecurringLogo } from "../../assets/images/icons/recurring-logo.svg";

const Main = () => {
  const tasksList = useParams();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (tasksList.tasksList === undefined) {
      navigate("/tasks/inbox");
    }
  }, [navigate, tasksList.tasksList]);

  return (
    <>
      <main className="main">
        <section className="todo-header">
          <div className="container">
            <div className="main-header">
              <div className="main-header_left">
                <span className="main-header_menu-logo">
                  <SidebarLogo />
                </span>
                <h2 className="main-header_title">Tasks</h2>
                <div className="list-option">
                  <div className="logo-wrapper">...</div>
                  <div className="list-menu" id="listMenu">
                    <h4 className="list-menu_title">list options</h4>
                    <ul className="menu-option">
                      <li className="menu-option_items">
                        <PaintingCanvasLogo />
                        <span className="menu-option_title">Change theme</span>
                        <RightArrowLogo />
                      </li>
                      <li className="menu-option_items">
                        <PrintLogo />
                        <span className="menu-option_title">Print list</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="main-header_right">
                <div className="sort">
                  <SortLogo />
                  <span className="main-header_sort">Sort</span>
                </div>
                <div className="sort-menu" id="sortMenu">
                  <h4 className="sort-menu__title">Sort by</h4>
                  <ul className="sort-options">
                    <li className="sort-options__item">
                      <StarLogo />
                      <span className="sort-options__title">Importance</span>
                    </li>
                    <li className="sort-options__item">
                      <DueDateLogo />
                      <span className="sort-options__title">Due date</span>
                    </li>
                    <li className="sort-options__item">
                      <SunLogo />
                      <span className="sort-options__title">
                        Added to My Day
                      </span>
                    </li>
                    <li className="sort-options__item">
                      <SortLogo />
                      <span className="sort-options__title">
                        Alphabetically
                      </span>
                    </li>
                    <li className="sort-options__item">
                      <CreationDateLogo />
                      <span className="sort-options__title">Creation date</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="new-task">
          <div className="container">
            <div className="new-task-wrapper ">
              <div className="new-task-top">
                <PlusLogo />
                <span className="new-task-top__circle hide" />
                <input
                  type="text"
                  placeholder="Add a task"
                  className="new-task-top__input"
                />
              </div>
              <div className="new-task-bottom">
                <div className="new-task-bottom__options">
                  <span className="new-task-bottom__icon">
                    <CalendarLogo />
                  </span>
                  <span className="new-task-bottom__icon">
                    <ReminderLogo />
                  </span>
                  <span className="new-task-bottom__icon">
                    <RecurringLogo />
                  </span>
                </div>
                <button className="new-task-bottom__add">Add</button>
              </div>
            </div>
          </div>
        </section>
        <div className="all-tasks">
          <section className="tasks">
            <div className="container">
              <div className="tasks-wrapper">
              <div className="task">
                  <span className="new-task-top__circle" />
                  <p className="task__content">Lorem ipsum dolor sit amet.</p>
                  <span className="task__isImportant">
                    <StarLogo/>
                  </span>
                </div>
                <div className="task">
                  <span className="new-task-top__circle" />
                  <p className="task__content">Lorem ipsum dolor sit amet.</p>
                  <span className="task__isImportant">
                    <StarLogo/>
                  </span>
                </div>
              </div>
            </div>
          </section>
          <section className="completed-tasks">
            <div className="container">
              <div className="completed-head-wrapper">
                <div className="completed-head">
                  <RightArrowLogo className="completed-head__icon" />
                  <span className="completed-head__text">Completed</span>
                  <span className="completed-head__count">3</span>
                </div>
                <div className="line-wrapper completed-tasks__line">
                  <span className="completed-head__line" />
                </div>
              </div>
              <div className="tasks-wrapper completed-tasks-wrapper">
                <div className="task">
                  <span className="new-task-top__circle" />
                  <p className="task__content">Lorem ipsum dolor sit amet.</p>
                  <span className="task__isImportant">
                    <StarLogo/>
                  </span>
                </div>
                <div className="task">
                  <span className="new-task-top__circle" />
                  <p className="task__content">Lorem ipsum dolor sit amet.</p>
                  <span className="task__isImportant">
                    <StarLogo/>
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Outlet />
    </>
  );
};

export default Main;
