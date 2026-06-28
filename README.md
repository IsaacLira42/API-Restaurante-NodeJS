# 🍽️ API de Restaurante

API RESTful para gerenciar um restaurante, desenvolvida em Node.js com TypeScript, Prisma e PostgreSQL, estruturada em Arquitetura Limpa/Modular e pronta para execução em containers com Docker.

---

## 🛠️ Tecnologias Utilizadas

[![My Skills](https://skillicons.dev/icons?i=nodejs,express,prisma,ts,postgresql,docker&theme=dark&perline=6)](https://skillicons.dev)

- **Node.js + TypeScript** (Express 5)
- **Prisma ORM** (PostgreSQL)
- **Docker & Docker Compose** (Multi-stage build)
- **Zod** (Validação de schemas e sanitização de dados)
- **Swagger UI** (Documentação interativa)
- **Vitest** (Testes automatizados)

---

## 🏗️ Arquitetura e Boas Práticas

A aplicação segue uma **Arquitetura Limpa / Modular em Camadas**, garantindo separação clara de responsabilidades, baixo acoplamento e alta testabilidade:

```
src/
├── controllers/          # Recebe requisições HTTP, valida entradas (Zod) e retorna respostas.
├── services/             # Contém todas as regras de negócio e lança erros de domínio (AppError).
├── repositories/         # Camada de acesso a dados (Data Access Layer), encapsulando a API do Prisma.
├── routes/               # Definição dos endpoints da API Express.
├── middlewares/          # Tratamento global de erros (AppError e ZodError).
└── utils/                # Funções utilitárias e classes de erro customizadas.
```

---

## 🚀 Como Rodar o Projeto com Docker (Recomendado)

Todo o ambiente de desenvolvimento e produção (API + PostgreSQL + Migrations) pode ser executado com apenas **um comando**:

### 1. Pré-requisitos
- Docker e Docker Compose instalados.

### 2. Executando a Aplicação
No diretório raiz do projeto, execute:

```bash
docker-compose up --build
```

> 💡 **O que acontece automaticamente:**
> 1. O banco de dados PostgreSQL é inicializado e configurado com persistência via volume.
> 2. O container da API aguarda o banco de dados estar 100% pronto (via `healthcheck`).
> 3. O script de entrypoint executa automaticamente as migrations do Prisma (`prisma migrate deploy`).
> 4. A API é iniciada na porta `3333`.

### 3. Acessando a Documentação
Após subir os containers, acesse a documentação Swagger em:
👉 **[http://localhost:3333/api-docs](http://localhost:3333/api-docs)**

---

## 💻 Execução Local Sem Docker (Desenvolvimento Manual)

Se preferir rodar localmente sem Docker:

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Configure o arquivo de ambiente:**
   Crie um arquivo `.env` baseado no `.env.example` e ajuste a URL de conexão com seu PostgreSQL local:
   ```env
   PORT=3333
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/restaurante_db?schema=public"
   ```

3. **Gere o cliente e rode as migrations:**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

4. **(Opcional) Popule o banco de dados (Seed):**
   ```bash
   npx prisma db seed
   ```

5. **Inicie o servidor:**
   ```bash
   npm run dev
   ```

---

## 📜 Scripts Disponíveis

- `npm run dev`: Inicia o servidor em modo de desenvolvimento com hot-reload.
- `npm run build`: Compila o código TypeScript para JavaScript na pasta `dist`.
- `npm start`: Executa o código compilado em modo de produção.
- `npm test`: Executa a suíte de testes automatizados com Vitest.
- `npm run lint`: Analisa o código com ESLint.
- `npm run format`: Formata o código com Prettier.

---

## 📈 Sugestões de Melhorias Futuras

- **Observabilidade**: Adição de logger estruturado (Pino / Winston) e métricas via OpenTelemetry.
- **CI/CD Pipeline**: Automação de testes e build de imagens Docker via GitHub Actions.
- **Resiliência e Cache**: Implementação de cache com Redis em consultas frequentes (como cardápio de produtos).

---

## 👨‍💻 Autor

**Isaac Lira**
- **LinkedIn:** [https://www.linkedin.com/in/isaaclira42](https://www.linkedin.com/in/isaaclira42)
- **GitHub:** [https://github.com/IsaacLira42](https://github.com/IsaacLira42)