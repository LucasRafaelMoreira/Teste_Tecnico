# Movie Library

Uma aplicação web para explorar e descobrir filmes populares, desenvolvida com React, TypeScript e integração com a API do The Movie Database (TMDB).

## Sobre o Projeto

Movie Library é uma aplicação que permite aos usuários navegar pelos filmes mais bem avaliados, pesquisar filmes específicos e visualizar detalhes completos incluindo sinopse, orçamento, receita, gêneros e trailers.

### Funcionalidades

- Listagem de filmes mais bem avaliados
- Sistema de busca de filmes
- Página de detalhes com informações completas
- Reprodução de trailers (YouTube e vídeos locais)
- Exibição de orçamento e receita
- Avaliação e popularidade dos filmes
- Gêneros e duração
- Interface responsiva

## Tecnologias Utilizadas

- **React 18+** - Biblioteca JavaScript para construção de interfaces
- **TypeScript** - Superset tipado do JavaScript
- **React Router DOM** - Roteamento de páginas
- **React Player** - Player de vídeo para trailers
- **React Icons** - Biblioteca de ícones
- **Vite** - Build tool e servidor de desenvolvimento
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
│   │   └── MoviesCard.tsx
│   ├── css/            # Arquivos de estilização
│   │   ├── Movie.css
│   │   └── MovieGrid.css
│   ├── pages/          # Páginas da aplicação
│   │   ├── Home.tsx
│   │   ├── Movie.tsx
│   │   └── Search.tsx
│   ├── types/          # Definições TypeScript
│   │   └── MovieTypes.ts
│   ├── App.tsx         # Componente principal
│   └── main.tsx        # Ponto de entrada
├── .env                # Variáveis de ambiente
└── package.json
```

## Funcionalidades Detalhadas

### Página Inicial (Home)
- Exibe os filmes mais bem avaliados
- Cards com poster, título, data de lançamento e avaliação
- Link para página de detalhes

### Busca de Filmes
- Campo de pesquisa integrado
- Resultados em tempo real
- Mesma estrutura de cards da home

### Página de Detalhes
- Informações completas do filme
- Player de trailer integrado
- Suporte para trailers do YouTube e vídeos locais
- Exibição de:
  - Orçamento e receita formatados em BRL
  - Duração em minutos
  - Data de lançamento formatada
  - Gêneros do filme
  - Sinopse completa
  - Tagline

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

## Personalização

### Adicionando Trailers Locais

1. Adicione o vídeo na pasta `public/videos/`
2. Atualize o objeto `localTrailers` em `src/pages/Movie.tsx`:

```typescript
const localTrailers: { [key: string]: string } = {
  'ID_DO_FILME': '/videos/nome-do-video.mp4',
};
```

## Decisões Técnicas

### Arquitetura e Estrutura
- **Componentização**: Separação clara entre componentes reutilizáveis (`MoviesCard`) e páginas (`Home`, `Movie`, `Search`)
- **Tipagem TypeScript**: Interfaces centralizadas em `types/MovieTypes.ts` para garantir type safety em todo o projeto
- **Gerenciamento de Estado**: Uso de React Hooks (`useState`, `useEffect`) para estados locais simples, adequado ao escopo do projeto

### Integração com API
- **Variáveis de Ambiente**: Uso do Vite para gerenciar credenciais de API de forma segura
- **Error Handling**: Implementação de try/catch em todas as chamadas à API com estados de loading e error
- **Formatação de Dados**: Funções utilitárias para formatação de moeda (BRL) e datas (pt-BR)

### Player de Vídeo
- **React Player**: Escolhido por sua versatilidade em suportar tanto YouTube quanto arquivos locais
- **Trailers Locais**: Sistema de fallback que prioriza vídeos locais para filmes específicos (IDs 238, 240, 278)
- **Responsividade**: Container com aspect ratio 16:9 para manter proporções corretas em diferentes telas

### Estilização
- **CSS Separado**: Arquivos CSS dedicados para melhor organização e manutenibilidade
- **Mobile-First**: Design responsivo que se adapta a diferentes tamanhos de tela

### Roteamento
- **React Router DOM v6**: Roteamento client-side para navegação fluida entre páginas sem reload
- **Parâmetros Dinâmicos**: Uso de `useParams` para capturar IDs de filmes nas URLs


