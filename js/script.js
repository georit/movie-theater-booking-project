/* ********** Variables ********** */

const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const selectedCount = document.getElementById('count');
const ticketsTotalCost = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = parseInt(movieSelect.value);

/* ********** Functions ********** */

// Get data from local storage and populate UI
function populateUI() {

    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }

};

// Save selected movie index and price
const setMovieData = (movieIndex, moviePrice) => {

    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);

};

// Update selected seats count and tickets total cost
const updateSelectedCountAndTotalTicketCost = () => {

    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const seatsIndex = [...selectedSeats].map(seat => {
        return [...seats].indexOf(seat);
    });

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;

    selectedCount.innerText = selectedSeatsCount;
    ticketsTotalCost.innerText = selectedSeatsCount * ticketPrice;

};

/* ********** Event Listeners ********** */

// Selecting movie
movieSelect.addEventListener('change', e => {

    ticketPrice = parseInt(e.target.value);
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCountAndTotalTicketCost();

});

// Selecting seats
container.addEventListener('click', e => {

    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCountAndTotalTicketCost();
    }

});

// Initial  selected count and ticket total cost set
updateSelectedCountAndTotalTicketCost();