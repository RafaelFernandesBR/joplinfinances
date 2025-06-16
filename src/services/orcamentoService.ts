import joplin from 'api';

// Serviço para calcular valores de orçamento em uma tabela markdown na nota selecionada
export async function calcularOrcamentoNaNotaSelecionada() {
    const note = await joplin.workspace.selectedNote();

    // Regex para encontrar o total
    const totalRegex = /Total a gastar\s*[:=]?\s*([\d.,]+)/i;
    const totalMatch = note.body.match(totalRegex);
    if (!totalMatch) return null;

    const total = parseFloat(totalMatch[1].replace('.', '').replace(',', '.'));
    if (isNaN(total)) return null;

    // Regex para encontrar tabela de orçamento
    const tabelaOrcamentoRegex = /\|\s*item\s*\|\s*porcentagem\s*\|\s*valor\s*\|[\s\S]*?\n((?:\|.*\|.*\|.*\|\n?)+)/i;
    const matchTabela = note.body.match(tabelaOrcamentoRegex);
    if (!matchTabela) {
        await joplin.views.dialogs.showMessageBox('Tabela de orçamento não encontrada. Use o formato markdown: | Item | Porcentagem | Valor |');
        return;
    }

    const linhas = matchTabela[1].split('\n').filter(l => l.trim().startsWith('|'));
    let novaTabela = '';
    for (const linha of linhas) {
        const colunas = linha.split('|').map(s => s.trim());
        if (colunas.length < 4) {
            novaTabela += linha + '\n';
            continue;
        }
        const item = colunas[1];
        const porcentagem = parseFloat(colunas[2].replace(',', '.'));
        if (isNaN(porcentagem)) {
            novaTabela += linha + '\n';
            continue;
        }
        const valorCalculado = (total * porcentagem / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        novaTabela += `| ${item} | ${colunas[2]} | ${valorCalculado} |\n`;
    }
    // Substitui a tabela antiga pela nova
    const novaBody = note.body.replace(tabelaOrcamentoRegex, match => match.replace(matchTabela[1], novaTabela));
    await joplin.data.put(["notes", note.id], null, { body: novaBody });
}
