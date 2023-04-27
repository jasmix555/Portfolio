function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        } else {
            reveals[i].classList.remove("active");
        }
    }
}

window.addEventListener("scroll", reveal);

const article = document.querySelector(".classwrap");
article.dataset.value;

// Get all sections that have an ID defined
const sections = document.querySelectorAll("section[id]");

// Add an event listener listening for scroll
window.addEventListener("scroll", navHighlighter);

function navHighlighter() {

    // Get current scroll position
    let scrollY = window.pageYOffset;

    // Now we loop through sections to get height, top and ID values for each
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 200;
        sectionId = current.getAttribute("id");

        /*
        - If our current scroll position enters the space where current section on screen is, add .active class to corresponding navigation link, else remove it
        - To know which link needs an active class, we use sectionId variable we are getting while looping through sections as an selector
        */
        if (
            scrollY > sectionTop &&
            scrollY <= sectionTop + sectionHeight
        ) {
            document.querySelector(".navi a[href*=" + sectionId + "]").classList.add("active");
        } else {
            document.querySelector(".navi a[href*=" + sectionId + "]").classList.remove("active");
        }
    });
}

//js for colored cursor

let innerCursor = document.querySelector(".inner-cursor");

document.addEventListener("mousemove" , moveCursor);

function moveCursor(e){
    const x = e.clientX;
    const y = e.clientY;

    innerCursor.style.left = `${x}px`;
    innerCursor.style.top = `${y}px`;
}

let links = Array.from(document.querySelectorAll("a , .btn"));

links.forEach((link) => {
    link.addEventListener("mouseover", ()=>{
        innerCursor.classList.add("grow")
    })
    link.addEventListener("mouseleave", ()=>{
        innerCursor.classList.remove("grow")
    })
});
