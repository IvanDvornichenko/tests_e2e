import checkControlNum from "./validity";

export default class CardWidget {
  constructor() {
    this.cards = document.querySelectorAll(".card");
    this.card = document.querySelector(".card");
    this.visaCard = document.querySelector(".visa-card");
    this.masterCard = document.querySelector(".mastercard-card");
    this.amExCard = document.querySelector(".amex-card");
    this.discoverCard = document.querySelector(".discover-card");
    this.jcbCard = document.querySelector(".jcb-card");
    this.dinnersClubCard = document.querySelector(".dinners-club-card");
    this.mirCard = document.querySelector(".mir-card");
    this.input = document.querySelector(".input");
    this.form = document.querySelector("form");
    this.validMarker = document.querySelector(".valid-marker");
    this.invalidMarker = document.querySelector(".invalid-marker");

    this.checkCard();
    this.checkValidity();
    this.clear();
  }

  checkCard() {
    this.input.addEventListener("input", () => {
      const value = this.input.value.split("").map(Number);

      this.cards.forEach((item) => {
        if (value.length === 0) {
          item.classList.remove("active-card");
          this.clear();
        } else if (value[0] === 4) {
          this.deactivateCard();
          this.visaCard.classList.add("active-card");
        } else if (value[0] === 5) {
          this.deactivateCard();
          this.masterCard.classList.add("active-card");
        } else if (value[0] === 6) {
          this.deactivateCard();
          this.discoverCard.classList.add("active-card");
        } else if (value[1] === 7) {
          this.deactivateCard();
          this.amExCard.classList.add("active-card");
        } else if (value[1] === 0) {
          this.deactivateCard();
          this.dinnersClubCard.classList.add("active-card");
        } else if (value[1] === 5) {
          this.deactivateCard();
          this.jcbCard.classList.add("active-card");
        } else if (value[0] === 2) {
          this.deactivateCard();
          this.mirCard.classList.add("active-card");
        }
      });
    });
  }

  deactivateCard() {
    this.cards.forEach((item) => {
      if (item.classList.contains("active-card")) {
        item.classList.remove("active-card");
      }
    });
  }

  checkValidity() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      const value = this.input.value.split("").map(Number);
      const validity = checkControlNum(value);

      if (validity) {
        this.clear();
        this.validMarker.classList.remove("inactive-marker");
      } else if (!validity) {
        this.clear();
        this.invalidMarker.classList.remove("inactive-marker");
      }
    });
  }

  clear() {
    this.validMarker.classList.add("inactive-marker");
    this.invalidMarker.classList.add("inactive-marker");
  }
}
