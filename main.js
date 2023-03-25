const formatter = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

const datePrintOptions = {year: 'numeric', month: 'long', day: 'numeric' }

let beginDate = new Date('2022-08-13')
let endDate = new Date(Date.now())
let paymentDayOfMonth = 13
let payments = [
    {
        date: new Date(Date.parse('2022-08-16')),
        amount: 1000
    }
]
let debt = 0

let rent = 500
let fineRate = 0.02

let debtsByDay = []
let currentDebt = 0
let currentTotalFine = 0

for (let date = beginDate; date <= endDate; date = new Date(date.setDate(date.getDate() + 1))) {
    if (date.getDate() === paymentDayOfMonth) {
        currentDebt += rent
    }
    paymentsThisDay = payments.filter((p) => p.date.getTime() === date.getTime()).map((p) => p.amount).reduce((a, b) => a + b, 0)
    currentDebt -= paymentsThisDay
    let fineThisDay = 0
    if (currentDebt > 0) {
        fineThisDay = currentDebt * fineRate
        currentTotalFine += fineThisDay
    }
    current = {
        date: date,
        total: currentDebt + currentTotalFine,
        debt: currentDebt,
        fine: currentTotalFine,
        fineThisDay: fineThisDay
    }
    debtsByDay.push(current)
}

for (let i = debtsByDay.length - 1; i >= 0; i--) {
    let cur = debtsByDay[i]
    
    let table = document.getElementById('rent-table')
    let row = document.createElement('tr')
    
    let tdDate = document.createElement('td')
    tdDate.innerHTML = cur.date.toLocaleDateString('ru-RU', datePrintOptions)
    row.append(tdDate)
    
    let tdDebt = document.createElement('td')
    tdDebt.innerHTML = formatter.format(cur.debt)
    row.append(tdDebt)
    
    let tdFine = document.createElement('td')
    tdFine.innerHTML = formatter.format(cur.fine)
    row.append(tdFine)
    
    let tdTotal = document.createElement('td')
    tdTotal.innerHTML = formatter.format(cur.total)
    row.append(tdTotal)
    
    let tdFineThisDay = document.createElement('td')
    tdFineThisDay.innerHTML = formatter.format(cur.fineThisDay)
    row.append(tdFineThisDay)

    table.append(row)
}

otherDebts = [
    {
        who: 'Тёма',
        amount: 39000
    },
    {
        who: 'Саша',
        amount: 24268
    },
    {
        who: 'Соня',
        amount: 20000
    }
]

otherDebts.unshift(
    {
        who: 'Всего',
        amount: otherDebts.map((d) => d.amount).reduce((a, b) => a + b)
    }
)

for (let i = 0; i < otherDebts.length; i++) {
    cur = otherDebts[i]
    
    let table = document.getElementById('other-table')

    let row = document.createElement('tr')
    
    let tdWho = document.createElement('td')
    tdWho.innerHTML = cur.who
    row.append(tdWho)
    
    let tdDebt = document.createElement('td')
    tdDebt.innerHTML = formatter.format(cur.amount)
    row.append(tdDebt)

    table.append(row)
}