import {ReactComponent as HomeLogo} from "../../assets/images/icons/home-logo.svg";
import {ReactComponent as PersonLogo} from "../../assets/images/icons/person-logo.svg";
import {ReactComponent as CalenderLogo} from "../../assets/images/icons/calendar-logo.svg";
import {ReactComponent as StarLogo} from "../../assets/images/icons/star-logo.svg";
import {ReactComponent as SunLogo} from "../../assets/images/icons/sun-logo.svg";
import {ReactComponent as SidebarLogo} from "../../assets/images/icons/sidebar-logo.svg";

export const getLogo = (list) => {
    switch (list) {
        case "inbox":
            return HomeLogo;
        case "assigned_to_me":
            return PersonLogo;
        case "planned":
            return CalenderLogo;
        case "important":
            return StarLogo;
        case "my_day":
            return SunLogo;
        default:
            return SidebarLogo;
    }
};


export const getTitle = (list) => {
    const title = list === "inbox" ? "Tasks" : list.replaceAll("_", " ")[0].toUpperCase()
        + list.replaceAll("_", " ").slice(1);

    return title;
};

export const getCompleteAndNotCompleteTasks = (tasks, list) => {
    const completedTasks = []
    const notCompletedTasks = []
    tasks.forEach(task => {
        if (task.lists.includes(list)) {
            if (task.isCompleted) {
                completedTasks.push(task)
            } else notCompletedTasks.push(task)
        }
    })
    return {
        completedTasks,
        notCompletedTasks
    }
}

export const getSortedTasks = (tasks, sortOption) => {
    tasks.forEach(tasks => {
        switch (sortOption) {
            case "Importance":
                tasks.sort((a, b) => {
                    if (a.isImportant) {
                        return -1;
                    }
                    if (b.isImportant) {
                        return 1;
                    }
                    return 0;
                })
                break;
            case "Due date":
                tasks.sort((a, b) => {
                    if (a.dueDate !== "" && b.dueDate !== "")
                        return a.dueDate.toDate().getTime() - b.dueDate.toDate().getTime()
                    return 0;
                })
                break;
            case "Added to My Day":
                tasks.sort((a, b) => {
                    if (a.isInMyDay) {
                        return -1;
                    }
                    if (b.isInMyDay) {
                        return 1;
                    }
                    return 0;
                })
                break;
            case "Alphabetically":
                tasks.sort((a, b) => {
                    const nameA = a.text.toUpperCase();
                    const nameB = b.text.toUpperCase();
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    return 0;
                })
                break;
            case "Creation date":
                tasks.sort((a, b) => {
                    return b.constructionTime - a.constructionTime
                })
                break;
            default:
                break;
        }
    })

    return tasks;
}