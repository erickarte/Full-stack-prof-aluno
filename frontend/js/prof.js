document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://localhost:3000/api'; // Atualize para sua API
    const profModal = document.getElementById('profModal');
    const profForm = document.getElementById('profForm');
    const addProfBtn = document.getElementById('addProfBtn');
    const modalTitle = document.getElementById('modalTitle');
    let editProfId = null;

    // Função para carregar professores
    const loadProfs = async () => {
        const response = await fetch(`${apiUrl}/profs`);
        const profs = await response.json();
        const tableBody = document.querySelector('#profsTable tbody');
        tableBody.innerHTML = '';

        profs.forEach(prof => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${prof.name}</td>
                <td>${prof.profile}</td>
                <td>
                    <button class="editProfBtn" data-id="${prof._id}">Editar</button>
                    <button class="deleteProfBtn" data-id="${prof._id}">Deletar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        // Adicionar eventos de edição e deleção
        document.querySelectorAll('.editProfBtn').forEach(button => {
            button.addEventListener('click', (e) => openEditProfModal(e.target.dataset.id));
        });

        document.querySelectorAll('.deleteProfBtn').forEach(button => {
            button.addEventListener('click', (e) => deleteProf(e.target.dataset.id));
        });
    };

    // Função para adicionar professor
    const addProf = async (prof) => {
        await fetch(`${apiUrl}/profs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(prof)
        });
        loadProfs();
    };

    // Função para atualizar professor
    const updateProf = async (id, prof) => {
        await fetch(`${apiUrl}/profs/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(prof)
        });
        loadProfs();
    };

    // Função para deletar professor
    const deleteProf = async (id) => {
        await fetch(`${apiUrl}/profs/${id}`, {
            method: 'DELETE'
        });
        loadProfs();
    };

    // Abrir modal para editar professor
    const openEditProfModal = async (id) => {
        editProfId = id;
        modalTitle.innerText = 'Editar Professor';

        // Buscar os dados do professor para preencher o modal
        const response = await fetch(`${apiUrl}/profs/${id}`);
        const prof = await response.json();

        document.getElementById('name').value = prof.name;
        document.getElementById('profile').value = prof.profile;
        document.getElementById('password').value = ''; // Não exibir senha

        profModal.style.display = 'block';
    };

    // Abrir modal para adicionar novo professor
    const openAddProfModal = () => {
        editProfId = null;
        modalTitle.innerText = 'Adicionar Professor';
        profForm.reset();
        profModal.style.display = 'block';
    };

    // Fechar modal ao clicar no "x"
    document.querySelector('.close').addEventListener('click', () => {
        profModal.style.display = 'none';
    });

    // Fechar modal ao clicar fora dele
    window.addEventListener('click', (event) => {
        if (event.target === profModal) {
            profModal.style.display = 'none';
        }
    });

    // Submissão do formulário
    profForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const profData = {
            name: document.getElementById('name').value,
            profile: document.getElementById('profile').value,
            password: document.getElementById('password').value
        };

        if (editProfId) {
            await updateProf(editProfId, profData);
        } else {
            await addProf(profData);
        }

        profModal.style.display = 'none';
        loadProfs();
    });

    // Inicializando o carregamento de professores e eventos
    addProfBtn.addEventListener('click', openAddProfModal);
    loadProfs();
});
