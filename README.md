# Gabriel Basso — Portfolio Studio Edition

Website estático para GitHub Pages. Inclui portfólio principal, quatro estudos de caso e quatro sites conceituais navegáveis (39 páginas HTML).

## Publicação sem servidor

1. Extraia o ZIP. Envie **todos os arquivos e pastas do interior** para a raiz do repositório `seuusuario.github.io` (não envie a pasta que os contém).
2. No GitHub, Settings > Pages > Deploy from a branch > main > /(root).
3. Após a implantação, acesse o site via HTTPS. Em alterações, use Ctrl+F5 para atualizar o cache.
4. Links relativos foram mantidos para uso local e na raiz do GitHub Pages. Para projetos hospedados em subpastas, verifique links relativos.

## Contato

O formulário principal é enviado por POST diretamente para o endpoint existente do FormSubmit.io. Os dados não são armazenados neste website. O serviço externo controla disponibilidade, confirmação e entrega. **Faça um envio real de teste** depois de publicar. Formulários da Alva e Prumo permanecem exclusivamente demonstrativos.

## Imagens e direitos

- O retrato principal usa o PNG original fornecido pelo titular, sem alteração facial.
- As fotos dos conceitos são **fotografias de referência**, de terceiros, não obras das empresas fictícias. Há referências externas ao CDN Pexels para algumas imagens, com fallback local. Precisam de internet para exibir as fotografias externas; não afirmamos ter embutido os originais licenciados no ZIP.
- Consulte `FOTOGRAFIAS_REAIS_FONTES_E_LIMITACOES.md` para créditos e fontes e https://www.pexels.com/license/ para os termos aplicáveis. Alguns fallbacks locais são visualizações conceituais geradas, mantidos somente se a foto não carregar.
- Não retire os avisos de estudos conceituais nem apresente estes trabalhos como de clientes contratantes.

## Arquivos

- `index.html`: homepage profissional
- `assets/css/style.css`: estilos existentes, identidades dos sites
- `assets/css/portfolio-premium.css`: acabamento editorial, novas seções e estudos
- `assets/js/site.js`: navegação, animações e interações existentes
- `assets/js/portfolio-premium.js`: recomendador de tipo de site e aprimoramentos
- `assets/js/studio-motion.js`: GSAP 3.15 + ScrollTrigger para motion editorial (CDN opcional com fallback sem animação)
- `assets/js/portfolio-navigation.js`: indicador de leitura e seção ativa da navegação
- `projetos/`: estudos de caso; `demo/`: quatro websites independentes

## Edição

Edite os textos diretamente nos HTML. Em `projetos/*/index.html`, os estudos de caso são identificados como conceitos; `assets/css/portfolio-premium.css` ajusta a nova homepage. Para trocar imagens, edite `src` e `srcset`, observando a presença de `data-photo-fallback`. Teste teclado, celular, formulário e recursos externos antes de divulgar.

## Validação e limitações

Ética comercial: não há depoimentos, clientes, prêmios, resultados ou métricas inventados. O recomendador do site é apenas uma orientação, não gera preços nem garante resultados. Qualidade/SEO/Lighthouse reais dependem de testes no domínio de publicação e da rede do visitante.

## Animação e frameworks

Este site é uma aplicação **estática multipágina** projetada especificamente para hospedagem gratuita em GitHub Pages; não é um projeto React nem depende de build Node. Adicionar React/Next.js para um portfólio deste tamanho introduziria JavaScript, build e manutenção desnecessários. A camada de motion profissional utiliza **GSAP 3.15.0 + ScrollTrigger** quando o CDN está acessível, mantendo animações CSS e navegação nativa sem esse serviço. GSAP é uma biblioteca de animação, não um framework full-stack. O conjunto também possui um design system CSS próprio e componentes semânticos.

A compatibilidade com `prefers-reduced-motion` foi preservada, e efeitos de movimento são **progressivos**, não necessários para navegar ou enviar formulários. Links entre páginas podem usar View Transitions nativas em navegadores compatíveis; nos demais, navegam normalmente.

## Pendências antes de divulgar amplamente

1. Confirmar que as imagens remotas do Pexels carregam no domínio real e decidir se deseja hospedá-las localmente para maior controle.
2. Testar um envio real do FormSubmit.io após publicar.
3. Substituir as URLs relativas de Open Graph por uma URL absoluta para a imagem de compartilhamento quando definir o domínio definitivo, e produzir sitemap com URLs absolutas.
4. Medir Core Web Vitals e acessibilidade no domínio de produção; o relatório incluído descreve apenas os testes disponíveis.
5. Ler as condições de licença e os créditos das fotografias presentes no documento de fontes.

## Relatório de verificação

Veja `QA-RELATORIO.json`. Foram inspecionadas 39 páginas e 830 referências locais. Foram realizados testes de interface em cinco larguras da homepage e testes de fumaça em 11 rotas representativas com duas larguras; sem erros de JavaScript e sem overflow nesses testes. A execução externa real de FormSubmit, GSAP e carregamento Pexels não foi medida nesta sessão.


## Destaque pessoal (atualização)
A homepage apresenta Gabriel Basso com retrato real na primeira tela, identificação pessoal visível no mobile e seção "Sobre mim" com fotografia, apresentação e links diretos de contato. Nenhum histórico de clientes foi inventado.
