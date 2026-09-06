const courses = [
    {
        subject: "CSE",
        number: 110,
        title: "Introduction to Programming",
        credits: 2,
        completed: true
    },

    {
        subject: "CSE",
        number: 111,
        title: "Programming with Functions",
        credits: 2,
        completed: true
    },

    {
        subject: "WDD",
        number: 130,
        title: "Web Fundamentals",
        credits: 2,
        completed: true
    },

    {
        subject: "WDD",
        number: 131,
        title: "Dynamic Web Fundamentals",
        credits: 2,
        completed: true
    },

    {
        subject: "CSE",
        number: 210,
        title: "Programming with Classes",
        credits: 2,
        completed: true
    },

    {
        subject: "WDD",
        number: 231,
        title: "Web Fronted Development",
        credits: 2,
        completed: false
    }
];

const courseList = document.querySelector("#course-list");
const credits = document.querySelector("#credits");

function displayCourses(courseArray) {

    courseList.innerHTML = "";
    
    courseArray.forEach(course => {
        const card = document.createElement("div");
        card.classList.add("course");

        if (course.completed) {
            card.classList.add("completed");
        }

        card.innerHTML = `
            <strong>${course.subject} ${course.number}</strong>
            <br>
            ${course.title}
        `;

        courseList.appendChild(card);

    });

    const totalCredits = courseArray.reduce(
        (total, course) => total + course.credits,
        0
    );

    credits.textContent =
        `The total credits for course listed above is ${totalCredits}`;
}

document.querySelector("#all").addEventListener("click", () => {
    displayCourses(courses);
});

document.querySelector("#cse").addEventListener("click", () => {
    const cseCourses = courses.filter(course =>
        course.subject === "CSE"
    );

    displayCourses(wddCourses);

});

displayCourses(courses);