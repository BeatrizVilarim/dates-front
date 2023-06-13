function changeButtonToRed(color) {
    document.getElementById("button").style.backgroundColor = color;
    document.getElementById("button").style.color = "white";
    document.getElementById("button").value = "Sou um botão "+color;
}//DOM

var countriesList = "";

function applyCountries(){
    getCountries()
    .then(countries => {
        document.querySelector('#lista-paises').innerHTML = countries;
    })
    .catch(error => {
        document.querySelector('#lista-paises').innerHTML = '<li class="list-group-item">Não foi possível carregar os países</li>';
    });
}

function getCountries(){
    return new Promise((resolve, reject) => {
        fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(json => {
            countriesList = '';
            console.log("Nome do primeiro país: "+json[0].name.common)
            for (let i = 0; i < json.length; i++) {
                countriesList += `<li class="list-group-item">${json[i].name.common}</li>`
            }
            console.log("Finalizei as iterações")
            resolve(countriesList);
        })
        .catch(error => {
            reject(error);
        });
    });
}

function getEditais(){
    return new Promise((resolve, reject) => {
        fetch('http://localhost:8000/api/editais')
        .then(response => response.json())
        .then(json => {
            console.log(json.data)
            resolve(json.data)
        })
        .catch(error => {
            reject(error);
        });
    });
}

getEditais();

function applyEditais(){
    let allEditais = "";
    var controlI = 0;
    getEditais()
    .then(editais => {
        editais.forEach(edital => {
            allEditais += `<div class="col-sm-6 mb-3 mb-sm-0 mt-2">
                            <div class="card">
                            <div class="card-body">
                                <img src="../../edital.jpg" class="card-img-top" alt="...">
                                <h5 class="card-title fw-bolder">${edital.nome_edital}</h5>
                                <p class="card-text">
                                - <b>Localidade</b>: ${edital.cidade} - ${edital.estado}<br>
                                - <b>Data de Inscrição</b>: ${edital.data_insc_inicial} até ${edital.data_insc_final}<br>
                                - <b>Segmento:</b> ${edital.segmento}<br>
                                - <b>Objetivo resumido </b>: ${edital.objetivo_curto}
                                </p>
                                <a href="#" class="btn btn-primary">Quero ver este!</a>
                            </div>
                            </div>
                        </div>`
        });
        document.querySelector('#edital-container').innerHTML = allEditais;
    })
    .catch(error => {
        allEditais = '<h1>Não conseguimos listar todos editais</h1>';
        document.querySelector('#edital-container').innerHTML = allEditais;
    })

    console.log(allEditais)
    
}





// function applyCountries(){
//     document.querySelector('#lista-paises').innerHTML = getCountries();
// }

// document.querySelector('#lista-paises').innerHTML = getCountries();
// // setTimeout(() => {
// //     // document.querySelector('#lista-paises').innerHTML = '<li>Brasil</li><li>México</li>'

// // }, 2000);

// function getCountries(){
//     fetch('https://restcountries.com/v3.1/all')
//     .then(response => response.json())
//     .then(json => {
//         let countriesList = '';
//         console.log("Nome do primeiro país: "+json[0].name.common)
//         for (let i = 0; i < json.length; i++) {
//             // console.log("Nome do país: "+json[i].name.common)
//             countriesList += `<li>${json[i].name.common}</li>`
//         }
//         console.log("Finalizei as iterações")
//         apply(countriesList);
//     })
//     .catch(error => {
//         let countriesList = '<li>Não foi possível carregar os países</li>'
//         apply(countriesList);
//     });

//     function apply(values){
//         contriesList = values
//     }

//     return countriesList;
// }
// fetch('https://restcountries.com/v3.1/name/brazil')
// .then(response => response.json())
// .then(json => console.log(json))
// .catch(error => console.log(error))