/* if filter is open */
var filterstatus = false;
/* new date object for today */
var today = new Date();
/* empty list for dates to use */
var dates = [];
/* list used to not repeat names for clubs in the filter */
var uniqueidlist = [];
/* loops thirty times, pushes a new date object to the dates list of today plus i days to make list of next thirty days */
for (i = 0; i < 30; i++) {
    dates.push(new Date(today.getFullYear(), today.getMonth(), today.getDate() + i));
}
/* date in which the user selects, default 0 (this is a number to regerence the dates list by, like dates[selectedDate]) */
var selectedDate = 0;
/* list of print months and print weekdays, because date.getDay returns a number 0-6, then you can reference these lists by that number */
var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/* function to reset all things on screen, whenever filter or date is changed */
function reset() {
    /* clears all items within the schedules */
    document.getElementById("conference").innerHTML = "<h3 class='scheduletitle'>Clubs Period/Conference</h3>";
    document.getElementById("lunch").innerHTML = "<h3 class='scheduletitle'>Lunch</h3>";
    document.getElementById("afterschool").innerHTML = "<h3 class='scheduletitle'>After School</h3>";

    /* sets the title card to a readable version of the date, based on dates[selectedDate].getSomething */
    document.getElementById("titlecard").innerHTML =
        "Club Schedule for " +
        weekdays[dates[selectedDate].getDay()] +
        ", " +
        months[dates[selectedDate].getMonth()] +
        " " +
        dates[selectedDate].getDate() +
        ", " +
        dates[selectedDate].getFullYear();
    /* makes the first navitem say Today on it */
    document.getElementsByClassName("navitem")[0].innerHTML = "Today";
    /* makes the next six to say their day of the week */
    for (i = 1; i < 7; i++) {
        document.getElementsByClassName("navitem")[i].innerHTML = weekdays[dates[i].getDay()];
    }
    /* makes all the rest say their full dates */
    for (i = 7; i < 30; i++) {
        document.getElementsByClassName("navitem")[i].innerHTML =
            months[dates[i].getMonth()] + " " + dates[i].getDate() + ", " + dates[i].getFullYear();
    }
    /* sorts through the maindata (from data.js) and determines if the item can be placed based on the content of the filter and if their date is today */
    for (i = 0; i < maindata.length; i++) {
        /* calls functions datematch and filtermatch with neccecary information (which return true or false)
         * to see if the filter and the date are compatible with the item*/
        if (datematch(dates[selectedDate], maindata[i].day) && filtermatch(maindata[i])) {
            /* if they are, it is placed in the correct schedule, as determined by maindata[i].time, then neccecary info is placed within the template as seen in the html file */
            document.getElementById(maindata[i].time).innerHTML +=
                '<div class="item"><div class="itemtext"><div class="itemtitle">' +
                maindata[i].maintitle +
                '</div><div class="iteminfoContainer"><div class="iteminfoContent">' +
                maindata[i].info +
                '</div></div></div><div class="itemroom">' +
                maindata[i].room +
                "</div></div>";
        }
    }
}

/* datematch function used to filter items by date */
function datematch(date1, date2) {
    /* only checks if the day of the month and if the month match, because if you just put two date objects in a == statement,
     * it will return false unless everything matches up (including hour, minute, millisecond, etc.) */
    if (date1.getDate() == date2.getDate() && date1.getMonth() == date2.getMonth()) {
        return true;
    }
    return false;
}
/* checks the filter checkboxes for a match, passes through the whole item from maindata */
function filtermatch(item) {
    /* checks if the checkbox that correlates with the id of the item is checked */
    if (document.getElementById(item.id).checked) {
        /* checks if the checkbox that correlates with the type of the item is checked */
        if (document.getElementById(item.type).checked) {
            /* if so, return true */
            return true;
        }
    }
    /* if either are not, return false */
    return false;
}

/* function to toggle the animation of the filter */
function filtertoggle() {
    /* gets the filter with document.getElementById */
    var filter = document.getElementById("filter");
    /* checks if the filter is toggled or not */
    if (filterstatus) {
        /* if the filter is out, remove the animated tag and the normal direction tag */
        filter.classList.remove("animated", "normal");
        /* resets animation */
        void filter.offsetWidth;
        /* adds back the animated tag, and adds the reverse direction tag so it goes back */
        filter.classList.add("animated", "reverse");
        /* sets filterstatus to false to signify that it is now untoggled */
        filterstatus = false;
    } else {
        /* else, same but reverse the directions and set the filter status to true at the end */
        filter.classList.remove("animated", "reverse");
        void filter.offsetWidth;
        filter.classList.add("animated", "normal");
        filterstatus = true;
    }
}
/* function called by navitems that change the selectedDate*/
function changedate(newdate) {
    /* make whatever day was selected before lose its special background color (which is lighter)*/
    document.getElementsByClassName("navitem")[selectedDate].style.backgroundColor = "";
    /* set selected date to the date passed through by the function */
    selectedDate = newdate;
    /* gives the new selected navitem the background color */
    document.getElementsByClassName("navitem")[newdate].style.backgroundColor = "#82a0ff";
    /* calls reset to change the items on the schedules */
    reset();
}
/* this code only runs once the entire html has loaded */
document.addEventListener("DOMContentLoaded", () => {
    /* creates variable for navbar from document */
    var navbar = document.getElementById("navbar");
    /* for loop that adds thirty navbar items to its innerHTML, which each have the onclick function for change date and pass through i
     * i is passed through because the item with i=5 can pass through 5 to change date, because they are both the numbers 1-30 */
    for (i = 0; i < 30; i++) {
        navbar.innerHTML += "<div class='navitem' onclick='changedate(" + i + ")'></div>";
    }

    /* sets the default selected date to have the special background color */
    document.getElementsByClassName("navitem")[selectedDate].style.backgroundColor = "#82a0ff";
    /* goes through all the items in maindata to determine all the unique items to add to the filter */
    for (i = 0; i < maindata.length; i++) {
        /* asks if the id for the new item is already in the list uniqueidlist */
        /* if it is, it passes on. if it isn't... */
        if (!(maindata[i].id in uniqueidlist)) {
            /* add the id to the list so it doesn't get reused */
            uniqueidlist.push(maindata[i].id);
            /* add it to the clubfilter using the template seen in the html
             * id is the same as the item.id so they can be called with each other
             * label is for that input, so it uses the same id, label uses the item.title to it looks better on front end*/
            document.getElementById("clubfilter").innerHTML +=
                "<input type='checkbox' id='" +
                maindata[i].id +
                "' class='clubbox' checked/><label for='" +
                maindata[i].id +
                "'>" +
                maindata[i].maintitle +
                "</label><br />";
        }
    }
    /* runs reset function once everything is set up */
    reset();
});
