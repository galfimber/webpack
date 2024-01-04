const getInfo = (func, input) => {
  const url = "./../../dbHeroes.json";

  const cards = document.querySelector(".cards");

  const gender = document.querySelector(".gender");
  const isHuman = document.querySelector(".isHuman");
  const isAlive = document.querySelector(".isAlive");
  const filmsCount = document.querySelector(".filmsCount");
  const btnSearch = document.querySelector(".btn-search");
  const btnShowAll = document.querySelector(".btn-show-all");

  const filters = {};

  const getData = (url) => {
    return fetch(url).then((resp) => resp.json());
  };

  const render = (data) => {
    for (let hero of data) {
      const card = document.createElement("div");
      card.classList.add("hero-card");
      let isContinue = false;
      for (let key in hero) {
        let attr;
        if (key === "photo") {
          attr = document.createElement("img");
          attr.src = `./../${hero[key]}`;
          attr.classList.add("stats");
          attr.classList.add(`${key}`);
          card.prepend(attr);
        } else if (key === "movies") {
          const attrList = document.createElement("ul");
          if (
            +filters.filmsCount === hero[key].length ||
            filters.filmsCount == undefined
          ) {
            attr = document.createElement("div");
            for (let item of hero[key]) {
              const attrItem = document.createElement("li");
              attrItem.classList.add("film-item");
              attrItem.innerHTML = `${item[0].toUpperCase() + item.slice(1)}`;
              attrList.append(attrItem);
            }
          } else {
            isContinue = true;
            break;
          }
          attr.innerHTML = `${key[0].toUpperCase() + key.slice(1)}`;
          attr.append(attrList);
          attr.classList.add("stats");
          attr.classList.add(`${key}`);
          card.append(attr);
        } else if (key === "gender") {
          if (
            filters.gender === hero[key] ||
            filters.gender === undefined ||
            filters.gender === ""
          ) {
            addAttr(card, attr, hero, key);
          } else {
            isContinue = true;
            break;
          }
        } else if (key === "species") {
          if (filters.isHuman === hero[key] || filters.isHuman === undefined) {
            addAttr(card, attr, hero, key);
          } else {
            isContinue = true;
            break;
          }
        } else if (key === "status") {
          if (filters.isAlive === hero[key] || filters.isAlive === undefined) {
            addAttr(card, attr, hero, key);
          } else {
            isContinue = true;
            break;
          }
        } else {
          addAttr(card, attr, hero, key);
        }
      }
      if (isContinue) {
        continue;
      } else {
        cards.append(card);
      }
    }
  };
  const addAttr = (card, attr, hero, key) => {
    attr = document.createElement("div");
    attr.innerHTML = `${key[0].toUpperCase() + key.slice(1)}<div>${
      hero[key]
    }</div>`;
    attr.classList.add("stats");
    attr.classList.add(`${key}`);
    card.append(attr);
  };

  getData(url)
    .then((data) => {
      console.log(data);
      render(data);
    })
    .catch((error) => console.log(error));

  btnSearch.addEventListener("click", () => {
    filters.gender = gender.options[gender.selectedIndex].value;
    if (isHuman.checked) {
      filters.isHuman = isHuman.value;
    } else {
      filters.isHuman = undefined;
    }
    if (isAlive.checked) {
      filters.isAlive = isAlive.value;
    } else {
      filters.isAlive = undefined;
    }
    filters.filmsCount = filmsCount.value;
    console.log(filters);
    cards.innerHTML = "";
    getData(url)
      .then((data) => {
        console.log(data);
        render(data);
      })
      .catch((error) => console.log(error));
  });

  btnShowAll.addEventListener("click", () => {
    delete filters.gender;
    delete filters.isHuman;
    delete filters.isAlive;
    delete filters.filmsCount;
    cards.innerHTML = "";
    getData(url)
      .then((data) => {
        console.log(data);
        render(data);
      })
      .catch((error) => console.log(error));
  });
};

export default getInfo;
