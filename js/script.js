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
    validInput(inputName);
    validInput(inputSurname);
    validInput(inputEmail);
    validInputSelect(inputSelect);
    //validInput(inputCheck); la check NON funziona
//
    
// CALCOLO DEGLI SCONTI 
    const couponBackEnd = ((10 * 20.5) * (25 / 100));
    const couponFrontEnd = ((10 * 15.3) * (25 / 100));
    const couponProject = ((10 * 33.6) * (25 / 100));
//

    let couponActive = checkCoupon(inputPromoCode);//TODO prende il risultato restituito dalla funzione
    console.log(couponActive)

// CALCOLO PREZZO e CONTROLLO PER APPLICARE LO SCONTO
    if((inputSelect.value === "1") && (couponActive === "Ok")){//aggiungere il calcolo dello sconto coupon conFUNZIONE???
        let backEnd = (10 * 20.5) - couponBackEnd;
        resultPreventive.innerHTML = `€ ${backEnd.toFixed(2).replace(".",",")}`; 
    }else if(inputSelect.value === "1"){
        let backEnd = (10 * 20.5);
        resultPreventive.innerHTML = `€ ${backEnd.toFixed(2).replace(".",",")}`;
    }else if((inputSelect.value === "2") && (couponActive === "Ok")){
        let frontEnd = (10 * 15.3) - couponFrontEnd;
        resultPreventive.innerHTML = `€ ${frontEnd.toFixed(2).replace(".",",")}`; 
    }else if(inputSelect.value === "2"){
        let frontEnd = (10 * 15.3);
        resultPreventive.innerHTML = `€ ${frontEnd.toFixed(2).replace(".",",")}`; 
    }else if((inputSelect.value === "3") && (couponActive === "Ok")){
        let project = (10 * 33.6) - couponProject;
        resultPreventive.innerHTML = `€ ${project.toFixed(2).replace(".",",")}`; 
    }else if(inputSelect.value === "3"){
        let project = (10 * 33.6);
        resultPreventive.innerHTML = `€ ${project.toFixed(2).replace(".",",")}`;
    }
//
})

// CONTROLLO SUL COUPON
function checkCoupon(input){
    let couponActive;
    if(!(input.value)){
        resultCoupon.innerHTML = "Coupon assente!"
        resultCoupon.classList.remove("text-success");
        resultCoupon.classList.remove("text-danger");
        resultCoupon.classList.add("text-info");
        couponActive = "No";//assegna il valore alla variabile
        return couponActive;//restituisce quel valore
    }else if(couponList.includes(input.value)){
        resultCoupon.innerHTML = "Coupon valido!"
        resultCoupon.classList.remove("text-danger");
        resultCoupon.classList.remove("text-info");
        resultCoupon.classList.add("text-success");
        couponActive = "Ok";//assegna il valore alla variabile
        return couponActive;//restituisce quel valore
    }else{
        resultCoupon.innerHTML = "Coupon non valido!"
        resultCoupon.classList.remove("text-success");
        resultCoupon.classList.remove("text-info");
        resultCoupon.classList.add("text-danger");
        couponActive = "No";//assegna il valore alla variabile
        return couponActive;//restituisce quel valore
    }
}
//

// VALIDAZIONE INPUT TEXT
function validInput(input){
    const valInput = input.value;
    if(!valInput){
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
    }else{
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
    }
}
//

// VALIDAZIONE SELECT
function validInputSelect(select){
    const valSelect = select.value;
    if((valSelect === "1") || (valSelect === "2") || (valSelect === "3")){
        select.classList.remove("is-invalid");
        select.classList.add("is-valid");  
    }else{
        select.classList.remove("is-valid");
        select.classList.add("is-invalid");
    }
}
//