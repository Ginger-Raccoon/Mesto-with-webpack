class CardList {
  constructor(container, create) {
    this.container = container;
    this.create = create

  }

  addCard(cardData) {
    this.container.appendChild(this.create(cardData));
  }
  // Можно лучше
  // Передать не весь объект api, а только метод getCards
  render(api) {
    api.getCards()
      .then(res => {
        res.forEach((res) => {
          const cardData = {
            name: res.name,
            link: res.link
          }
          this.addCard(cardData)
        })
      })
      .catch(err => console.log(err.message))
  }
}

