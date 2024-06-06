$(function() {
let url ='https://deckofcardsapi.com/api/deck';

async function card() {
    let data = await $.getJSON(`${url}/new/draw`)
    let { suit, value } = data.cards[0];
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
}

async function card2() {
    let firstCardData = await $.getJSON(`${url}/new/draw/`);
    let deckId = firstCardData.deck_id;
    let secondCardData = await $.getJSON(`${url}/${deckId}/draw/`);
    [firstCardData, secondCardData].forEach(card => {
      let { suit, value } = card.cards[0];
      console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    });
  }

  async function setup() {
    let $btn = $('#draw-btn');
    let $cardArea = $('#card-area');

    let deckData = await $.getJSON(`${url}/new/shuffle/`);
    $btn.show().on('click', async function() {
        let cardData = await $.getJSON(`${url}/${deckData.deck_id}/draw/`);
        let cardSrc = cardData.cards[0].image;
        let angle = Math.random() * 90 - 45;
        let randomX = Math.random() * 40 - 20;
        let randomY = Math.random() * 40 - 20;
        let $card = $('<img>', {
            src: cardSrc,
            css: {
                transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
            }
        }).addClass('card');
        $cardArea.append($card);
        if (cardData.remaining === 0) $btn.remove();
    });
}
  setup();
});