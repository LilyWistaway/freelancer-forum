/**
 * @typedef Freelancer
 * @property {string} name
 * @property {string} occupation
 * @property {number} rate
 */

// === Constants ===
const NAMES = ["Alice", "Bob", "Carol", "Dave", "Eve"];
const OCCUPATIONS = ["Writer", "Teacher", "Programmer", "Designer", "Engineer"];
const PRICE_RANGE = { min: 20, max: 200 };
const NUM_FREELANCERS = 100;

function pick(array) {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}

function makeFreelancer() {
  const name = pick(NAMES);
  const occupation = pick(OCCUPATIONS);
  const rate =
    Math.floor(Math.random() * (PRICE_RANGE.max - PRICE_RANGE.min + 1)) +
    PRICE_RANGE.min;
  return { name, occupation, rate };
}

const freelancers = Array.from({ length: NUM_FREELANCERS }, () =>
  makeFreelancer()
);
console.log(freelancers);

function FreelancerCard(freelancer) {
  const card = document.createElement("div");
  card.className = "card";
  const nameElement = document.createElement("h3");
  const occElement = document.createElement("p");
  const rateElement = document.createElement("p");
  nameElement.textContent = freelancer.name;
  occElement.textContent = freelancer.occupation;
  rateElement.textContent = `$${freelancer.rate}/hr`;
  card.append(nameElement, occElement, rateElement);
  return card;
}

function FreelancerCards(list) {
  const container = document.createElement("section");
  container.className = "cards";
  const frag = document.createDocumentFragment();
  list.forEach((f) => frag.appendChild(FreelancerCard(f)));
  container.appendChild(frag);
  return container;
}

function avgRate(list) {
  if (list.length === 0) return 0;
  const total = list.reduce((sum, f) => sum + f.rate, 0);
  const average = total / list.length;
  return Math.round(average);
}

let currentQuery = "";

function filterByOccupation(list, query) {
  const q = query.trim().toLowerCase();
  if (q === "") return list;
  return list.filter((freelancer) =>
    freelancer.occupation.toLowerCase().includes(q)
  );
}

function render() {
  const app = document.querySelector("#app");
  app.innerHTML = "";

  const heading = document.createElement("h1");
  heading.textContent = "Freelancer Rate Selector";
  heading.className = "heading";
  app.appendChild(heading);

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Filter by occupation (e.g., Engineer)";
  input.className = "filter";
  input.value = currentQuery;

  const visible = filterByOccupation(freelancers, currentQuery);

  const avgElement = document.createElement("p");
  avgElement.className = "average";
  avgElement.textContent = `Average rate: $${avgRate(visible)}/hr`;

  app.appendChild(input);
  app.appendChild(avgElement);
  app.appendChild(FreelancerCards(visible));

  input.addEventListener("input", () => {
    currentQuery = input.value;
    render();
  });
}

render();
