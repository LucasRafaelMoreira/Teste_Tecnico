# Movie Library

Uma aplicação web para explorar e descobrir filmes populares, desenvolvida com React, TypeScript e integração com a API do The Movie Database (TMDB).

## Sobre o Projeto

Movie Library é uma aplicação que permite aos usuários navegar pelos filmes mais bem avaliados, pesquisar filmes específicos e visualizar detalhes completos incluindo sinopse, orçamento, receita, gêneros e trailers.

### Funcionalidades

- Listagem de filmes mais bem avaliados com paginação
- Sistema de busca de filmes
- Página de detalhes com informações completas
- Player de vídeo customizado para trailers
- Reprodução de trailers (YouTube e vídeos locais)
- Exibição de orçamento e receita
- Avaliação e popularidade dos filmes
- Gêneros e duração
- Navegação por páginas com controle numérico
- Interface responsiva
- Testes unitários automatizados

## Tecnologias Utilizadas

- **React 18+** - Biblioteca JavaScript para construção de interfaces
- **TypeScript** - Superset tipado do JavaScript
- **React Router DOM** - Roteamento de páginas
- **React Player** - Player de vídeo para trailers
- **React Icons** - Biblioteca de ícones
- **Vite** - Build tool e servidor de desenvolvimento
- **Vitest** - Framework de testes unitários
- **Testing Library** - Biblioteca para testes de componentes React
- **CSS Modules** - Estilização componentizada
- **TMDB API** - API do The Movie Database

## Pré-requisitos

Antes de começar, você precisa ter instalado:

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/movie_lib.git
cd movie_lib/movies_lib
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
VITE_API_KEY=api_key=SUA_API_KEY_AQUI
VITE_API=https://api.themoviedb.org/3/movie/
VITE_SEARCH=https://api.themoviedb.org/3/search/movie
VITE_IMG=https://image.tmdb.org/t/p/w500/
VITE_VD=https://api.themoviedb.org/3/movie/
```

**Como obter a API Key:**
1. Acesse [The Movie Database](https://www.themoviedb.org/)
2. Crie uma conta gratuita
3. Vá em Configurações > API
4. Solicite uma chave de API
5. Copie a chave e substitua `SUA_API_KEY_AQUI`

## Executando o Projeto

### Modo de Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

### Build de Produção

```bash
npm run build
```

### Preview do Build

```bash
npm run preview
```

## Estrutura de Pastas

```
movies_lib/
├── public/
│   └── videos/          # Vídeos locais dos trailers
├── src/
│   ├── components/      # Componentes reutilizáveis
│   │   ├── MoviesCard.tsx
│   │   ├── Navbar.tsx
│   │   ├── Pagination.tsx
│   │   └── CustomPlayer.tsx
│   ├── css/            # Arquivos de estilização (SCSS Modules)
│   │   ├── Movie.module.scss
│   │   ├── MovieGrid.module.scss
│   │   ├── Navbar.module.scss
│   │   ├── Pagination.module.scss
│   │   └── CustomPlayer.module.scss
│   ├── pages/          # Páginas da aplicação
│   │   ├── Home.tsx
│   │   ├── Movie.tsx
│   │   └── Search.tsx
│   ├── tests/          # Testes unitários
│   │   ├── MoviesCard.test.tsx
│   │   └── Pagination.test.tsx
│   ├── types/          # Definições TypeScript
│   │   └── MovieTypes.ts
│   ├── App.tsx         # Componente principal
│   ├── main.tsx        # Ponto de entrada
│   └── setupTests.ts   # Configuração dos testes
├── .env                # Variáveis de ambiente
├── vite.config.ts      # Configuração do Vite e Vitest
└── package.json
```

## Funcionalidades Detalhadas

### Página Inicial (Home)
- Exibe os filmes mais bem avaliados
- Cards com poster, título, data de lançamento e avaliação
- Link para página de detalhes
- Sistema de paginação com navegação numérica
- Scroll suave ao trocar de página

### Busca de Filmes
- Campo de pesquisa integrado
- Resultados em tempo real
- Mesma estrutura de cards da home
- Paginação de resultados
- Reset automático para página 1 ao buscar novo termo

### Página de Detalhes
- Informações completas do filme
- Player de trailer customizado
- Controles personalizados: play/pause, volume, fullscreen, seek
- Suporte para trailers do YouTube e vídeos locais
- Exibição de:
  - Orçamento e receita formatados em BRL
  - Duração em minutos
  - Data de lançamento formatada
  - Gêneros do filme
  - Sinopse completa
  - Tagline

### Sistema de Paginação
- Navegação por números de página
- Botões anterior/próximo
- Indicação visual da página atual
- Reticências (...) para páginas ocultas
- Limita exibição a 7 páginas visíveis
- Design responsivo

### Player Customizado
- Estilo inspirado no YouTube com cores do tema
- Controles aparecem ao mover o mouse
- Desaparecem automaticamente após 3 segundos
- Clique no vídeo para play/pause
- Clique na barra de progresso para navegar
- Barra de volume com slider
- Modo fullscreen

### Trailers Locais
O projeto suporta trailers locais para os seguintes filmes:
- ID 238: O Poderoso Chefão
- ID 240: O Poderoso Chefão 2
- ID 278: Um Sonho de Liberdade

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Preview do build de produção
- `npm run lint` - Executa o linter
- `npm run test` - Executa os testes em modo watch
- `npm run test:ui` - Abre interface visual dos testes
- `npm run test:coverage` - Gera relatório de cobertura de testes

## Personalização

### Adicionando Trailers Locais

1. Adicione o vídeo na pasta `public/videos/`
2. Atualize o objeto `localTrailers` em `src/pages/Movie.tsx`:

```typescript
const localTrailers: { [key: string]: string } = {
  'ID_DO_FILME': '/videos/nome-do-video.mp4',
};
```

## Testes

O projeto inclui testes unitários para garantir a qualidade e funcionamento dos componentes.

### Executando os Testes

```bash
# Modo watch (recomendado durante desenvolvimento)
npm run test

