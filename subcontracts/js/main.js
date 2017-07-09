"use strict";

var selectors = {
  overlay: document.getElementsByClassName("overlay")[0],
  cardsBlock: document.getElementsByClassName("cards")[0],
  card: document.getElementsByClassName("cards__item")
};

var narrow = "narrow";
var wide = "wide";

var card = void 0;

function createCard(type, i) {
  card = document.createElement("li");
  card.classList.add("cards__item", type);
  var countBlock = document.createElement("div");
  countBlock.classList.add("cards__itemCount");
  countBlock.innerHTML = i;
  card.appendChild(countBlock);

  card.addEventListener("click", function (e) {
    e.stopPropagation();
    if (combination[0] == 16 && combination[1] == 18) {
      addCard(wide, ++count);
      history.pushState({ count: count, type: wide }, "", count);
      return false;
    } else if (combination[0] == [16]) {
      addCard(narrow, ++count);
      history.pushState({ count: count, type: narrow }, "", count);
      return false;
    } else {
      if (selectors.card.length >= 2) {
        selectors.card[count - 2].classList.remove("_inDeck");
      };
      var stateType = "";
      if (selectors.card[count - 1].classList.contains(narrow)) {
        stateType = narrow;
      } else {
        stateType = wide;
      }
      count--;
      selectors.cardsBlock.removeChild(selectors.card[selectors.card.length - 1]);
      history.pushState({ count: count, type: stateType }, "", count);
    };
  });

  card.addEventListener("mouseover", function (e) {
    e.stopPropagation();
  });

  return card;
}

function addCard(type, j) {
  if (selectors.card.length > 1) {
    selectors.cardsBlock.appendChild(createCard(type, j));
    selectors.card[count - 2].classList.add("_inDeck");
  } else if (selectors.card.length == 1) {
    selectors.cardsBlock.appendChild(createCard(type, j));
    selectors.card[0].classList.add("_inDeck", "_first");
  } else {
    selectors.cardsBlock.appendChild(createCard(type, j));
  };
}

function getNumberArray(arr) {
  var newArr = [];
  for (var i = 0; i < arr.length; i++) {
    if (typeof arr[i] == "number") {
      newArr[newArr.length] = arr[i];
    }
  }
  return newArr;
}

var combination = [];
var keys = [];
var count = 0;

document.addEventListener("DOMContentLoaded", function () {
  cards = JSON.parse(cards);
  if (cards.length > 0) {
    for (var i = 0; i <= cards.length - 1; i++) {
      addCard(cards[i].type, ++count);
    }
    history.pushState({ count: count, type: cards[cards.length - 1].type }, "", count);
  } else {
    history.pushState({ count: count, type: "" }, "", count);
  }

  window.addEventListener("popstate", function (e) {
    var stateCount = e.state.count;
    var stateType = e.state.type;
    if (history.state.count < count) {
      count--;
      selectors.cardsBlock.removeChild(selectors.card[selectors.card.length - 1]);
      if (count > 0) {
        selectors.card[count - 1].classList.remove("_inDeck");
      }
      return false;
    } else if (history.state.count > count) {
      if (selectors.cardsBlock.innerHTML == "") {
        selectors.cardsBlock.appendChild(createCard(narrow, ++count));
        selectors.card[0].classList.add("_first");
        return false;
      } else {
        addCard(stateType, stateCount);
        selectors.card[count - 1].classList.add("_inDeck");
        count++;
        return false;
      }
    }
  });

  window.addEventListener("keydown", function (e) {
    keys[e.keyCode] = e.keyCode;
    var keysArray = getNumberArray(keys);
    combination = keysArray;
  }, false);

  window.addEventListener('keyup', function (e) {
    keys[e.keyCode] = false;
    combination = [];
  }, false);

  selectors.overlay.addEventListener("mouseover", function () {
    selectors.overlay.style.background = "#e9e6d3";
  });

  selectors.overlay.addEventListener("mouseout", function () {
    selectors.overlay.style.background = "";
  });

  selectors.overlay.addEventListener("click", function (e) {
    e.preventDefault();
    if (selectors.cardsBlock.innerHTML === "") {
      if (combination[0] == 16 && combination[1] == 18) {
        selectors.cardsBlock.appendChild(createCard(wide, ++count));
        selectors.card[0].classList.add("_first");
        history.pushState({ count: count, type: wide }, "", count);
      } else if (combination[0] == [16]) {
        selectors.cardsBlock.appendChild(createCard(narrow, ++count));
        selectors.card[0].classList.add("_first");
        history.pushState({ count: count, type: narrow }, "", count);
      } else {
        return false;
      }
    }
  });
});