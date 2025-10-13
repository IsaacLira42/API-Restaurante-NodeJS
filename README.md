# 🍽️ API de Restaurante

API RESTful para gerenciar um restaurante, desenvolvida em Node.js com TypeScript e Prisma. Este sistema permite o controle de produtos, mesas, sessões de atendimento e pedidos.

---

## 🛠️ Tecnologias utilizadas

[![My Skills](https://skillicons.dev/icons?i=nodejs,express,prisma,ts,postgresql&theme=dark&perline=5)](https://skillicons.dev)

---

## ✨ Features

-   **Documentação Interativa**: API 100% documentada com Swagger, permitindo testar todos os endpoints pelo navegador.
-   **Gestão de Produtos**: CRUD completo para os produtos do cardápio.
-   **Gestão de Mesas**: CRUD completo para as mesas do restaurante.
-   **Controle de Sessões**: Abertura e fechamento de sessões de atendimento por mesa.
-   **Registro de Pedidos**: Criação de pedidos vinculados a uma sessão ativa.
-   **Banco de Dados Populado**: Script de seed para popular o banco com dados de exemplo, facilitando os testes.

---

## 🚀 Rodando o Projeto

Siga os passos abaixo para executar o projeto localmente.

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/IsaacLira42/API-Restaurante-NodeJS.git
    cd API-Restaurante-NodeJS/
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure o banco de dados:**
    -   Renomeie o arquivo `.env.example` para `.env`.
    -   Preencha a variável `DATABASE_URL` com a URL de conexão do seu banco de dados PostgreSQL.
        ```
        # Exemplo de .env
        PORT=3333
        DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DATABASE"
        ```

4.  **Aplique as migrações do banco de dados:**
    ```bash
    npx prisma migrate dev
    ```

5.  **Popule o banco com dados de exemplo (Seed):**
    ```bash
    npx prisma db seed
    ```

6.  **Inicie o servidor:**
    ```bash
    npm run dev
    ```

O servidor estará disponível em `http://localhost:3333`.

---

## 📜 Documentação da API e Testes

A forma mais fácil de explorar e testar a API é através da nossa documentação interativa com Swagger.

**Após iniciar o servidor, acesse:**

### 👉 [http://localhost:3333/api-docs](http://localhost:3333/api-docs)

Lá você encontrará todos os endpoints listados, com seus parâmetros, e poderá executá-los diretamente pelo navegador.

---

## 📦 Scripts Disponíveis

-   `dev`: Inicia o servidor em modo de desenvolvimento com hot-reload.
-   `build`: Compila o código TypeScript para JavaScript.
-   `start`: Inicia o servidor em modo de produção.
-   `test`: Executa os testes automatizados com Vitest.
-   `lint`: Analisa o código em busca de erros e problemas de estilo.
-   `format`: Formata o código utilizando o Prettier.
-   `swagger-autogen`: Gera (ou atualiza) o arquivo de documentação `swagger-output.json`.

---

## 👨‍💻 Autor

**Isaac Lira**

-   **LinkedIn:** [https://www.linkedin.com/in/isaaclira42](https://www.linkedin.com/in/isaaclira42)
-   **GitHub:** [https://github.com/IsaacLira42](https://github.com/IsaacLira42)