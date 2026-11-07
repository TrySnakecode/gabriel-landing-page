# Gabriel Basso — Portfólio bilíngue (PT/EN)

Versão estática para GitHub Pages, com **78 páginas**: as 39 páginas originais em português e suas 39 equivalentes em inglês. O seletor **PT / EN** aparece no cabeçalho de todas elas, inclusive no celular.

## Como publicar

1. Extraia o arquivo ZIP.
2. Abra a pasta extraída e envie **todos os arquivos e diretórios de dentro dela** para a raiz de seu repositório GitHub Pages. O arquivo `index.html` e a pasta `en/` devem aparecer lado a lado, junto de `assets/`, `demo/` e `projetos/`.
3. Confirme o commit e aguarde a conclusão da publicação no GitHub Actions/Pages.
4. Teste `https://SEU-USUARIO.github.io/` (português) e `https://SEU-USUARIO.github.io/en/` (inglês). Se estiver usando um repositório de projeto, acrescente o caminho correspondente antes de `/en/`.
5. Verifique a navegação PT/EN numa página interna, como `/projetos/bruma/index.html` ↔ `/en/projetos/bruma/index.html`.

## O que foi traduzido

- Homepage, serviços, metodologia, dúvidas frequentes e formulário de contato.
- Os quatro estudos de caso: Bruma, Alva, Prumo e Risco.
- As quatro demonstrações navegáveis e suas páginas internas.
- Campos e orientações dos formulários, avisos sobre projetos fictícios e seus botões.
- Rótulos, mensagens interativas de simulação, explorador da Bruma, orientador de projeto, seleção de materiais, estados de Risco, títulos, descrições SEO, atributos de acessibilidade e textos alternativos das imagens.
- Mensagem inicial de WhatsApp ao clicar na versão em inglês.

Os nomes das marcas continuam iguais nos dois idiomas. Alguns caminhos de URL, IDs técnicos e valores internos dos formulários permanecem em português para não quebrar integrações e interações; **eles não aparecem como conteúdo em português para o visitante inglês**.

## Como funciona

A versão principal em português fica na raiz do repositório. A tradução inglesa é uma segunda versão HTML, pronta para indexação e visualização, dentro de `en/`. Cada botão PT/EN aponta para a página equivalente, sem redirecionar o visitante de volta ao início. Os links entre projetos também permanecem no idioma escolhido. A biblioteca compartilhada `assets/js/i18n-runtime.js` localiza mensagens geradas por JavaScript durante as interações.

## Edição futura

Quando mudar textos, páginas ou projetos, atualize **ambos** os idiomas. Alterar somente o português não atualizará automaticamente os arquivos da pasta `en/`. Os conteúdos foram traduzidos editorialmente, não por um serviço externo em tempo real.

## Serviços e limitações

- O formulário principal continua enviando pelo seu **FormSubmit.io**, com o mesmo destino previamente configurado. A entrega real de novas mensagens depende do status e das limitações desse serviço.
- As demonstrações da Alva e da Prumo continuam simulações sem envio de dados.
- As fotografias de referência Pexels dependem de conexão externa; existem alternativas locais nos assets.
- As fotos pessoais são os retratos fornecidos e foram preservadas.
- GSAP/ScrollTrigger e as fontes web são carregados externamente com fallback.
- O teste visual foi executado com CSS e imagens embutidas em um navegador isolado porque este ambiente bloqueou a abertura direta de URLs locais e de servidores de teste. Portanto, confira as interações reais na URL publicada antes de divulgar amplamente.

## SEO

Foram incluídos metadados em inglês e links de idioma correspondentes. Para uma otimização de SEO internacional definitiva, depois de decidir o domínio público, configure URLs absolutas em `hreflang`, canonicals e sitemap.
