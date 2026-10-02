const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'database.json');

app.use(cors());
app.use(express.json());

// Helper functions to read/write JSON file acting as local persistence
function readData() {
    if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, JSON.stringify([]));
    }
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}

function writeData(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// GET all employees
app.get('/api/funcionarios', (req, res) => {
    const data = readData();
    res.json(data);
});

// GET single employee
app.get('/api/funcionarios/:id', (req, res) => {
    const data = readData();
    const employee = data.find(e => e.id === parseInt(req.params.id));
    if (!employee) return res.status(404).send('Funcionário não encontrado.');
    res.json(employee);
});

// POST single employee
app.post('/api/funcionarios', (req, res) => {
    const data = readData();
    const newEmployee = {
        id: data.length > 0 ? Math.max(...data.map(e => e.id)) + 1 : 1,
        nome: req.body.nome,
        funcao: req.body.funcao,
        salario: req.body.salario
    };
    data.push(newEmployee);
    writeData(data);
    res.status(201).json(newEmployee);
});

// PUT (Update) single employee
app.put('/api/funcionarios/:id', (req, res) => {
    const data = readData();
    const index = data.findIndex(e => e.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Funcionário não encontrado.');

    data[index] = {
        id: parseInt(req.params.id),
        nome: req.body.nome,
        funcao: req.body.funcao,
        salario: req.body.salario
    };
    writeData(data);
    res.json(data[index]);
});

// DELETE single employee
app.delete('/api/funcionarios/:id', (req, res) => {
    const data = readData();
    const filteredData = data.filter(e => e.id !== parseInt(req.params.id));
    if (data.length === filteredData.length) return res.status(404).send('Funcionário não encontrado.');
    
    writeData(filteredData);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso na porta ${PORT}`);
});
