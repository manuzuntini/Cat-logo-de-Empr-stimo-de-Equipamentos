📖 Descrição do Projeto

O Catálogo de Empréstimo de Equipamentos de Laboratório é uma aplicação Single Page Application (SPA) desenvolvida com Vue.js 3 via CDN e TailwindCSS.
O objetivo é permitir o cadastro, listagem, edição e remoção de equipamentos (CRUD), além de controlar o status de empréstimo de cada item (disponível ou emprestado).

A aplicação mantém os dados salvos no localStorage, garantindo persistência mesmo após recarregar a página.

✨ Funcionalidades

Cadastro (Create): formulário com validação simples para todos os campos obrigatórios.

Listagem (Read): exibição em tabela/lista usando v-for, com mensagem amigável quando vazia.

Edição (Update): possibilidade de alterar dados de um equipamento já cadastrado.

Remoção (Delete): exclusão com confirmação.

Status visual: destaque com cores diferentes para “disponível” e “emprestado”.

Persistência: todos os dados são salvos e restaurados via localStorage.

Propriedades Computadas:

Contadores automáticos (total, disponíveis, emprestados).

Filtro dinâmico por categoria e/ou status.

🛠️ Tecnologias Utilizadas

Vue.js 3
 (via CDN)

TailwindCSS
 (via CDN)

HTML5 + CSS3 + JavaScript (sem backend)

🚀 Como Executar

Baixe/clonar este repositório.

Abra o arquivo index.html diretamente no navegador.

Não é necessário instalar dependências.
