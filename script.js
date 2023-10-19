const $form = document.getElementById('form');
const $date = document.getElementById('date');
const $clear = document.getElementById('clear');
const $searchHistory = document.getElementById('search-history');
const $colors = document.getElementById('colors');

const history = JSON.parse(localStorage.getItem('searchHistory')) || [];


$form.addEventListener('submit', async function(e) {
  e.preventDefault();

  
  const selectedDate = $date.value;

  
  const response = await fetch(`https://colors.zoodinkers.com/api?date=${selectedDate}`);
  const data = await response.json();
  const color = data.color;
  const hex = data.hex;
  const date = data.date;

  const li = document.createElement('li');
  const colorDiv = document.createElement('div');
  const swatch = document.createElement('div');
  swatch.style.backgroundColor = hex;
  swatch.classList.add('swatch');
  const dateDiv = document.createElement('div');
  dateDiv.textContent = `Date: ${date}, Color: ${color}, Hex: ${hex}`;
  colorDiv.appendChild(swatch);
  colorDiv.appendChild(dateDiv);
  li.appendChild(colorDiv);
  $searchHistory.appendChild(li);

  
  const searchItem = { date: date, color: color, hex: hex };
  history.push(searchItem);
  localStorage.setItem('searchHistory', JSON.stringify(history));


  $date.value = '';
});


$clear.addEventListener('click', function(e) {
  
  history.splice(0, history.length);

  
  while ($searchHistory.firstChild) {
    $searchHistory.removeChild($searchHistory.firstChild);
  }

  while ($colors.firstChild) {
    $colors.removeChild($colors.firstChild);
  }

  localStorage.clear();
});










 