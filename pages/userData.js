class userData extends HTMLElement {
    get value () {
        return this.getAttribute('value') || 0;
    }

    set value (val) {
        this.setAttribute('value', val);
        this.highlight(this.value - 1);
    }

    get number () {
        return this.getAttribute('number') || 5;
    }

    set number (val) {
        this.setAttribute('number', val);

        this.stars = [];

        while (this.firstChild) {
            this.removeChild(this.firstChild);
        }

        for (let i = 0; i < this.number; i++) {
            let s = document.createElement('div');
            s.className = 'star';
            this.appendChild(s);
            this.stars.push(s);
        }

        this.value = this.value;
    }

    highlight (index) {
        this.stars.forEach((star, i) => {
            star.classList.toggle('full', i <= index);
        });
    }

    constructor () {
        super();

        this.number = this.number;

        this.addEventListener('mousemove', e => {
            let box = this.getBoundingClientRect(),
                starIndex = Math.floor((e.pageX - box.left) / box.width * this.stars.length);

            this.highlight(starIndex);
        });

        this.addEventListener('mouseout', () => {
            this.value = this.value;
        });

        this.addEventListener('click', e => {
            let box = this.getBoundingClientRect(),
                starIndex = Math.floor((e.pageX - box.left) / box.width * this.stars.length);

            this.value = starIndex + 1;

            let rateEvent = new Event('rate');
            this.dispatchEvent(rateEvent);
        });
    }
}

customElements.define('x-star-rating', userData);

let submit_button = document.getElementById("submit");
let username = document.getElementById("userName");
let shopname = document.getElementById("shopName");
let city = document.getElementById("location");
let review = document.getElementById("review");
let rating = document.getElementById("ster");


submit_button.addEventListener('click', function displayData(){

    if(dataValidator() == true){
        console.log(username.value);
        console.log(shopname.value);
        console.log(city.value);
        console.log(rating.value);
        console.log(review.value);
    }
})

function dataValidator(){
    var isvalidData = true;
    if(!(username.value.length >= 2 && username.value.length <= 20)){
        IsvalidData = false;
        alert("length of username must be within 2-20 characters");
    }
    if(!(shopname.value.length > 2 && shopname.value.length <= 30)){
        IsvalidData = false;
        alert("length of shopname must be within 2-30 characters");
    }
    if(!(city.value.length > 2 && city.value.length <= 30)){
        IsvalidData = false;
        alert("length of village name must be within 2-30 characters");
    }
    if(!(rating.value >= 0 && rating.value <= 5)){
        IsvalidData = false;
        alert("Rating must be between 0 and 5")
    }
    if(!(review.value.length > 4 && review.value.length <= 1999)){
        IsvalidData = false;
        alert("Length of review must be within 5-2000 characters");
    }
    return isvalidData;
}

