/* OPTIONS FOR EACH DATA POINT:
 * id: this is the id of the club in a codable format. MUST BE THE SAME ACROSS ALL MEETINGS OF THE SAME CLUB
 * type: this is the type of club that it is. MUST BE THE SAME ACROSS ALL MEETINGS OF THE SAME CLUB
 *      "club": regular club meeting
 *      "affinity": affinity/alliance group meeting
 *      "team": some sort of team meeting
 *      "committee": committee meetings, including ones outside of sg
 *      Maybe more
 * info: paragraph on the club, specific to the day they are meeting, as decided by the submitter
 * room: the room in which the club takes place in
 *      In string: first the room #, space and then either the name of the room or the name of the teacher whose room it is
 * maintitle: the name that will show up on the item, as decided by the submitter
 * day: the day of the year in which the event will show up. Add extra day to the end
 * time: the schedule in which the event will be sorted into
 *      "conference"
 *      "lunch"
 *      "afterschool" (the same as the ids of those schedules)
 *
 * */

var maindata = [
    {
        id: "red-cross",
        type: "club",
        info: "This is a long paragraph that describes the club and what it is yayyyyyyyyyy",
        room: "376 Miranda",
        maintitle: "Red Cross",
        day: new Date("2025-01-22"),
        time: "lunch"
    },
    {
        id: "pickle-club",
        type: "club",
        info: "This is another club with a different id!",
        room: "000 Room",
        maintitle: "Pickle Club",
        day: new Date("2025-01-17"),
        time: "lunch"
    },
    {
        id: "bsu",
        type: "affinity",
        info: "This is an affinity group",
        room: "000 Room",
        maintitle: "BSU",
        day: new Date("2025-01-17"),
        time: "afterschool"
    },
    {
        id: "community",
        type: "committee",
        info: "This is a committee!",
        room: "000 Room",
        maintitle: "Community Committee",
        day: new Date("2025-01-17"),
        time: "conference"
    },
    {
        id: "chess",
        type: "team",
        info: "This is a team",
        room: "442 Humanities",
        maintitle: "Chess Club",
        day: new Date("2025-01-17"),
        time: "conference"
    },
    {
        id: "investment",
        type: "club",
        info: "Investment club description yayyy",
        room: "478 Conlon",
        maintitle: "Investment Club",
        day: new Date("2025-01-18"),
        time: "lunch"
    }
];
