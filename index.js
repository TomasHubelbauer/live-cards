import generateSentence from './generateSentence.js';

/** @type {{ title: string; description: string; imageUrl: string; }[]} */
const cards = [];
for (let index = 0; index < 150; index++) {

  const title = generateSentence(3 + Math.random() * 5 | 0);
  const description = generateSentence(10 + Math.random() * 10 | 0);
  const imageUrl = `https://picsum.photos/seed/${title}/500/150`;
  const card = { title, description, imageUrl };
  cards.push(card);
}

function addCard(/** @type {HTMLDivElement} */ div) {
  const card = cards[Math.random() * cards.length | 0];

  const a = document.createElement('a');
  a.style.backgroundImage = `url('${card.imageUrl}')`;
  a.href = '#';
  a.target = '_blank';
  a.addEventListener('click', event => event.preventDefault());

  const titleH2 = document.createElement('h2');
  titleH2.textContent = card.title;
  titleH2.title = card.title;
  a.append(titleH2);

  const descriptionP = document.createElement('p');
  descriptionP.textContent = card.description;
  descriptionP.title = card.description;
  a.append(descriptionP);

  div.append(a);
  return card;
}

const initialCards = [...cards];
let alt = false;
while (initialCards.length > 0) {
  const div = document.createElement('div');
  div.dataset.direction = alt ? 'left' : 'right';
  div.dataset.speed = Math.random() * .3;
  div.style.marginLeft = `-${Math.random() * 500 | 0}px`;

  // Mount the node to be able to measure its bounds for loop overflow detection
  document.body.append(div);

  do {
    const card = addCard(div);
    initialCards.splice(initialCards.indexOf(card), 1);
  }
  while (div.lastElementChild.getBoundingClientRect().right < window.innerWidth * 1.1);

  alt = !alt;
}

function slide() {
  window.requestAnimationFrame(slide);

  for (const div of document.querySelectorAll('div[data-direction]')) {
    if (div === document.querySelector('div[data-direction]:hover')) {
      continue;
    }

    const gap = div.firstElementChild.nextElementSibling.getBoundingClientRect().left - div.firstElementChild.getBoundingClientRect().right;
    switch (div.dataset.direction) {
      case 'left': {
        const marginLeft = parseFloat(getComputedStyle(div).marginLeft);
        div.style.marginLeft = (marginLeft - +div.dataset.speed) + 'px';
        if (div.lastElementChild.getBoundingClientRect().right < div.getBoundingClientRect().right) {
          // Add a new card at the end
          addCard(div);

          // Measure the first card's width to remove it and offset by it
          const width = div.firstElementChild.getBoundingClientRect().width;
          div.style.marginLeft = (marginLeft + width + gap) + 'px';

          // Remove the first card (out of view) to avoid only adding cards
          div.firstElementChild.remove();
        }

        break;
      }
      case 'right': {
        const marginLeft = parseFloat(getComputedStyle(div).marginLeft);
        div.style.marginLeft = (marginLeft + +div.dataset.speed) + 'px';
        if (marginLeft > 0) {
          // Add a new card at the end to not cause jank so we can measure it
          addCard(div);
          const width = div.lastElementChild.getBoundingClientRect().width;

          // Shift the row back by the card width and move the card at the start
          div.style.marginLeft = (marginLeft - width - gap) + 'px';
          div.prepend(div.lastElementChild);

          // Remove the last card (out of view) to avoid only adding cards
          div.lastElementChild.remove();
        }

        break;
      }
      default: {
        throw new Error(`Unknown direction: ${div.dataset.direction}`);
      }
    }
  }
}

window.requestAnimationFrame(slide);
