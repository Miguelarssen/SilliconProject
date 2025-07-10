CREATE TABLE Pessoas (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    nome NVARCHAR(255) NOT NULL,
    cpf NVARCHAR(14) NOT NULL UNIQUE,
    nascimento DATE
);
GO

CREATE TABLE Contas (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    pessoa_id BIGINT NOT NULL,
    saldo DECIMAL(18, 2) NOT NULL,
    limiteSaqueDiario DECIMAL(18, 2) NOT NULL,
    tipoConta INT NOT NULL,
    dataCriacao DATE NOT NULL,
    ativo BIT NOT NULL,
    FOREIGN KEY (pessoa_id) REFERENCES Pessoas(id)
);
GO

CREATE TABLE Transacoes (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    conta_id BIGINT NOT NULL,
    valor DECIMAL(18, 2) NOT NULL,
    dataTransacao DATE NOT NULL,
    FOREIGN KEY (conta_id) REFERENCES Contas(id)
);
GO