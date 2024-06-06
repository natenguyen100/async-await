let url = "http://numbersapi.com";
let favoriteNumber = 8;

async function number() {
    let data = await $.getJSON(`${url}/${favoriteNumber}?json`);
    console.log(data);
}

let favoriteNumbers = [4, 5, 3];
async function numbers() {
    let data = await $.getJSON(`${url}/${favoriteNumbers}?json`);
    console.log(data);
}

async function promise() {
    let facts = await Promise.all(
      Array.from({ length: 4 }, () => $.getJSON(`${url}/${favoriteNumber}?json`))
    );
    facts.forEach(data => {
      $('body').append(`<p>${data.text}</p>`);
    });
}