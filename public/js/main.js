
  const queryString = window.location.search;
  console.log(queryString);
  const urlParams = new URLSearchParams(queryString);
function start01(){

  const nomTest = urlParams.get('nomTest');
    document.getElementById("name_Test01").innerText=nomTest;
    document.getElementById("name_Test02").innerText=nomTest;

    window.raf = (function() {
        return window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          function(callback) {
            window.setTimeout(callback, 1000 / 60);
          };
      })();
      
      function Timer() {
        this.start01();
        return this;
      };
      
      Timer.prototype = {
   
        start01: function() {
          this.startTime = Date.now();
          return this;
        },
      
     
        getElapsedTime: function() {
          var minutes = 0;
          var seconds = parseInt((Date.now() - this.startTime) / 1000);
      
     
          if (seconds > 60) {
            minutes = Math.floor(seconds / 60);
            seconds = seconds - minutes * 60;
          }
      
         
          if (minutes > 60) {
            minutes = seconds - hours * 60;
            seconds = seconds - minutes * 3600;
          }
      
          return {
            minutes: pad(minutes, 2),
            seconds: pad(seconds, 2)
          };
        }
      };
      
      function pad(number, length) {
        var str = '' + number;
        while (str.length < length) {
          str = '0' + str;
        }
        return str;
      }
      
      var timer = new Timer();
      var output = document.getElementById('compteur');
      
      (function update() {
        var time = timer.getElapsedTime();
        output.textContent =  time.minutes + ':' + time.seconds;
        raf(update);
      })();
      suivant();
}
function startquiz(){
  start01();
  document.getElementById("btnGet").style.display ="none";
  document.getElementById("cnpric").style.display ="block";

}
let testAction = new TestAction();
let i = 1;
let quizz;
function suivant(){
    testAction.listAllQuiz();
}
let entres =[];
function passer(){
    quizz = testAction.getQuiz();
    console.log(quizz);
    let chek = document.querySelector('input[name="choix"]:checked').value;
    entres.push(chek);
    document.getElementById("exer").innerText = quizz[i].exercice; 
    document.getElementById("choix1").innerText = quizz[i].choix1; 
    document.getElementById("huey").value = quizz[i].choix1; 

    document.getElementById("choix2").innerText = quizz[i].choix2; 
    document.getElementById("dewey").value = quizz[i].choix2; 

    document.getElementById("choix3").innerText = quizz[i].choix3; 
    document.getElementById("louie").value = quizz[i].choix3; 

    document.getElementById("choix4").innerText = quizz[i].choix4; 
    document.getElementById("lo").value = quizz[i].choix4; 

    document.getElementsByClassName("qtsbar")[i].style.background ="#826C01";
    i++;
    document.getElementById("numeroto").innerText = i;
    if(i == 9){
         document.getElementById("kama").style.display = "none";
         document.getElementById("affichage").style.display = "block";
         corriger();
         rem();
         //data  = miniser_data();
        // console.log(data);


    }
}


function candidat(){
  
}
function corriger(){
  console.log(entres);
  let count =0;
   for (let index = 0; index < entres.length -1; index++) {
     if(entres[index] == quizz[index].resp){
      count++;
     }
    
   }
   console.log("count = "+count);
   console.log("timer" + document.getElementById('compteur').innerText);
   let res = {
    "id":urlParams.get('idQ'),
    "score":count,
    "dure":document.getElementById('compteur').innerText,
    "emotions":emotion
   }
   console.log(JSON.stringify(res));
   jQuery.ajax({
    url:"http://localhost:8080/project-quiz/test/addresultat" ,
    type: "POST",
    data: JSON.stringify(res),
    dataType: "json",
    beforeSend: function(x) {
      if (x && x.overrideMimeType) {
        x.overrideMimeType("application/j-son;charset=UTF-8");
      }
    },
    success: function(result) {
      }
   }); 
   return count;

}