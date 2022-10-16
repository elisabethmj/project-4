const express = require("express");
const app = express();
const fs = require("fs");


const port = process.env.PORT || 3001; 


app.use(express.json());
app.use(express.static("./client/build"));

const cards = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
const suits = ['Spades', 'Diamonds', 'Clubs', 'Hearts']

app.get("/api/hand", (req, res) => {
  const randomCard1 = cards[Math.floor(Math.random() * cards.length)];
  const randomCard2 = cards[Math.floor(Math.random() * cards.length)];
  const randomSuit1 = suits[Math.floor(Math.random() * suits.length)];
  const randomSuit2 = suits[Math.floor(Math.random() * suits.length)];
  res.json({
    "cards": [
      {"card": randomCard1, "suit": randomSuit1},
      {"card": randomCard2, "suit": randomSuit2}
    ]
  })
});

app.get("*", (req, res) => {
  res.setHeader("content-type", "text/html");
  fs.createReadStream(`${__dirname}/client/build/index.html`).pipe(res);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});


