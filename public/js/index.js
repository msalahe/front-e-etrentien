

let quiz;
function main(){
    quiz = new TestAction();
    quiz.candidats();
    
}
main();
function addQuiz(){
    let date = document.getElementById("dateQuiz").value;
    let nom = document.getElementById("nom").value;
    let IdC = document.getElementById("idC").value;
    quiz.addQuiz(nom,date,IdC);
   

}

function addCandidats(){
    let prenom = document.getElementById("prenom").value;
    let nom = document.getElementById("nom").value;
    let num = document.getElementById("num").value;

    quiz.addCandidat(nom,prenom,num);
   

}