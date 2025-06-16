# Joplin Finance

Um plugin de gestão e ajuda financeira para o Joplin, criado para facilitar o controle de receitas, despesas, orçamento e alocação de investimentos diretamente nas suas notas.

## Funcionalidades
- **Cálculo automático de gastos e receitas**: O plugin identifica tabelas markdown de gastos e receitas na nota selecionada e soma os valores automaticamente.
- **Resumo financeiro**: Insere ao final da nota um resumo com o total de gastos, receitas, saldo e a porcentagem dos gastos sobre as receitas.
- **Cálculo de orçamento por porcentagem**: Permite criar uma tabela de orçamento onde você define o valor total a ser gasto e distribui esse valor entre diferentes categorias usando porcentagens. O plugin calcula automaticamente o valor de cada categoria.
- **Cálculo de alocação de ativos**: Permite calcular, a partir de uma tabela simples, quantas cotas comprar de cada ativo para atingir a alocação recomendada, mostrando também o total investido e total de cotas.
- **Botão na barra de ferramentas**: Adiciona botões na barra de ferramentas da nota para executar os cálculos com um clique.

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

### Exemplo de tabela de orçamento
Adicione o valor total antes da tabela:

```
Total a gastar: 3560,70

| Item                | Porcentagem | Valor |
|---------------------|-------------|-------|
| Custos fixos        | 62          |       |
| Conforto            | 12,5        |       |
| Metas               | 1,5         |       |
| Prazeres            | 4           |       |
| Liberdade financeira| 15          |       |
| Conhecimento        | 5           |       |
```

### Exemplo de tabela de alocação de ativos
Adicione também o valor total em carteira antes da tabela:

```
Valor total em carteira: R$ 487,00

| Ativo   | Porcentagem recomendada | Preço atual |
|---------|------------------------|-------------|
| ativo11  | 13,78%                 | R$ 10,66    |
| ativo3  | 20,00%                 | R$ 15,00    |
| ativod11  | 10,00%                 | R$ 9,50     |
| ativo4  | 8,00%                  | R$ 10,00    |
```

3. Clique no botão correspondente na barra de ferramentas da nota ("Calcular custos", "Calcular orçamento" ou "Calcular alocação de ativos").
4. O resultado será adicionado ao final da nota, facilitando sua análise financeira.

---

O Joplin Finance é uma ferramenta completa de ajuda financeira, auxiliando tanto no controle de despesas/receitas quanto na organização e planejamento de orçamento e investimentos.
