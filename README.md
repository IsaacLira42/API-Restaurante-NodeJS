# 🍽️ API de Restaurante

API RESTful para gerenciar um restaurante, desenvolvida em Node.js com TypeScript e Prisma. Este sistema permite o controle de produtos, mesas, sessões de atendimento e pedidos.

---

## 🛠️ Tecnologias utilizadas

<div style="display: flex; justify-content: center; gap: 20px; align-items: center;">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" width="48" height="48" />
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" width="48" height="48" />
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg" width="48" height="48" />
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" width="48" height="48" />
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" width="48" height="48" />
</div>

---

## ⚙️ Funcionalidades

-   Gestão de Produtos (CRUD completo)
-   Gestão de Mesas (CRUD completo)
-   Controle de Sessões de Atendimento (abertura e fechamento)
-   Registro de Pedidos por sessão
-   Listagem de pedidos por mesa

---

## 📦 Como rodar o projeto localmente

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
        PORT=3000

        DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DATABASE"
        ```

4.  **Aplique as migrações do banco de dados:**
    ```bash
    npx prisma migrate dev
    ```

5.  **Execute o servidor:**
    ```bash
    npm run dev
    ```
    O servidor estará disponível em `http://localhost:3000`.

---

## 📜 Scripts Disponíveis

-   `dev`: Inicia o servidor em modo de desenvolvimento com hot-reload.
-   `build`: Compila o código TypeScript para JavaScript.
-   `start`: Inicia o servidor em modo de produção.
-   `test`: Executa os testes automatizados com Vitest.
-   `lint`: Analisa o código em busca de erros e problemas de estilo.
-   `format`: Formata o código utilizando o Prettier.

---

## 👨‍💻 Autor

**Isaac Lira**

-   **LinkedIn:** [https://www.linkedin.com/in/isaaclira42](https://www.linkedin.com/in/isaaclira42)
-   **GitHub:** [https://github.com/IsaacLira42](https://github.com/IsaacLira42)