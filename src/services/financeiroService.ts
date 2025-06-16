import joplin from 'api';

// Função para somar valores de tabelas markdown de gastos e receitas e inserir o resultado na nota
export async function calcularCustosNaNotaSelecionada() {
    const note = await joplin.workspace.selectedNote();
    if (!note) return;

    // Regex para encontrar tabela de gastos
    const tabelaGastosRegex = /\|\s*item\s*\|\s*valor\s*\|[\s\S]*?\n((?:\|.*\|.*\|\n?)+)/i;
    // Regex para encontrar tabela de receitas
    const tabelaReceitasRegex = /\|\s*receita\s*\|\s*valor\s*\|[\s\S]*?\n((?:\|.*\|.*\|\n?)+)/i;

    // GASTOS
    let totalGastos = 0;
    const matchGastos = note.body.match(tabelaGastosRegex);
    if (matchGastos) {
        const linhas = matchGastos[1].split('\n').filter(l => l.trim().startsWith('|'));
        for (const linha of linhas) {
            const colunas = linha.split('|').map(s => s.trim());
            const valor = parseFloat(colunas[2]?.replace(/[^\d.,-]/g, '').replace(',', '.'));
            if (!isNaN(valor)) totalGastos += valor;
        }
    }

    // RECEITAS
    let totalReceitas = 0;
    const matchReceitas = note.body.match(tabelaReceitasRegex);
    if (matchReceitas) {
        const linhas = matchReceitas[1].split('\n').filter(l => l.trim().startsWith('|'));
        for (const linha of linhas) {
            const colunas = linha.split('|').map(s => s.trim());
            const valor = parseFloat(colunas[2]?.replace(/[^\d.,-]/g, '').replace(',', '.'));
            if (!isNaN(valor)) totalReceitas += valor;
        }
    }

    // Cálculo do saldo e porcentagem
    const saldo = totalReceitas - totalGastos;
    const porcentagem = totalReceitas > 0 ? (totalGastos / totalReceitas) * 100 : 0;

    // Monta o resultado
    let resultado = `\n\n**Resumo Financeiro do Mês:**\n`;
    resultado += `- Total de gastos: R$ ${totalGastos.toFixed(2)}\n`;
    resultado += `- Total de receitas: R$ ${totalReceitas.toFixed(2)}\n`;
    resultado += `- Saldo: R$ ${saldo.toFixed(2)}\n`;
    resultado += `- Porcentagem dos gastos sobre as receitas: ${porcentagem.toFixed(2)}%`;

    await joplin.data.put(["notes", note.id], null, { body: note.body + resultado });
}
