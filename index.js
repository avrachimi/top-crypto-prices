const mktCapFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
});

const priceFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

// Update data every 30 seconds
const interval = setInterval(function () {
    fetchData();
}, 60000);

const API_BASE_URL = 'https://api.coingecko.com/api/v3/';

const vs_currency = "usd",
    order = "market_cap_desc",
    per_page = 10;

const options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
};

function fetchData() {
    fetch(`${API_BASE_URL}/coins/markets?vs_currency=${vs_currency}&order=${order}&per_page=${per_page}`, options)
        .then((response) => response.json())
        .then((data) => populateCryptoDetails(data));
}

function populateCryptoDetails(data) {
    let cryptoList = document.getElementById('crypto-list');
    cryptoList.innerHTML = '';

    let counter = 1;
    data.forEach(coin => {
        let parentDiv = document.createElement('div');
        parentDiv.className = 'list-item row';

        let number = document.createElement('span');
        number.className = 'number';
        number.innerHTML = counter;
        let name = document.createElement('span');
        name.className = 'name';
        name.innerHTML = coin.name;
        let change_24h = document.createElement('span');
        let percent_change_24h = Math.round(coin.price_change_percentage_24h * 100) / 100;
        change_24h.className = percent_change_24h >= 0 ? '24h-change green' : '24h-change red';
        change_24h.innerHTML = `${percent_change_24h}%`;
        let mktCap = document.createElement('span');
        mktCap.className = 'mkt-cap';
        mktCap.innerHTML = `${mktCapFormatter.format(coin.market_cap)}`;
        let ATHPercentage = document.createElement('span');
        let ath_percent = Math.round(coin.ath_change_percentage * 100) / 100;
        ATHPercentage.className = ath_percent >= 0 ? 'ath-percentage green' : 'ath-percentage red';
        ATHPercentage.innerHTML = `${ath_percent}%`; // TODO: change
        let price = document.createElement('span');
        price.className = 'price';
        price.innerHTML = `${priceFormatter.format(coin.current_price)}`;

        parentDiv.appendChild(number);
        parentDiv.appendChild(name);
        parentDiv.appendChild(change_24h);
        parentDiv.appendChild(mktCap);
        parentDiv.appendChild(ATHPercentage);
        parentDiv.appendChild(price);

        cryptoList.appendChild(parentDiv);

        counter++;
    });
}

fetchData();
