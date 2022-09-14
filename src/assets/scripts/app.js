const searchIcon = document.querySelector('.search_icon');
const searchDiv = document.querySelector('.search');
const closeIcon = document.querySelector('.search_close');
const searchInput = document.querySelector('.search_input');
const listMenu = document.querySelector('.list-menu');
const listOption = document.querySelector('.logo-wrapper');
const rightMain = document.querySelector('.sort');
const sortMenu = document.querySelector('.sort-menu');
const openNewTask = document.querySelector('.new-task-top__icon');
const newTaskCircle = document.querySelector('.new-task-top__circle');
const newTaskBottom = document.querySelector('.new-task-bottom');
const tasks = document.querySelectorAll('.task');
const newTaskInput = document.querySelector('.new-task-top__input');
const completedHead = document.querySelector('.completed-head');
const completedLine = document.querySelector('.completed-tasks__line');
const completedIcon = document.querySelector('.completed-head__icon');
const completedTasksWrapper = document.querySelector('.completed-tasks-wrapper');
const sidebar = document.querySelector('.sidebar')
const openSidebar = document.querySelector('.main-header_menu-logo')
const cover = document.querySelector('.cover');
const todoDetails = document.querySelector('.todo-details')
const todoWrapper = document.querySelector('.details-wrapper')
const dateOption = document.querySelectorAll('.details-option')
const dateOptionMenu = document.querySelectorAll('.details-date-option')


if (window.innerHeight > 690) {
    todoWrapper.style.height = 'auto'
}

window.onload = function () {
    document.onclick = function (ev) {
        if (!ev.target.classList.contains('logo-wrapper')
            && !ev.target.classList.contains('list-menu') &&
            !ev.target.classList.contains('list-menu_title') &&
            !ev.target.classList.contains('menu-option_items') &&
            !ev.target.classList.contains('menu-option') &&
            !ev.target.classList.contains('menu-option_title') &&
            ev.target.classList.length !== 0
        ) {
            listMenu.classList.remove('list-menu--show')
        }
        if (!ev.target.classList.contains('sort')
            && !ev.target.classList.contains('main-header_sort')
            && !ev.target.classList.contains('sort-menu') &&
            !ev.target.classList.contains('sort-menu__title') &&
            !ev.target.classList.contains('sort-options__item') &&
            !ev.target.classList.contains('sort-options') &&
            !ev.target.classList.contains('sort-options__title') &&
            ev.target.classList.length !== 0
        ) {
            sortMenu.classList.remove('sort-menu--show')
        }
    }

}


searchIcon.addEventListener('click', function () {
    if (searchDiv.clientWidth < 50) {
        searchDiv.classList.add("search--show")
        closeIcon.classList.add("show")
        searchInput.classList.add("show")
    }
    searchInput.focus()

})
closeIcon.addEventListener('click', function () {
    searchDiv.classList.remove("search--show")
    closeIcon.classList.remove("show")
    searchInput.classList.remove("show")

})
listOption.addEventListener('click', function () {
    listMenu.classList.toggle('list-menu--show')
})
rightMain.addEventListener('click', function () {
    sortMenu.classList.toggle('sort-menu--show')
})
openNewTask.addEventListener('click', function () {
    newTaskCircle.classList.remove('hide')
    openNewTask.classList.add('hide')
    newTaskBottom.classList.add('new-task-bottom--show')
})
tasks.forEach((task) => {
    task.addEventListener('click', function () {
        newTaskCircle.classList.add('hide')
        openNewTask.classList.remove('hide')
        newTaskBottom.classList.remove('new-task-bottom--show')
        todoDetails.classList.toggle('todo-details--open')
        cover.classList.toggle('cover--show')
    })
})
newTaskInput.addEventListener('focus', () => {
    newTaskCircle.classList.remove('hide')
    openNewTask.classList.add('hide')
    newTaskBottom.classList.add('new-task-bottom--show')
})
completedHead.addEventListener('click', () => {
    completedLine.classList.toggle('hide')
    completedIcon.classList.toggle('completed-head__icon--open')
    completedTasksWrapper.classList.toggle('completed-tasks-wrapper--show')
})
openSidebar.addEventListener('click', function () {
    sidebar.classList.toggle('sidebar--open')
    cover.classList.toggle('cover--show')
})
cover.addEventListener('click', function () {
    sidebar.classList.remove('sidebar--open')
    todoDetails.classList.remove('todo-details--open')
    this.classList.remove('cover--show')
})
dateOption.forEach((el, i) => {
    el.addEventListener('click', function () {
        dateOptionMenu[i].classList.toggle('details-date-option--show')
    })
})