const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


class MyDate {
    constructor(dateObj) {
        this.date = dateObj ? dateObj : new Date()
        this.hours = this.date.getHours()
        this.today = weekday[this.date.getDay()]
        this.minutes = this.date.getMinutes()
        this.ampm = this.hours >= 12 ? 'PM' : 'AM';
    }


    getTomorrow() {
        const tomorrow = new Date()
        tomorrow.setDate(this.date.getDate() + 1)
        return {
            title: weekday[tomorrow.getDay()],
            value: tomorrow
        }
    }

    getLaterHours() {
        const laterHours = new Date()
        laterHours.setHours(this.date.getHours() + 3)
        return {
            title: laterHours.getHours(),
            value: laterHours
        }
    }

    getNextWeek() {
        const nextWeek = new Date()
        nextWeek.setDate(this.date.getDay() === 0 ? this.date.getDate() + 8 : this.date.getDate() + 6)
        return {
            title: weekday[nextWeek.getDay()],
            value: nextWeek
        }
    }
}


export default MyDate;