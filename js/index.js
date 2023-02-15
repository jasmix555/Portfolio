document.addEventListener("mousemove", parallax);
function parallax(e) {
    document.querySelectorAll('#stars').forEach(function (move) {
        const speed = move.getAttribute('data-speed');
        const x = (window.innerWidth - e.pageX * speed) / 1000;
        const y = (window.innerHeight - e.pageY * speed) / 500;
        move.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
}