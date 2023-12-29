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
                const tableBodyRowDataName = document.createElement('td');
                tableBodyRowDataName.textContent = user.first_name;
                const tableBodyRowDataSurname = document.createElement('td');
                tableBodyRowDataSurname.textContent = user.last_name;
                const tableBodyRowDataEmail = document.createElement('td');
                tableBodyRowDataEmail.textContent = user.email;
                const tableBodyRowDataAvatar = document.createElement('td');
                const avatarImg = document.createElement('img');
                avatarImg.src = user.avatar;
                avatarImg.alt = 'Avatar';
                tableBodyRowDataAvatar.appendChild(avatarImg);

                tableBodyRow.appendChild(tableBodyRowDataName);
                tableBodyRow.appendChild(tableBodyRowDataSurname);
                tableBodyRow.appendChild(tableBodyRowDataEmail);
                tableBodyRow.appendChild(tableBodyRowDataAvatar);
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