# Interface visual interativa
npm run test:ui

# Gerar relatório de cobertura
npm run test:coverage
```

### Componentes Testados

#### Pagination
- Renderização condicional (não renderiza se totalPages <= 1)
- Botões de navegação (anterior/próximo)
- Estados desabilitados nas extremidades
- Clique em números de página
- Destaque da página atual
- Exibição de reticências
- Navegação por setas

#### MoviesCard
- Renderização de título e avaliação
- Exibição de imagem do poster
- Link de detalhes condicional
- Formatação correta da data

### Tecnologias de Teste

- **Vitest**: Framework de testes rápido e compatível com Vite
- **@testing-library/react**: Testes centrados no usuário
- **@testing-library/jest-dom**: Matchers adicionais para asserções
- **@testing-library/user-event**: Simulação de interações do usuário
- **jsdom**: Ambiente DOM para Node.js

## Decisões Técnicas

### Arquitetura e Estrutura
- **Componentização**: Separação clara entre componentes reutilizáveis (`MoviesCard`, `Pagination`, `CustomPlayer`) e páginas (`Home`, `Movie`, `Search`)
- **Tipagem TypeScript**: Interfaces centralizadas em `types/MovieTypes.ts` para garantir type safety em todo o projeto
- **Gerenciamento de Estado**: Uso de React Hooks (`useState`, `useEffect`) para estados locais simples, adequado ao escopo do projeto
- **Testes Unitários**: Implementação com Vitest e Testing Library para garantir qualidade do código

### Integração com API
- **Variáveis de Ambiente**: Uso do Vite para gerenciar credenciais de API de forma segura
- **Error Handling**: Implementação de try/catch em todas as chamadas à API com estados de loading e error
- **Formatação de Dados**: Funções utilitárias para formatação de moeda (BRL) e datas (pt-BR)

### Player de Vídeo
- **React Player 3.4.0**: Escolhido por sua versatilidade em suportar tanto YouTube quanto arquivos locais
- **Player Customizado**: Desenvolvimento de controles personalizados no estilo YouTube com as cores do site
- **Trailers Locais**: Sistema de fallback que prioriza vídeos locais para filmes específicos (IDs 238, 240, 278)
- **Responsividade**: Container com aspect ratio 16:9 para manter proporções corretas em diferentes telas
- **Controles Inteligentes**: Aparecem ao mover o mouse e desaparecem automaticamente

### Estilização
- **SCSS Modules**: Arquivos SCSS com escopo modular para evitar conflitos de estilo
- **Tema Netflix**: Paleta de cores inspirada na Netflix (#e50914)
- **Design Responsivo**: Media queries para adaptação em diferentes dispositivos

### Roteamento
- **React Router DOM v6**: Roteamento client-side para navegação fluida entre páginas sem reload
- **Parâmetros Dinâmicos**: Uso de `useParams` para capturar IDs de filmes nas URLs


