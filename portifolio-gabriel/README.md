# Portfólio Gabriel Amaral

Single-page app focada em apresentar serviços de climatização e permitir agendamento rápido via WhatsApp.

## Scripts

| Comando        | Descrição                 |
| -------------- | ------------------------- |
| `npm run dev`  | Ambiente de desenvolvimento (HMR). |
| `npm run build`| Build de produção.        |
| `npm run preview` | Preview do build.     |

## Stack

- React 19 + Vite
- Tailwind CSS (PostCSS/Autoprefixer)
- Ícones do `lucide-react`

Após `npm install`, basta `npm run dev` e acessar o link exibido no terminal.

## Deploy no GitHub Pages

1. Edite `.github/workflows/deploy.yml` e ajuste `VITE_BASE_PATH` para corresponder ao caminho final (por exemplo `/portifolio-gabriel/`).
2. Faça push da branch `main`; o GitHub Actions (workflow “Deploy para GitHub Pages”) irá instalar dependências, rodar `npm run build` e publicar o conteúdo de `dist`.
3. Verifique em *Settings › Pages* se o domínio gerado está ativo. Em caso de alterações estruturais, é só novo push.
