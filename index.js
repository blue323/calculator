let buttonsNumbers = document.querySelectorAll(".number")
const clear = document.getElementById("clear")
const addBtn = document.getElementById("plus")
const subtractBtn = document.getElementById("minus")
const timesBtn = document.getElementById("times")
const divisionBtn = document.getElementById("division")
const arrowBtn = document.getElementById("back-arrow")
const equalBtn = document.getElementById("equal")
let dotBtn = document.querySelector(".dot")
let totalInfo = document.querySelector(".total")
let currentValue = document.querySelector(".currentValue")
let cValue = 0;
let cValue2 = 0;
let operator = "";
let total = 0;
let iscValue0 = true;


function displayResults() {
    cValue = 0
    cValue2 = 0
    iscValue0 = true
    dotBtn.disabled = false
    dotBtn.classList.remove("disabled")
    operator = ""
    currentValue.textContent = cValue
    totalInfo.style.color = "black"
    totalInfo.textContent = `Total: ${total}`
}

function changeTocValue2() {
    if(cValue !== 0) {
        iscValue0 = false
        dotBtn.disabled = false
        dotBtn.classList.remove("disabled")
        cValue2 = 0
        currentValue.textContent = 0
    }
}

equalBtn.addEventListener("click", () => {
    let result = operate(operator, cValue, cValue2)

    if(operator === "") {
        alert("You didn't select an operator")
    } else if(operator === "-") {
        if((total !== 0 || total === 0) && cValue2 === 0 ) {
            total -= result
        }
        if((total !== 0 || total === 0) && cValue2 !== 0) {
            total += result
        }  
    } else if (operator === "*") {
        if(cValue2 !== 0 && total !== 0) {
            total *= result
        }
        if(total === 0) {
            total = result
        }
        if(cValue2 === 0) {
            result = operate(operator, cValue, 1)
            total *= result
        }
    } else if(operator === "/") {
        if(cValue2 === 0 && total === 0) {
            alert("Infinity!!!");
            clearResults()
        }
        if(cValue2 !== 0) {
            total += result
        }
        if(total !== 0 && cValue2 === 0) {
            result = operate(operator, total, cValue)
            total = result 
        }
    } else if(operator === "+") {
        total += result
    }

    displayResults()
})

addBtn.addEventListener("click", () => {
    operator = "+"
    changeTocValue2()
})

subtractBtn.addEventListener("click", () => {
    operator = "-"
    changeTocValue2()
})

timesBtn.addEventListener("click", () => {
    operator = "*"
    changeTocValue2()
})

divisionBtn.addEventListener("click", () => {
    operator = "/"
    changeTocValue2()
})

clear.addEventListener("click", clearResults)

function clearResults() {
    cValue = 0
    cValue2 = 0
    total = 0
    iscValue0 = true
    dotBtn.disabled = false
    dotBtn.classList.remove("disabled")
    currentValue.textContent = cValue
    totalInfo.textContent = `Total: ${total}`
}

arrowBtn.addEventListener("click", () => {
    let convertToArray = currentValue.textContent.split("")
    convertToArray.pop()
    let convertToString = convertToArray.join("")
    currentValue.textContent = convertToString

    if(!convertToString.includes(".")){
        dotBtn.disabled = false
        dotBtn.classList.remove("disabled")
    }
    
    if(iscValue0) {
        cValue =  Number(currentValue.textContent)
    }
    if(iscValue0 === false) {
        cValue2 =  Number(currentValue.textContent)
    }
})

dotBtn.addEventListener("click", () => {
    dotBtn.disabled = true
    dotBtn.classList.add("disabled")
})

buttonsNumbers.forEach(button => {
    button.addEventListener('click', (e) => {
        if(cValue === 0 && iscValue0) {
            cValue = `${e.target.value}`
            currentValue.textContent = cValue
        } else if(cValue !== 0  && iscValue0) {
            cValue += `${e.target.value}`
            currentValue.textContent = cValue
        } else if(cValue2 === 0 && iscValue0 === false) {
            cValue2 = `${e.target.value}`
            currentValue.textContent = cValue2
        } else if(cValue !== 0 && iscValue0 === false) {
            cValue2 += `${e.target.value}`
            currentValue.textContent = cValue2
        }
    })
})

function add(num1, num2) {
    return Number(num1) + Number(num2)
}

function subtract(num1, num2) {
    return Number(num1) - Number(num2)
}

function multiply(num1, num2) {
    return Math.round(Number(num1) * Number(num2) * 100) / 100
}

function divide(num1, num2) {
    return Math.round(Number(num1) / Number(num2) * 100) / 100
}

function operate(operator, num1, num2) {
    if(operator === "+") {
        return add(Number(num1), Number(num2))
    } else if(operator === "-") {
        return subtract(Number(num1), Number(num2))
    } else if(operator === "*") {
        return multiply(Number(num1), Number(num2)) 
    } else if(operator === "/") {
         return divide(Number(num1), Number(num2))
    }
}