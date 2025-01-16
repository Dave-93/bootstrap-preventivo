const inputName = document.querySelector("#input-name");
const inputSurname = document.querySelector("#input-surname");
const inputEmail = document.querySelector("#input-email");
const inputSelect = document.querySelector("#input-select");
const inputTextarea = document.querySelector("#input-textarea");
const inputPromoCode = document.querySelector("#input-promo-code");
const inputCheck = document.querySelector("#input-check");

const submitPreventive = document.querySelector("#submit-preventive");
const resultPreventive = document.querySelector("#result-preventive");
const resultCoupon = document.querySelector("#result-coupon");
const resultError = document.querySelector("#result-error");

const couponList = ["YHDNU32", "JANJC63", "PWKCN25", "SJDPO96", "POCIE24"];

//todo BONUS

const jobs =[
    {value: "0", text: "Scegli il tipo di lavoro"},
    {value: "1", text: "Backed Development"},
    {value: "2", text: "Frontend Development"},
    {value: "3", text: "Project Analysis"}
];

jobs.forEach(function(element) {
    const option = document.createElement("option");
    option.value = element.value;   // Imposta il valore
    option.innerHTML = element.text;  // Imposta il testo visibile
    inputSelect.appendChild(option);  // Aggiungi l'opzione al select
});
//todo

submitPreventive.addEventListener("click", function(event){
    event.preventDefault();

// VALIDAZIONI CAMPI
    let validInputName = validInput(inputName);
    let validInputSurname = validInput(inputSurname);
    let validInputEmail = validInput(inputEmail);
    let validInputSelect = validSelect(inputSelect);
    let validInputCheck = validCheckbox(inputCheck);
    let couponActive = checkCoupon(inputPromoCode);
//
    
    //CONTROLLO DI BLOCCO SE I CAMPI SONO VUOTI
    if((!validInputName) || (!validInputSurname) || (!validInputEmail) || (!validInputSelect) || (!validInputCheck)){//verifica se la variabile è "FALSY". Restituisce TRUE se il valore della var è "false"(input vuoto) che soddisfando la condizione blocca l'esecuzione, altrimenti se il valore della var è "true"(input pieno) restituisce FALSE e non soddisfando la condizione passa all'else che esegue il calcolo del prezzo
        resultError.innerHTML = "Per favore compila tutti i campi e riprova!";
        timerOutput();
        return;
    }
    // CALCOLO PREZZO e CONTROLLO PER APPLICARE LO SCONTO
        let price;
        switch(inputSelect.value){ //assegno direttamente il prezzo alla variabile in base alla scelta fatta sul select
            case "1":
                price = 20.5 * 10;
                break;
            case "2":
                price = 15.3 * 10;
                break;
            case "3":
                price = 33.6 * 10;
                break;
        }
        if (!couponActive) {
            resultPreventive.innerHTML = formatPrice(price);
            timerOutput();
        } else {
            resultPreventive.innerHTML = formatPrice(price * 75 / 100); // Prezzo con sconto
            timerOutput();
        }
    //
})

// VALIDAZIONE SELECT
function validSelect(select){
    let checkValidSelect;
    const valSelect = select.value;
    if((valSelect === "1") || (valSelect === "2") || (valSelect === "3")){
        select.classList.remove("is-invalid");
        select.classList.add("is-valid");  
        checkValidSelect = true;
    }else{
        select.classList.remove("is-valid");
        select.classList.add("is-invalid");
        checkValidSelect = false;
    }
    return checkValidSelect;//così restituisce direttamente TRUE se è stata effettuata una scelta, o FALSE se Non è stata fatta alcuna scelta
}
//

// VALIDAZIONE e CONTROLLO SUL COUPON
function checkCoupon(input){
    let couponActive;
    if(!(input.value)){
        resultCoupon.innerHTML = "Coupon assente!"
        resultCoupon.classList.remove("text-success");
        resultCoupon.classList.remove("text-danger");
        resultCoupon.classList.add("text-info");
        couponActive = false;//assegna il valore alla variabile
    }else if(couponList.includes(input.value)){
        resultCoupon.innerHTML = "Coupon valido!"
        resultCoupon.classList.remove("text-danger");
        resultCoupon.classList.remove("text-info");
        resultCoupon.classList.add("text-success");
        couponActive = true;//assegna il valore alla variabile
    }else{
        resultCoupon.innerHTML = "Coupon non valido!"
        resultCoupon.classList.remove("text-success");
        resultCoupon.classList.remove("text-info");
        resultCoupon.classList.add("text-danger");
        couponActive = false;//assegna il valore alla variabile
    }
    return couponActive;//restituisce valore TRUE se nell'input è presente il coupon giusto, o FALSE se il coupon Non è stato inserito o non è corretto
}
//

// VALIDAZIONE INPUT TEXT
function validInput(input){
    let checkValidInput;
    const valInput = input.value;
    if(!valInput){
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        checkValidInput = false;
    }else{
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
        checkValidInput = true;
    }
    return checkValidInput;//così restituisce direttamente TRUE se nell'input è presente del contenuto, o FALSE se Non ha contenuto
}
//

// VALIDAZIONE CHECKBOX
function validCheckbox(checkbox){
    let checkValidCheckbox;
    if(checkbox.checked){//.checked è una proprietà che mi permette di vedere lo stato di una checkbox, restituendo TRUE se la checkbox è selezionata, o FALSE se non lo è
        checkbox.classList.remove("is-invalid");
        checkbox.classList.add("is-valid");
        checkValidCheckbox = true;
    }else{
        checkbox.classList.remove("is-valid");
        checkbox.classList.add("is-invalid");
        checkValidCheckbox = false;
    }
    return checkValidCheckbox;
}
//

// TIMER
function timerOutput(){
    setTimeout(function() {//Pulisce il messaggio dopo 5 secondi
        resultError.innerHTML = ""; 
        resultCoupon.innerHTML = "";
        resultPreventive.innerHTML = "";
    }, 5000);
}
//

// FORMATTAZIONE PREZZO
function formatPrice(resultPrice) {
    resultPrice = resultPrice.toFixed(2).replace(".", ",").split(",");
    let integerPart = resultPrice[0];
    let decimalPart = resultPrice[1];
    return `<strong>€ ${integerPart}</strong>,${decimalPart}`;
}
//