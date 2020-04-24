const stars = document.querySelector(".initialRating").children;
let ratingValue;
let index;

for(let i=0; i<stars.length; i++){
    stars[i].addEventListener("mouseover", function(){
        console.log(i);
        for(let j=0; j<stars.length; j++){
            stars[j].classList.remove("fa-star");
            stars[j].classList.add("fa-star-o");
        }
        for(let j=0; j<=i; j++){
            stars[j].classList.remove("fa-star-o");
            stars[j].classList.add("fa-star");
        }
    })
    stars[i].addEventListener("click", function(){
        ratingValue = i+1;
        index=i;
    })
    stars[i].addEventListener("mouseout", function(){
        for(let j=0; j<stars.length; j++){
            stars[j].classList.remove("fa-star");
            stars[j].classList.add("fa-star-o");
        }
        for(let j=0; j<=index; j++){
            stars[j].classList.remove("fa-star-o");
            stars[j].classList.add("fa-star");
        }
    })
}


let submit_button = document.getElementById("submit");
let username = document.getElementById("userName");
let shopname = document.getElementById("shopName");
let city = document.getElementById("location");
let review = document.getElementById("review");
let rating = document.getElementById("ster");


submit_button.addEventListener('click', function displayData() {

    if (dataValidator() == true) {
        console.log(username.value);
        console.log(shopname.value);
        console.log(city.value);
        console.log(ratingValue);
        console.log(review.value);
        //alert("Your review has been submitted.");
    }
})

function dataValidator() {
    var isvalidData = true;
    if (!(username.value.length >= 2 && username.value.length <= 20)) {
        IsvalidData = false;
        alert("length of username must be within 2-20 characters");
    }
    if (!(shopname.value.length > 2 && shopname.value.length <= 30)) {
        IsvalidData = false;
        alert("length of shopname must be within 2-30 characters");
    }
    if (!(city.value.length > 2 && city.value.length <= 30)) {
        IsvalidData = false;
        alert("length of village name must be within 2-30 characters");
    }
    if (!(ratingValue >= 0 && ratingValue <= 5)) {
        IsvalidData = false;
        alert("Rating must be between 0 and 5")
    }
    if (!(review.value.length > 4 && review.value.length <= 1999)) {
        IsvalidData = false;
        alert("Length of review must be within 5-2000 characters");
    }
    return isvalidData;
}

