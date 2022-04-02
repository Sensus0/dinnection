document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
  });

  let counterDisplayElem = document.querySelector('.counter-display');
  let counterPlusElem = document.querySelector('.counter-plus');
  
  let count = 0;

  updateDisplay();

  counterPlusElem.addEventListener("click",()=>{
    count++;
    updateDisplay();
}) ;





function updateDisplay(){
    counterDisplayElem.innerHTML = count;
};
  // Initialize collapsible (uncomment the lines below if you use the dropdown variation)
  // var collapsibleElem = document.querySelector('.collapsible');
  // var collapsibleInstance = M.Collapsible.init(collapsibleElem, options);

  // Or with jQuery

 