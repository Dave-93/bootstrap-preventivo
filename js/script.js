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

const couponList = ["YHDNU32", "JANJC63", "PWKCN25", "SJDPO96", "POCIE24"];


submitPreventive.addEventListener("click", function(event){
    event.preventDefault();

// VALIDAZIONI CAMPI
    let validInputName = validInput(inputName);
    console.log(validInputName);
    let validInputSurname = validInput(inputSurname);
    console.log(validInputSurname);
    let validInputEmail = validInput(inputEmail);
    console.log(validInputEmail);
    let validInputSelect = validSelect(inputSelect);
    console.log(validInputSelect);
    let couponActive = checkCoupon(inputPromoCode);
    console.log(couponActive);

    //todo VALID CHECKBOX
    //todo TOGLIERE TUTTI I CONSOLE
//
    
// CALCOLO DEGLI SCONTI 
    const couponBackEnd = ((10 * 20.5) * (25 / 100));
    const couponFrontEnd = ((10 * 15.3) * (25 / 100));
    const couponProject = ((10 * 33.6) * (25 / 100));
//

//CONTROLLO DI BLOCCO SE I CAMPI SONO VUOTI
    if((!validInputName) || (!validInputSurname) || (!validInputEmail) || (!validInputSelect)){//verifica se la variabile è "FALSY". Restituisce TRUE se il valore della var è "false"(input vuoto) che soddisfando la condizione blocca l'esecuzione, altrimenti se il valore della var è "true"(input pieno) restituisce FALSE e non soddisfando la condizione passa all'else che esegue il calcolo del prezzo
        console.log("blocca codice")
        alert("Compila tutti i campi")
        return;
    }else{
        console.log("continua esecuzione")
    // CALCOLO PREZZO e CONTROLLO PER APPLICARE LO SCONTO
    if(!couponActive){
        if(inputSelect.value === "1"){
            let backEnd = (10 * 20.5);
            resultPreventive.innerHTML = `€ ${backEnd.toFixed(2).replace(".",",")}`;
        }else if(inputSelect.value === "2"){
            let frontEnd = (10 * 15.3);
            resultPreventive.innerHTML = `€ ${frontEnd.toFixed(2).replace(".",",")}`;
        }else if(inputSelect.value === "3"){
            let project = (10 * 33.6);
            resultPreventive.innerHTML = `€ ${project.toFixed(2).replace(".",",")}`;
        }
    }else{
        if(inputSelect.value === "1"){
            let backEnd = (10 * 20.5) - couponBackEnd;
            resultPreventive.innerHTML = `€ ${backEnd.toFixed(2).replace(".",",")}`;
        }else if(inputSelect.value === "2"){
            let frontEnd = (10 * 15.3) - couponFrontEnd;
            resultPreventive.innerHTML = `€ ${frontEnd.toFixed(2).replace(".",",")}`;
        }else if(inputSelect.value === "3"){
            let project = (10 * 33.6) - couponProject;
            resultPreventive.innerHTML = `€ ${project.toFixed(2).replace(".",",")}`;
        }
    }
    //
    }
})

// CONTROLLO SUL COUPON
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
    return couponActive;//restituisce quel valore che è TRUE se nell'input è presente il coupon giusto, o FALSE se il coupon Non è stato inserito o non è corretto
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
    return checkValidInput;//così restituisce direttamente TRUE se nell'input è presente del contienuto, o FALSE se Non ha contenuto
}
//

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
    return checkValidSelect;//così restituisce direttamente TRUE se è stata selezionata una scelta, o FALSE se Non è stata fatta alcuna scelta
}
//