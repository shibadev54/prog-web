const API_URL = 'http://localhost:3000/api/funcionarios';

const modal = document.getElementById('employee-modal');
const btnIncluir = document.getElementById('btn-incluir');
const btnCancelar = document.getElementById('btn-cancel');
const employeeForm = document.getElementById('employee-form');
const tableBody = document.getElementById('employee-table-body');

// Form fields
const idInput = document.getElementById('employee-id');
const nameInput = document.getElementById('employee-name');
const roleInput = document.getElementById('employee-role');
const salaryInput = document.getElementById('employee-salary');

// Load employees on startup
document.addEventListener('DOMContentLoaded', fetchEmployees);

// Event Listeners
btnIncluir.addEventListener('click', () => {
    clearForm();
    openModal();
});

btnCancelar.addEventListener('click', closeModal);

employeeForm.addEventListener('submit', handleFormSubmit);

function openModal() {
    modal.classList.add('show');
}

function closeModal() {
    modal.classList.remove('show');
}

function clearForm() {
    idInput.value = '';
    nameInput.value = '';
    roleInput.value = '';
    salaryInput.value = '';
}

async function fetchEmployees() {
    try {
        const response = await fetch(API_URL);
        const employees = await response.json();
        renderTable(employees);
    } catch (error) {
        console.error('Erro ao buscar funcionários:', error);
    }
}

function renderTable(employees) {
    tableBody.innerHTML = '';
    
    if (employees.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: #adb5bd;">Nenhum funcionário cadastrado.</td></tr>`;
        return;
    }

    employees.forEach(emp => {
        const tr = document.createElement('tr');
        
        // Format salary into Brazilian Real style
        const formattedSalary = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(emp.salario);

        tr.innerHTML = `
            <td>${emp.nome}</td>
            <td>${emp.funcao}</td>
            <td>${formattedSalary}</td>
            <td class="text-center">
                <i class="fa-regular fa-pen-to-square action-icon edit-icon" onclick="editEmployee(${emp.id})"></i>
            </td>
            <td class="text-center">
                <i class="fa-regular fa-trash-can action-icon delete-icon" onclick="deleteEmployee(${emp.id})"></i>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

async function handleFormSubmit(e) {
    e.preventDefault();
    
    const id = idInput.value;
    const employeeData = {
        nome: nameInput.value,
        funcao: roleInput.value,
        salario: parseFloat(salaryInput.value)
    };

    try {
        if (id) {
            // Update mode
            await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(employeeData)
            });
        } else {
            // Creation mode
            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(employeeData)
            });
        }
        closeModal();
        fetchEmployees();
    } catch (error) {
        console.error('Erro ao salvar funcionário:', error);
    }
}

async function editEmployee(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        const emp = await response.json();
        
        idInput.value = emp.id;
        nameInput.value = emp.nome;
        roleInput.value = emp.funcao;
        salaryInput.value = emp.salario;
        
        openModal();
    } catch (error) {
        console.error('Erro ao buscar dados do funcionário:', error);
    }
}

async function deleteEmployee(id) {
    if (confirm('Tem certeza que deseja excluir este funcionário?')) {
        try {
            await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            fetchEmployees();
        } catch (error) {
            console.error('Erro ao deletar funcionário:', error);
        }
    }
}
