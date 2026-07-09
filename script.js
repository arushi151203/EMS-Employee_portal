window.onload = function () {
    alert("Welcome to the Employee Training Dashboard!");
};
document.querySelectorAll(".continue-btn").forEach(button => {
    button.addEventListener("click", function() {
        alert("Course opened successfully!");
    });
});
const today = new Date();
document.getElementById("date").innerHTML = "Today's Date: " + today.toDateString();