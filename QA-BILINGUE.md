# Verificações — versão bilíngue

- 39 páginas em português mais 39 páginas inglesas geradas.
- Seletor PT/EN presente em todos os cabeçalhos, inclusive páginas de estudo de caso e demonstrações.
- Arquivos locais e rotas internas verificados por parser HTML; sem destinos locais ausentes.
- Tradução estática de todos os nós de texto visíveis mapeados (1970 ocorrências em inglês).
- Sem texto visível com caracteres portugueses acentuados nas páginas inglesas; nomes de marca preservados.
- Metadados de página, textos alternativos e rótulos de acessibilidade revisados.
- Sintaxe de `site.js`, `portfolio-premium.js` e `i18n-runtime.js` validada com `node --check`.
- Layout de homepage PT/EN renderizado com CSS e retratos em teste isolado, em 1440 e 390 px: sem rolagem horizontal, seletor visível e retrato presente.
- Dez rotas inglesas representativas inspecionadas no mobile. Uma quebra de largura na página Frequency/Risco foi corrigida.
- Envio real pelo FormSubmit.io, carregamento externo do Pexels e testes completos de interação no site publicado **não realizados nesta sessão**.
