let inputField = document.getElementById('input');
let outputField = document.getElementById('output');
function appendToInput(value) {
    inputField.value += value;
}

function clearInput() {
    inputField.value = '';
    outputField.value = '';
  }
  function backspace(){
    let x=inputField.value;
    inputField.value=x.slice(0,-1);
  }
  function calculate() {
    try {
      let num=eval(inputField.value)
      if(num%1!= 0){
        
        outputField.value=parseFloat(num).toFixed(2)
      }
      else{
      outputField.value =num ;
      }
      
    } catch (error) {
      outputField.value = 'INVALID FORMAT';
    }
  }
document.addEventListener('keydown',e=>{
    if(e.key=="Enter"){
        calculate();
    }
    else if(e.key=="Backspace"){
        backspace();
    }
    else if(e.key=="Escape"){
        clearInput();
    }
    else if((e.key>='0' && e.key<='9')|| e.key=='.'){
        appendToInput(e.key);
    }
    else if(e.key=='+' || e.key=='-' || e.key=='/' || e.key=='*'){
        appendToInput(e.key);
    }
})