const URL_REGIOES = 'https://servicodados.ibge.gov.br/api/v1/localidades/regioes';

const SELECT_REGIAO = document.getElementById('regiao');
const SELECT_ESTADO = document.getElementById('estado');
const SELECT_CIDADE = document.getElementById('cidade');

const LOADING = document.getElementById('loading');


fetch (URL_REGIOES)
    .then(resposta => resposta.json())
    .then(regioes => {
        regioes.map((cadaRegiao) => {
            SELECT_REGIAO.innerHTML += `
                <option value="${cadaRegiao.id}">${cadaRegiao.nome}</option>
            `;
        })
    });

//buscar os estados quando selecionar a regiao
SELECT_REGIAO.addEventListener('change', () => {
    let regiaoId = SELECT_REGIAO.value;

    let url = `https://servicodados.ibge.gov.br/api/v1/localidades/regioes/${regiaoId}/estados`;

    //limpar o select de estado
    SELECT_ESTADO.innerHTML = '<option selected disabled> --Selecione-- </option>';

    fetch (url)
        .then(resposta => resposta.json())
        .then(estados => {
            estados.map(cadaEstado => {
                SELECT_ESTADO.innerHTML += `
                    <option value="${cadaEstado.id}">
                         ${cadaEstado.nome}
                     </option>                    
                `;                  
            })
        });
});

SELECT_ESTADO.addEventListener('change', () => {
    let estadoId = SELECT_ESTADO.value;

    let url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios`;

    SELECT_CIDADE.innerHTML = '<option selected disabled> --Selecione-- </option>';


    //inicia o lading
    LOADING.style.display = 'block';

    fetch (url)
        .then(resposta => resposta.json())
        .then(municipios => {
            municipios.map(cadaCidade => {
                SELECT_CIDADE.innerHTML += `
                    <option>
                        ${cadaCidade.nome}
                    </option> 
                 `;
        })

        //esconde o loading
        LOADING.style.display = 'none';
    });
});

