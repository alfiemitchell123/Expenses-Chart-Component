// Fetch w/ .then is one way of fetching data from a JSON file / API
// fetch('/data.json')
//     .then(res => {
//         return res.json();
//     })
//     .then(data => {
//         data.forEach(expense => {
//             const markup = `<li>${expense.day}</li>`;

//             document.querySelector('ul').insertAdjacentHTML('beforeend', markup);
//         });
//     })
//     .catch(error => console.log(error));

// Async/await is a more concise / easy to read method of fetching data from a JSON file / API
async function fetchData() {
    const res = await fetch('/data.json');
    const data = await res.json();

    if (!Array.isArray(data)) {
        throw new Error('Invalid JSON data: Expected an array.');
    }

    return data;
}

async function tableData() {
    try {
        const jsonData = await fetchData();

        jsonData.forEach(expense => {
            const day = `<tr class="day"><th scope="row">${expense.day}</th></tr>`;
            document.querySelector('tbody').insertAdjacentHTML('beforeend', day);

            const dayElements = document.querySelectorAll('.day');
            const lastDayElement = dayElements[dayElements.length - 1];

            const amount = `<td class="amount"><p>${expense.amount}</p></td>`;
            lastDayElement.insertAdjacentHTML('beforeend', amount);
        });
    } catch (error) {
        console.log('Error fetching/parsing JSON:', error);
    }
}
tableData();


async function calculateSum() {
    try {
        const jsonData = await fetchData();

        const totalSum = jsonData.reduce((acc, expense) => acc + expense.amount, 0);

        const total = `Total: ${totalSum}`
        document.querySelector('p').insertAdjacentHTML('beforeend', total);
    } catch (error) {
        console.log('Error fetching/parsing JSON:', error);
    }
}
calculateSum();