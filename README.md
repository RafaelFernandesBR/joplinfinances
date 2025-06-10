# Joplin Finance

Um plugin de gestão financeira para o Joplin, criado para facilitar o controle de receitas e despesas diretamente nas suas notas.

## Funcionalidades
- **Cálculo automático de gastos e receitas**: O plugin identifica tabelas markdown de gastos e receitas na nota selecionada e soma os valores automaticamente.
- **Resumo financeiro**: Insere ao final da nota um resumo com o total de gastos, receitas, saldo e a porcentagem dos gastos sobre as receitas.
- **Botão na barra de ferramentas**: Adiciona um botão na barra de ferramentas da nota para executar o cálculo com um clique.

## Como usar
1. Crie ou edite uma nota no Joplin.
2. Insira tabelas markdown com o seguinte formato:

### Exemplo de tabela de gastos
```
| item      | valor     |
|-----------|-----------|
| Aluguel   | 1200,00   |
| Mercado   | 500,00    |
| Luz       | 200,00    |
```

### Exemplo de tabela de receitas
```
| receita   | valor     |
|-----------|-----------|
| Salário   | 3000,00   |
| Extra     | 500,00    |
```

3. Clique no botão "Calcular custos" na barra de ferramentas da nota.
4. O resumo financeiro será adicionado ao final da nota.
