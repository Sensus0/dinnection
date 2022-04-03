document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
  });

  function clickCounter() {
    if (typeof(Storage) !== "undefined") {
      if (localStorage.clickcount) {
        localStorage.clickcount = Number(localStorage.clickcount)+1;
      } else {
        localStorage.clickcount = 1;
      }
      document.getElementById("result").innerHTML = "Likes " + localStorage.clickcount + " ";
    } else {
      document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
    }
  }

  function clickCounter1() {
    if (typeof(Storage) !== "undefined") {
      if (localStorage.clickcount) {
        localStorage.clickcount = Number(localStorage.clickcount)+1;
      } else {
        localStorage.clickcount = 1;
      }
      document.getElementById("result1").innerHTML = "Likes " + localStorage.clickcount + " ";
    } else {
      document.getElementById("result1").innerHTML = "Sorry, your browser does not support web storage...";
    }
  }

  function clickCounter2() {
    if (typeof(Storage) !== "undefined") {
      if (localStorage.clickcount) {
        localStorage.clickcount = Number(localStorage.clickcount)+1;
      } else {
        localStorage.clickcount = 1;
      }
      document.getElementById("result2").innerHTML = "Likes " + localStorage.clickcount + " ";
    } else {
      document.getElementById("result2").innerHTML = "Sorry, your browser does not support web storage...";
    }
  }

  function clickCounter3() {
    if (typeof(Storage) !== "undefined") {
      if (localStorage.clickcount) {
        localStorage.clickcount = Number(localStorage.clickcount)+1;
      } else {
        localStorage.clickcount = 1;
      }
      document.getElementById("result3").innerHTML = "Likes " + localStorage.clickcount + " ";
    } else {
      document.getElementById("result3").innerHTML = "Sorry, your browser does not support web storage...";
    }
  }

  function clickCounter4() {
    if (typeof(Storage) !== "undefined") {
      if (localStorage.clickcount) {
        localStorage.clickcount = Number(localStorage.clickcount)+1;
      } else {
        localStorage.clickcount = 1;
      }
      document.getElementById("result4").innerHTML = "Likes " + localStorage.clickcount + " ";
    } else {
      document.getElementById("result4").innerHTML = "Sorry, your browser does not support web storage...";
    }
  }

  function clickCounter5() {
    if (typeof(Storage) !== "undefined") {
      if (localStorage.clickcount) {
        localStorage.clickcount = Number(localStorage.clickcount)+1;
      } else {
        localStorage.clickcount = 1;
      }
      document.getElementById("result5").innerHTML = "Likes " + localStorage.clickcount + " ";
    } else {
      document.getElementById("result5").innerHTML = "Sorry, your browser does not support web storage...";
    }
  }
 
 