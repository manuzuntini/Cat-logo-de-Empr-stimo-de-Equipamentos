# Catálogo de Empréstimo de Equipamentos (Vue 3 + Tailwind, via CDN)

Aplicação com CRUD completo, persistência em `localStorage` e propriedades `computed`.

## Como rodar
Abra `index.html` no navegador (duplo clique). Não é necessário instalar nada.

## Dependências
- **Nenhuma instalação obrigatória** (Vue 3 e Tailwind via CDN).

### (Opcional) Ambiente com Node/NPM
Se preferir rodar um dev server e empacotar dependências:
```bash
npm create vite@latest catalogo-lab -- --template vanilla
cd catalogo-lab
npm i vue@3
npm i -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
# Configure o Tailwind conforme a docs e mova os arquivos para /src
npm run dev
```

## Estrutura
- `index.html`: marcação e inclusão dos CDNs + referência ao `main.js`.
- `main.js`: lógica Vue (CRUD, filtros, computed e persistência).

## Requisitos atendidos
- v-model, v-on, v-bind (:class e :disabled), v-if/v-else, v-for com :key.
- CRUD completo com confirmação de remoção.
- Persistência no localStorage (carrega e salva automaticamente).
- Computed: contadores e lista filtrada.
- Acessibilidade: labels, aria-invalid, foco ao editar.
