const previousOperationText = document.querySelector('#previous-operations');
const currentOperationText = document.querySelector('#current-operations');
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
      constructor(previousOperationText, currentOperationText){
         this.previousOperationText = previousOperationText;
         this.currentOperationText = currentOperationText;
         this.currentOperation = "";
      }
     
      //add digit calculator screen
      addDigit(digit) {
        console.log(digit);
       //check if current operation already has a dot
       if(digit === "." && this.currentOperationText.innerText.includes(".")){
        return;
       }

         this.currentOperation = digit;
         this.updateScreen();
      }
      // process all calculator operations
      processOperation(operation){
        //check if current is empty
        if (this.currentOperationText.innerText === "" && operation !== "C") {
          // Change operation
          if (this.previousOperationText.innerText !== "") {
            this.changeOperation(operation);
          }
          return;
        }
        // get current and previuous value
          let operationValue;
          let previous = +this.previousOperationText.innerText.split(" ")[0];
          let current = +this.currentOperationText.innerText;

        switch (operation) {
              case "+":
              operationValue = previous + current;
              this.updateScreen(operationValue, operation, current, previous);
             break;
              
              case "-":
              operationValue = previous - current;
              this.updateScreen(operationValue, operation, current, previous);
              break;

              case "/":
              operationValue = previous / current;
              this.updateScreen(operationValue, operation, current, previous);
              break;
             
              case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous);
                break;

                case "C":
                this.processClearOperation()
                break;

                case "DEL":
                this.processDelOperator();
                break;

                case "CE":
                this.processClearCurrentOperation();
                break;

                case "=":
                this.processEqualOperation();
                break;
                default:
                  return;
               
        }

      }

      //change value of the calculator screen
      updateScreen(
        operationValue = null, 
        operation = null, 
        current = null, 
        previous = null
      ){

        console.log(operationValue, operation, current, previous);

        if(operationValue === null){

          this.currentOperationText.innerText += this.currentOperation; 
        } else{
           // check if value is zero, if it is just add current value 
           if(previous === 0){
            operationValue = current
           }

           // add creent value to previuos
           this.previousOperationText.innerText = `${operationValue} ${operation}`;
           this.currentOperationText.innerText = "";

        }
        
      }

      //chance math operation
      changeOperation(operation){


        const mathOperation = ["*", "/", "+", "-"];

        if(!mathOperation.includes(operation)){
          return;
        }
       
        this.previousOperationText.innerText = 
        this.previousOperationText.innerText.slice(0, -1) + operation;
        
      }
      //Dalete the last digit
      processDelOperator(){
           this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
      }
       // Clear current operation
       processClearCurrentOperation(){
        this.currentOperationText.innerText = "";
       }
       // clear all operation
       processClearOperation(){
        this.previousOperationText.innerText = "";
        this.currentOperationText.innerText = "";
       }

       //process an operation
       processEqualOperation(){
        let operation = this.previousOperationText.innerText.split(" ")[1];

        this.processOperation(operation);
       }

};

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach(btn => {
    btn.addEventListener("click", (e) => {

        const value = e.target.innerText;
       
        if(+value >= 0 || value === "."){
          console.log(value);
          calc.addDigit(value);
        }else{
           calc.processOperation(value);
        }
    });
});