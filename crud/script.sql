-- Script SQL para criação da base de dados e tabela de funcionários

CREATE DATABASE IF NOT EXISTS sistema_funcionarios;
USE sistema_funcionarios;

CREATE TABLE IF NOT EXISTS funcionarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    funcao VARCHAR(100) NOT NULL,
    salario DECIMAL(10, 2) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserção de dados iniciais para teste
INSERT INTO funcionarios (nome, funcao, salario) VALUES 
('Julia', 'Desenvolvedora Frontend', 5500.00);
