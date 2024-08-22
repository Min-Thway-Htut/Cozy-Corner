function showSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'flex';
}

function hideSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'none';
}

const teamName = document.getElementById("team");
const typeOfSport = document.getElementById("sport");
const worldCupYear = document.getElementById("year");
const playerCards = document.getElementById("player-cards"); // Corrected ID
const playersDropDownList = document.getElementById("players"); // Corrected ID

const myFavoriteFootballTeam = {
    team: "Spicy King",
    sport: "Yamethin",
    year: 2023,
    players: [
        {
            name: "Pizza",
            price: 1,
            type: "main-dish",
            image: "food/pizza.webp"
        },
        {
            name: "Sushi",
            price: 1,
            type: "main-dish",
            image: "food/sushi.png"
        },
        {
            name: "Noodle",
            price: 1,
            type: "main-dish",
            image: "food/noodle.png"
        },
        {
            name: "Burger",
            price: 1,
            type: "snack",
            image: "food/burger.png"
        },
        {
            name: "Pepsi",
            price: 2,
            type: "drink",
            image: "food/pepsi.png"
        },
        {
            name: "Fanta",
            price: 2,
            type: "drink",
            image: "food/fanta.png"
        }
    ]
};

Object.freeze(myFavoriteFootballTeam);

const { sport, team, year, players } = myFavoriteFootballTeam;

typeOfSport.textContent = sport;
teamName.textContent = team;
worldCupYear.textContent = year;

const setPlayerCards = (arr = players) => {
    playerCards.innerHTML = arr
        .map(
            ({ name, price, image }) =>
                `
                <div class="player-card">
                    <img src="${image}" alt="${name}" />
                    <h3>${name}</h3>
                    <p>Price: ${price} euros</p>
                </div>
                `
        )
        .join("");
};

// Initialize with all players
setPlayerCards();

playersDropDownList.addEventListener("change", (e) => {
    playerCards.innerHTML = "";

    switch (e.target.value) {
        case "nickname": // "Main Dishes"
            setPlayerCards(players.filter((player) => player.type === "main-dish"));
            break;
        case "forward": // "Snacks"
            setPlayerCards(players.filter((player) => player.type === "snack"));
            break;
        case "midfielder": // "Drinks"
            setPlayerCards(players.filter((player) => player.type === "drink"));
            break;
        default:
            setPlayerCards(players); // Show all items if "All" is selected
            break;
    }
});