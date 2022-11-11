class TestAction {
    constructor() {
        this.elements();
        this.ajax = new Ajax();
    }
    searchAuthorsByName() {
        let params = {
        }
        this.ajax.get('http://localhost:8080/project-quiz/test/listusers', params, (response) => {
            let authors = JSON.parse(response.text);
            console.log(authors);
            let s = "";
            for (let a of authors) {
                console.log(a.nom);
                s += '<tr>';
                s += '<td>' + a.date_naissance + '</td>';
                s += '<td>' + a.prenom + '</td>';
                s += '<td>' + a.nom + '</td>';
                s += '<td> <a href=""> <button class="btn btn-default btn-icon btn-simple btn-icon-mini btn-round"> <i class="zmdi zmdi-edit"> </i> </button> </a> </td>';

                s += '</tr>';
            }


            document.getElementById("resultat").innerHTML = s;
        })

    }
    getALLcandidat() {


    }
    listAllTest() {
        let params = {
        }
        this.ajax.get('http://localhost:8080/project-quiz/test/listusers', params, (response) => {
            let candidat = JSON.parse(response.text);
            console.log(candidat);
            let params = {
            }
            console.log(candidat);
            this.ajax.get('http://localhost:8080/project-quiz/test/listTest', params, (response) => {
                let authors = JSON.parse(response.text);
                console.log(authors);
                let s = "";
                for (let a of authors) {
                    console.log(a.nom);
                    s += '<tr>';
                    s += '<td>' + a.sujet + '</td>';
                    s += '<td>' + a.date + '</td>';
                    for (const cn of candidat) {
                        console.log(cn.id + "---" + a.candidat);
                        if (cn.id == a.candidat) {
                            s += '<td>' + cn.date_naissance + '</td>';

                        }
                    }


                    s += '<td><button class="btn btn-default btn-icon btn-simple btn-icon-mini btn-round" onclick="quiz.rapport()"> <i class="zmdi zmdi-edit"> </i> </button> </td>';

                    s += '</tr>';
                }


                document.getElementById("resultatquiz").innerHTML = s;
            })


        })
    }
    listAllQuiz() {
        let params = {
        }
        this.ajax.get('http://localhost:8080/project-quiz/test/listquiz', params, (response) => {
            let quiz = JSON.parse(response.text);
            console.log(quiz);
            document.getElementById("exer").innerText = quiz[0].exercice;
            document.getElementById("choix1").innerText = quiz[0].choix1;
            document.getElementById("choix2").innerText = quiz[0].choix2;
            document.getElementById("choix3").innerText = quiz[0].choix3;
            document.getElementById("choix4").innerText = quiz[0].choix4;
            document.getElementById("huey").value = quiz[0].choix1;

            document.getElementById("dewey").value = quiz[0].choix2;

            document.getElementById("louie").value = quiz[0].choix3;

            document.getElementById("lo").value = quiz[0].choix4;
            document.getElementsByClassName("qtsbar")[0].style.background = "#826C01";


            this.quizAll = quiz;



        });
    }
    candidats() {
        let params = {
        }
        this.ajax.get('http://localhost:8080/project-quiz/test/listusers', params, (response) => {
            let candidats = JSON.parse(response.text);
            console.log(candidats);
            let res = '<select class="form-control" id="idC" name="bc">';
            for (let c of candidats) {
                console.log(c.nom);
                res += "<option value='" + c.id + "'>" + c.nom + " " + c.prenom + "</option>";
            }
            res += "</select>";
            console.log(res);

            document.getElementById("candidats").innerHTML = res;
        });
    }
    addQuiz(nomtest, dtest, idCandidat) {
        let params = {
            sujet: nomtest,
            date: dtest,
            idC: idCandidat
        }
        console.log(params);
        this.ajax.post('http://localhost:8080/project-quiz/test/addQuiz', params, (response) => {
            let candidats = JSON.parse(response.text);
            console.log(candidats);
            if (candidats.length > 0) {
                document.getElementById("dateQuiz").value = "";
                document.getElementById("nom").value = "";
                document.getElementById("idC").value = " ";
                document.getElementById("url").value = "http://127.0.0.1:5502/quiz.html?nomTest=" + nomtest + "&idC=" + idCandidat + "&idQ=" + candidats[0].id;
                document.getElementById("divUrl").style.display = "block";

            }


        });
    }
    addCandidat(nomCandidat, prenom, idC) {
        let params = {
            nom: nomCandidat,
            prenom: prenom,
            idC: idC
        }
        console.log(params);
        this.ajax.post('http://localhost:8080/project-quiz/test/saveuser', params, (response) => {
            let candidats = JSON.parse(response.text);
            console.log(candidats);
            document.getElementById("prenom").value = "";
            document.getElementById("nom").value = "";
            document.getElementById("num").value = "";

        });
    }


    elements() {
        this.name = document.getElementById("name");
        this.result = document.getElementById("res");
    }
    getQuiz() {
        return this.quizAll;
    }
    
    rapport() {
        let params = {
        }
        let dataSet ;
        this.ajax.get('http://localhost:8080/project-quiz/test/sendRes', params, (response) => {
            console.log(JSON.parse(response.text));
            dataSet = JSON.parse(response.text);
            this.dataRes = JSON.parse(response.text);
            console.log(dataSet.content);
             var d = JSON.parse(response.text).duree;
             d = d.split(":");

            var labels = [];
            
            for(let i =0;i<d[1];i++){
                labels.push(i);
            }
            const ctx = document.getElementById("myChart").getContext("2d");

            new Chart(ctx, {
                type: "line",
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Neutre',
                        data: JSON.parse(dataSet.neutre),
                        fill: false,
                        borderColor: 'rgb(0, 0, 255)',
                        tension: 0.1
                    },
                    {
                        label: 'Content',
                        data:JSON.parse(dataSet.content),
                        fill: false,
                        borderColor: 'rgb(50, 205, 50)',
                        tension: 0.1
                    },
                    {
                        label: 'Enerve',
                        data:JSON.parse(dataSet.enerve),
                        fill: false,
                        borderColor: 'rgb(255, 0, 0)',
                        tension: 0.1
                    },
                    {
                        label: 'Surpris',
                        data: JSON.parse(dataSet.surpris),
                        fill: false,
                        borderColor: 'rgb(255, 0, 255)',
                        tension: 0.1
                    }
                    ]
                }
            });

          let count = 0;
            var downloadChartJs = (data) => {

             if(count ==0){

             
                html2canvas(document.getElementById("chart-container"), {
                    onrendered: function (canvas) {
                        var img = canvas.toDataURL(); //image data of canvas
                        let date1 = new Date();

                        let dateLocale = date1.toLocaleString('fr-FR', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            second: 'numeric'
                        });
                        var img1 = new Image();
                        img1.src = 'logo.png';
                        
                        var doc = new jsPDF();
                        doc.addImage(img, -50, 25);
                        doc.setFontSize(10);
                        doc.text(115, 12, "Rapport de la session");
                        doc.text(5, 12, "Date :" + dateLocale);
                        console.log(this.dataRes)
                        doc.text(5, 110, "Score : " + data.score + "/9");
                        doc.text(5, 130, "Dureé : " + data.duree + " s");
                        //doc.addImage(img1, 'png', 240, 0, 60, 20);
                        doc.save('Rapport.pdf');
                    }
                });
                count++;
            }
            }
            

           
            
          setInterval(()=>{downloadChartJs(this.dataRes)},1000);
        });
    }


}
