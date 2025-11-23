# PortifolioGabrielAmaral

Portfólio em React + Vite para o técnico Gabriel Amaral, estilizado com Tailwind CSS e pronto para agendamentos via WhatsApp.

## Como rodar

```bash
cd portifolio-gabriel
npm install
npm run dev
```

## Tecnologias

- React 19
- Vite
- Tailwind CSS
- lucide-react

## Deploy no GitHub Pages

1. Crie o repositório no GitHub e envie o código (`main`).
2. Ajuste o valor de `VITE_BASE_PATH` no workflow (`.github/workflows/deploy.yml`) para `/<nome-do-repo>/` caso não esteja publicando em `username.github.io`.
3. No GitHub, acesse *Settings › Pages*, deixe “Source: GitHub Actions”.
4. Cada push no `main` executará o workflow e atualizará o site; também é possível disparar manualmente via aba *Actions*.

## Próximos passos

1. Confirme na aba *Actions* se o workflow “Deploy para GitHub Pages” concluiu com sucesso e valide o link em *Settings › Pages*.
2. Opcional: configure um domínio personalizado (CNAME) e ajuste `VITE_BASE_PATH` conforme necessário.
3. Ao realizar mudanças no conteúdo ou estilo, execute `npm run build` localmente para validar antes do próximo push para `main`.