# Passo a Passo Detalhado com Resultados Esperados: Construindo uma Tabela Paginada com Bootstrap e FetchAPI

Este guia detalhado fornece instruções específicas e códigos associados a cada passo do processo de construção de uma tabela paginada usando HTML, Bootstrap e JavaScript (FetchAPI). Os resultados esperados são descritos em cada etapa.

### Passo 1: Configuração do Ambiente de Desenvolvimento

1. **Criar o Diretório do Projeto:**
   ```bash
   mkdir FetchAPI-Make
   ```

2. **Abrir o Visual Studio Code:**
   ```bash
   cd FetchAPI-Make
   code .
   ```

3. **Conexão com a Internet:**
   - Garanta que você tenha uma conexão com a internet para baixar bibliotecas externas.

**Resultado Esperado:**
- Diretório do projeto criado.
- Visual Studio Code aberto no projeto.
- Conexão com a internet estabelecida.

### Passo 2: Estrutura do Projeto

1. **Criar Arquivos:**
   ```bash
   touch index.html index.js styles.css
   ```

**Resultado Esperado:**
- Arquivos `index.html`, `index.js`, e opcionalmente `styles.css` criados.

### Passo 3: Configuração do HTML

1. **Adicionar Estrutura Básica do HTML (index.html):**
   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Tabela Paginada</title>
       <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/css/bootstrap.min.css"
             integrity="sha384-r4NyP46KrjDleawBgD5tp8Y7UzmLA05oM1iAEQ17CSuDqnUK2+k9luXQOfXJCJ4I"
             crossorigin="anonymous"/>
       <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
       <script src="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/js/bootstrap.min.js"></script>
   </head>
   <body>
       <!-- Conteúdo da Página Aqui -->
   </body>
   </html>
   ```

2. **Adicionar Estrutura da Página:**
   ```html
   <div class="container">
       <div class="row-12">
           <div class="col">
               <h1>Dados obtidos da API ReqRes</h1>
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

### Passo 4: Estilização (Opcional)

- Personalize o arquivo `styles.css` conforme necessário para estilizar a página.

### Passo 5: JavaScript para Consumir a API

1. **Adicionar Código JavaScript (index.js):**
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

### Passo 6: Testando a Aplicação

1. **Abrir no Navegador:**
   - Abra o arquivo `index.html` em um navegador web (Google Chrome, por exemplo).

2. **Verificar a Tabela Preenchida:**
   - Verifique se a tabela é preenchida com dados da API ReqRes.

3. **Confirmação do Indicador de Carregamento:**
   - Confirme se o indicador de carregamento aparece durante o carregamento das páginas.

### Passo 7: Adicionando Documentação e Screenshots

1. **Atualizar README.md:**
   - Adicione informações sobre a estrutura do projeto, pré-requisitos e referências.
   - Inclua screenshots relevantes para melhor compreensão.

### Passo 8: Personalização e Expansão

1. **Personalização do Projeto:**
   - Experimente personalizar o projeto conforme suas necessidades.

2. **Exploração da FetchAPI:**
   - Explore outras funcionalidades da FetchAPI para aprimorar a interação com a API.

### Resultados Esperados Gerais:

Ao concluir todos os passos, espera-se ter uma aplicação funcional que exibe uma tabela paginada com dados obtidos dinamicamente da API ReqRes. A tabela deve oferecer uma interface

 de usuário amigável, incluindo estilos aplicados com o auxílio da biblioteca Bootstrap.

Este guia fornece uma visão detalhada, facilitando o entendimento e a implementação prática do projeto em um ambiente de aula.
