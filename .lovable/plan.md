Substituir a página inicial em branco por um convite eletrônico de casamento single-page para **Jorge & Heid**, com data **08/08/26** em **South Beach**.

## Conteúdo
- Hero com os nomes dos noivos, data e local.
- Pequena história romântica (criada por nós, com tom emocional e curto).
- Foto do noivo em destaque, usando o arquivo enviado pelo usuário.
- Seção de detalhes da cerimônia/recepção.
- Formulário de RSVP (confirmação de presença) funcional por e-mail, sem backend.

## Design
- Estilo elegante e clean, inspirado no azul do terno da foto do noivo e em tons claros de praia.
- Tipografia sofisticada, espaçamento generoso, cantos arredondados.
- Layout responsivo, funcionando bem em celular e desktop.
- Aplicação dos tokens semânticos do projeto (`src/styles.css`).

## Implementação
1. Criar asset da foto do noivo em `src/assets/jorge.asset.json` via `lovable-assets`.
2. Reescrever `src/routes/index.tsx` com o conteúdo completo do convite.
3. Adicionar `head()` em `src/routes/index.tsx` com título, descrição, OG/Twitter tags relevantes.
4. Ajustar o CSS no `src/styles.css` apenas se forem necessários novos tokens de cor (provavelmente não será necessário, usando os tokens existentes).
5. Verificar o build com `bun run build` ou equivalente.

## Nota técnica
Como não há backend configurado, o RSVP será enviado por e-mail através de um `mailto:` pré-preenchido com nome, número de acompanhantes e confirmação. Isso evita depender de banco de dados ou serviços externos para este primeiro convite.