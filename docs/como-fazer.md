# **Guia Passo a Passo: Construindo uma Tabela Paginada com Bootstrap e FetchAPI**

Este guia irá ajudá-lo a criar uma tabela paginada dinâmica utilizando HTML, Bootstrap, e JavaScript para consumir dados de uma API (neste caso, utilizaremos a ReqRes). O guia é dividido em várias seções, cada uma focada em um aspecto específico do desenvolvimento.

### 1. Preparação do Ambiente

Antes de começar, certifique-se de ter um ambiente de desenvolvimento básico configurado. Você precisará de:

- Um editor de código (por exemplo, Visual Studio Code, Sublime Text, etc.).
- Navegador web (Google Chrome, Firefox, etc.).
- Conexão com a internet para acessar bibliotecas externas.

### 2. Estrutura do Projeto

Crie um diretório para o projeto e organize-o da seguinte maneira:

```
project-directory/
|-- index.html
|-- index.js
|-- styles.css (opcional)
```

### 3. Configuração do HTML

Abra o arquivo `index.html` e configure a estrutura básica do HTML. Adicione os links para a biblioteca Bootstrap e os scripts JavaScript necessários.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Adicione os meta tags e o título conforme necessário -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/css/bootstrap.min.css"
          integrity="sha384-r4NyP46KrjDleawBgD5tp8Y7UzmLA05oM1iAEQ17CSuDqnUK2+k9luXQOfXJCJ4I"
          crossorigin="anonymous"/>
    <!-- Adicione os scripts do Popper.js e do Bootstrap -->
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/js/bootstrap.min.js"></script>
    <script src="./index.js"></script>
</head>
<body>
    <!-- Seção do corpo do documento -->
</body>
</html>
```

### 4. Estrutura da Página e Estilos

Dentro da seção do corpo do documento, adicione a estrutura da página, incluindo uma tabela e um indicador de carregamento. Você pode estilizar a página adicionando um arquivo CSS externo (opcional).

```html
<div class="container">
    <div class="row-12">
        <div class="col">
            <h1>Dados obtidos da API reqres.in</h1>
            <div class="table">
                <div class="tb">
                    <table class="table table-striped table-hover" id="dataTable">
                        <thead>
                            <!-- Cabeçalho da tabela -->
                        </thead>
                        <tbody id="tableBody">
                            <!-- Corpo da tabela - Dados da API serão inseridos aqui dinamicamente -->
                        </tbody>
                    </table>
                    <nav aria-label="Page navigation">
                        <ul class="pagination" id="pagination"></ul>
                    </nav>
                    <div id="loadingIndicator" class="text-center mt-3">
                        <!-- Indicador de carregamento -->
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
```

### 5. JavaScript para Consumir a API

Abra o arquivo `index.js` e comece adicionando o código JavaScript para consumir a API e exibir os dados na tabela.

```javascript
// index.js

const tableBody = document.getElementById('tableBody');
const pagination = document.getElementById('pagination');
const loadingIndicator = document.getElementById('loadingIndicator');
const perPage = 6; // Número de itens por página
let currentPage = 1;

function showLoadingIndicator() {
    loadingIndicator.style.display = 'block';
}

function hideLoadingIndicator() {
    loadingIndicator.style.display = 'none';
}

function fetchData(page) {
    showLoadingIndicator();

    const url = `https://reqres.in/api/users?page=${page}&per_page=${perPage}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            hideLoadingIndicator();

            // Limpa a tabela e adiciona os novos dados
            tableBody.innerHTML = '';
            data.data.forEach(user => {
                const tableBodyRow = document.createElement('tr');
                // Adicione as células da tabela aqui conforme necessário
                tableBody.appendChild(tableBodyRow);
            });

            // Adiciona a paginação
            addPagination(data.total_pages);
        })
        .catch(error => {
            hideLoadingIndicator();
            console.error(error);
        });
}

function addPagination(totalPages) {
    pagination.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        li.classList.add('page-item');
        const a = document.createElement('a');
        a.classList.add('page-link');
        a.href = '#';
        a.textContent = i;
        a.addEventListener('click', () => {
            currentPage = i;
            fetchData(currentPage);
        });

        li.appendChild(a);
        pagination.appendChild(li);
    }
}

// Inicializa com a primeira página
fetchData(currentPage);
```

### 6. Testando a Aplicação

Abra o arquivo `index.html` em um navegador web. Você deve ver a tabela sendo preenchida com dados da API ReqRes, e o indicador de carregamento aparecerá durante o carregamento das páginas.

Esse guia fornece uma base para criar uma tabela paginada dinâmica com Bootstrap e FetchAPI. Você pode expandir e personalizar conforme necessário para atender às suas necessidades específicas. Certifique-se de entender os conceitos apresentados e experimente realizar ajustes de acordo com seu projeto.


## **Referências e Recursos**

### Ferramentas Utilizadas:

1. [Visual Studio Code](https://code.visualstudio.com/) - Um editor de código-fonte leve e poderoso.
2. [Google Chrome](https://www.google.com/chrome/) - Um navegador web rápido e seguro.

### Tutoriais e Documentação FetchAPI:

1. [Fetch API e o JavaScript](https://www.braziljs.org/p/fetch-api-e-o-javascript) - Artigo no BrazilJS explicando o uso da Fetch API em JavaScript.
2. [Fetch API: Como fazer solicitações GET e POST em JavaScript](https://www.freecodecamp.org/portuguese/news/fetch-api-como-fazer-solicitacoes-get-e-post-em-javascript/) - Tutorial abrangente no FreeCodeCamp sobre como fazer solicitações GET e POST usando Fetch API.
3. [W3Schools - Fetch API](https://www.w3schools.com/jsref/api_fetch.asp) - Página de referência no W3Schools para a Fetch API com exemplos práticos.
4. [MDN Web Docs - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) - Documentação oficial da Fetch API no MDN Web Docs (em inglês).
5. [MDN Web Docs - Usando Fetch](https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API/Using_Fetch) - Página específica sobre o uso da Fetch API no MDN Web Docs (em português).
6. [MDN Web Docs - fetch()](https://developer.mozilla.org/en-US/docs/Web/API/fetch) - Documentação detalhada sobre o método `fetch()` no MDN Web Docs (em inglês).
7. [DevMedia - JavaScript Fetch](https://www.devmedia.com.br/javascript-fetch/41206) - Artigo na DevMedia abordando o uso do Fetch em JavaScript (em português).

Estes recursos devem fornecer uma compreensão abrangente da Fetch API e ajudarão na construção da tabela paginada dinâmica com Bootstrap e JavaScript. Certifique-se de consultar essas referências ao longo do desenvolvimento para obter insights adicionais e resolver dúvidas específicas.
