const tipPercentBtn = document.querySelectorAll('.tipPercent')
const resetBtn = document.querySelector('.reset')
const billInput = document.querySelector('.input_bill')
const peopleInput = document.querySelector('.input_poeple')
const customInput = document.querySelector('.customTip')
const errorMessagePeople = document.querySelector('.error_message_people')

const tipAmount = document.querySelector('.tip_amount')
const total = document.querySelector('.totalBill')

let tipPercent = 5;

let totalValue = 0;
let tipAmountValue = 2;
let poepleValue = 0

tipPercentBtn.forEach(btn => {

    btn.addEventListener('click', () => {
        tipPercentBtn.forEach(item => {
            item.classList.remove('active');
        })
        customInput.classList.remove('active')
        customInput.classList.remove('invalid')
        console.log(parseInt(btn.innerHTML.slice(0, -1)));
        btn.classList.add('active')
        tipPercent = btn.innerHTML.slice(0, -1)
        refresh()
    })
})

billInput.addEventListener('input', refresh)
peopleInput.addEventListener('input', refresh)
customInput.addEventListener('input', customFunction)
resetBtn.addEventListener('click', reset)

reset()


function reset() {

    tipPercent = 5;
    totalValue = 0;
    tipAmountValue = 2;
    poepleValue = 1
    billInput.value = ""
    peopleInput.value = "1"
    customInput.value = ""
    tipPercentBtn.forEach(item => {
        item.classList.remove('active');
    })
    customInput.classList.remove('active')
    customInput.classList.remove('invalid')
    tipPercentBtn[0].classList.add('active');
    tipAmount.innerHTML = `$0`
    total.innerHTML = `$0`
    refresh()
}


function customFunction() {
    tipPercentBtn.forEach(item => {
        item.classList.remove('active');
    })
    customInput.classList.remove('invalid')
    if (customInput.value == "") {
        tipPercentBtn[0].classList.add('active');
        refresh()
        return
    }
    customInput.classList.add('active')
    let isnum = /^\d+$/.test(customInput.value);
    console.log(isnum)
    if (isnum) {
        tipPercent = customInput.value
    }
    else {
        customInput.classList.add('invalid')
    }
    refresh()
}

function refresh() {
    errorMessagePeople.classList.remove('invalid')
    peopleInput.classList.remove('invalid')
    if (peopleInput.value == "") {
        errorMessagePeople.classList.add('invalid')
        peopleInput.classList.add('invalid')
        errorMessagePeople.innerText = "Can't be empty"
        return
    }
    if (parseInt(peopleInput.value) == 0) {

        errorMessagePeople.classList.add('invalid')
        peopleInput.classList.add('invalid')
        errorMessagePeople.innerText = "Can't be zero"
        return
    }
    if (billInput.value == "") {
        tipAmount.innerHTML = `$0`
        total.innerHTML = `$0`
        return
    }
    poepleValue = peopleInput.value
    tipAmountValue = (billInput.value * tipPercent / 100) / parseFloat(poepleValue)
    totalValue = ((parseFloat(billInput.value) + tipAmountValue) / parseFloat(poepleValue))
    tipAmount.innerHTML = `$${tipAmountValue.toFixed(2)}`
    total.innerHTML = `$${totalValue.toFixed(2)}`
}