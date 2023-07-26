// Fetch w/ .then is one way of fetching data from a JSON file / API (save for future reference)
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
    const res = await fetch('data.json');
    const data = await res.json();

    if (!Array.isArray(data)) {
        throw new Error('Invalid JSON data: Expected an array.');
    }

    return data;
}

// Display expense data in the graph
async function tableData() {
    try {
        const jsonData = await fetchData();

        jsonData.forEach(expense => {
            const amount = `<div class="day"><p class="p-amount">${expense.amount}</p></div>`;
            document.querySelector('ul').insertAdjacentHTML('beforeend', amount);

            const dayElements = document.querySelectorAll('.day');
            const lastDayElement = dayElements[dayElements.length - 1];

            const day = `<li class="li-day">${expense.day}</li>`;
            lastDayElement.insertAdjacentHTML('beforeend', day);

            const pElements = document.querySelectorAll('.p-amount');
            const lastPElement = pElements[pElements.length - 1];

            const bar = `<div class="bar" style="height:${(expense.amount) * 3}px"></div>`;
            lastPElement.insertAdjacentHTML('afterend', bar);

            ////////////////////////////////////////////////////////////////////////////////

            const barElements = document.querySelectorAll('.bar');

            barElements.forEach(function (barElement, index) {
                barElement.addEventListener('mouseover', function () {
                    pElements[index].style.opacity = "1";
                });
            })

            barElements.forEach(function (barElement, index) {
                barElement.addEventListener('mouseout', function () {
                    pElements[index].style.opacity = "0";
                });
            })
        });
    } catch (error) {
        console.log('Error fetching/parsing JSON:', error);
    }
}
tableData();

// Add the sum of the expenses and insert into the total for the month
// async function calculateSum() {
//     try {
//         const jsonData = await fetchData();

//         const totalSum = jsonData.reduce((acc, expense) => acc + expense.amount, 0);

//         const total = `$${totalSum}`
//         document.querySelector('#total-for-month').insertAdjacentHTML('beforeend', total);
//     } catch (error) {
//         console.log('Error fetching/parsing JSON:', error);
//     }
// }
// calculateSum();