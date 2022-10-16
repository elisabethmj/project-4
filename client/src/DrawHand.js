import axios from 'axios';
import React from 'react';

function DrawHand() {
    const [hand, setHand] = React.useState(null);

    React.useEffect(() => {
        axios.get(`api/hand`).then((response) => {
          setHand(response.data.cards);
        //   console.log(response.data.cards)
        });
      }, []);

    if (!hand) return null;

    return (
        <div>
          <h1>Draw Hand</h1>
          <p>Card: {hand[0].card} Suit: {hand[0].suit} </p>
          <p>Card: {hand[1].card} Suit: {hand[1].suit} </p>
        </div>
      );
    }

export default DrawHand;