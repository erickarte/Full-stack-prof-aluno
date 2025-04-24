document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://localhost:3000/api'; // Atualize para o URL correto da sua API
    const alunoModal = document.getElementById('alunoModal');
    const alunoForm = document.getElementById('alunoForm');
    const addAlunoBtn = document.getElementById('addAlunoBtn');
    const modalTitleAluno = document.getElementById('modalTitleAluno');
    let editAlunoId = null;

    // Função para carregar alunos
    const loadAlunos = async () => {
        const response = await fetch(`${apiUrl}/alunos`);
        const alunos = await response.json();
        const tableBody = document.querySelector('#alunosTable tbody');
        tableBody.innerHTML = '';

        alunos.forEach(aluno => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${aluno.name}</td>
                <td>${aluno.situation}</td>
                <td>${aluno.responsible ? aluno.responsible.name : 'N/A'}</td>
                <td>
                    <button class="editalunoBtn" data-id="${aluno._id}">Editar</button>
                    <button class="deletealunoBtn" data-id="${aluno._id}">Deletar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        // Adicionar eventos de edição e deleção
        document.querySelectorAll('.editalunoBtn').forEach(button => {
            button.addEventListener('click', (e) => openEditalunoModal(e.target.dataset.id));
        });

        document.querySelectorAll('.deletealunoBtn').forEach(button => {
            button.addEventListener('click', (e) => deletealuno(e.target.dataset.id));
        });
    };

    // Função para adicionar aluno
    const addAluno = async (aluno) => {
        await fetch(`${apiUrl}/alunos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(aluno)
        });
        loadAlunos();
    };

    // Função para atualizar aluno
    const updateAluno = async (id, aluno) => {
        await fetch(`${apiUrl}/alunos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(aluno)
        });
        loadAlunos();
    };

    // Função para deletar aluno
    const deleteAlunos = async (id) => {
        await fetch(`${apiUrl}/alunos/${id}`, {
            method: 'DELETE'
        });
        loadAlunos();
    };

    // Abrir modal para editar  aluno
    const openEditAlunoModal = async (id) => {
        editAlunoId = id;
        modalTitleAluno.innerText = 'Editar Aluno';

        // Buscar os dados da aluno para preencher o modal
        const response = await fetch(`${apiUrl}/alunos/${id}`);
        if (response.status === 404) {
            console.error('Aluno não encontrado');
            return;
        }
        const aluno = await response.json();

        document.getElementById('nameAluno').value = aluno.name;
        document.getElementById('situation').value = aluno.situation;
        await loadUsers(aluno.responsible ? aluno.responsible._id : null);

        alunoModal.style.display = 'block';
    };

    // Abrir modal para adicionar novo aluno
    const openAddAlunoModal = async () => {
        editAlunoId = null;
        modalTitleAluno.innerText = 'Adicionar Aluno';
        alunoForm.reset();
        await loadProfs(); // Carrega os professores sem pré-selecionar nenhum
        alunoModal.style.display = 'block';
    };

    // Carregar professores para o select de responsável
    const loadProfs = async (selectedProfId = null) => {
        const response = await fetch(`${apiUrl}/profs`);
        const profs = await response.json();
        const select = document.getElementById('responsible');
        select.innerHTML = ''; // Limpa o select

        profs.forEach(prof => {
            const option = document.createElement('option');
            option.value = prof._id;
            option.text = prof.name;
            if (prof._id === selectedProfId) {
                option.selected = true;
            }
            select.appendChild(option);
        });
    };

    // Fechar modal ao clicar no "x"
    document.querySelector('.close').addEventListener('click', () => {
        alunoModal.style.display = 'none';
    });

    // Fechar modal ao clicar fora dele
    window.addEventListener('click', (event) => {
        if (event.target === alunoModal) {
            alunoModal.style.display = 'none';
        }
    });

    // Submissão do formulário
    alunoForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const alunoData = {
            name: document.getElementById('nameAluno').value,
            description: document.getElementById('situation').value,
            responsible: document.getElementById('responsible').value
        };

        if (editAlunoId) {
            await updateAluno(editP/AlunoId, AlunoData);
        } else {
            await addAluno(alunoData);
        }

        alunoModal.style.display = 'none';
        loadAlunos();
    });

    // Inicializando o carregamento de alunos e eventos
    addAlunoBtn.addEventListener('click', openAddAlunoModal);
    loadAlunos();
});
