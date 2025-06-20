import joplin from 'api';

// Função para rebalancear a carteira conforme percentuais-alvo definidos na nota
export async function rebalancearCarteiraTexto() {
    const note = await joplin.workspace.selectedNote();
    if (!note) return null;

    // Regex para encontrar tabela de ativos com valor atual e percentual alvo
    const tabelaAtivosRegex = /\|\s*Ativo\s*\|\s*Valor atual\s*\|\s*Percentual alvo\s*\|[\s\S]*?\n((?:\|.*\|.*\|.*\|\n?)+)/i;
    // Regex para encontrar o valor total da carteira
    const valorCarteiraRegex = /Valor total da carteira\s*[:=]\s*R\$\s*([\d.,]+)/i;
    // Regex para encontrar a tolerância (em porcentagem)
    const toleranciaRegex = /Toler[âa]ncia\s*[:=]\s*([\d.,]+)%/i;

    // Busca valor total da carteira
    const matchCarteira = note.body.match(valorCarteiraRegex);
    if (!matchCarteira) return null;
    const valorCarteira = parseFloat(matchCarteira[1].replace(/\./g, '').replace(',', '.'));
    if (isNaN(valorCarteira)) return null;

    // Busca tolerância (padrão 1%)
    const matchTolerancia = note.body.match(toleranciaRegex);
    const tolerancia = matchTolerancia ? parseFloat(matchTolerancia[1].replace(',', '.')) / 100 : 0.01;

    // Busca tabela de ativos
    const matchAtivos = note.body.match(tabelaAtivosRegex);
    if (!matchAtivos) return null;
    const linhas = matchAtivos[1].split('\n').filter(l => l.trim().startsWith('|'));

    let resultado = `\n\n**Rebalanceamento de Carteira:**\n`;
    let algumParaRebalancear = false;
    for (const linha of linhas) {
        const colunas = linha.split('|').map(s => s.trim());
        const ativo = colunas[1];
        const valorAtual = parseFloat(colunas[2]?.replace('R$', '').replace('.', '').replace(',', '.'));
        const percentualAlvo = parseFloat(colunas[3]?.replace('%', '').replace(',', '.')) / 100;
        if (!ativo || isNaN(valorAtual) || isNaN(percentualAlvo)) continue;
        const percentualAtual = valorAtual / valorCarteira;
        const valorAlvo = valorCarteira * percentualAlvo;
        const diferenca = valorAlvo - valorAtual;
        const diffPercent = Math.abs(percentualAtual - percentualAlvo);
        if (diffPercent > tolerancia) {
            algumParaRebalancear = true;
            if (diferenca > 0) {
                resultado += `Ativo: ${ativo}\n  Valor Atual: R$ ${valorAtual.toFixed(2)} (${(percentualAtual*100).toFixed(2)}%)\n  Alvo: R$ ${valorAlvo.toFixed(2)} (${(percentualAlvo*100).toFixed(2)}%)\n  Comprar R$ ${diferenca.toFixed(2)}\n\n`;
            } else {
                resultado += `Ativo: ${ativo}\n  Valor Atual: R$ ${valorAtual.toFixed(2)} (${(percentualAtual*100).toFixed(2)}%)\n  Alvo: R$ ${valorAlvo.toFixed(2)} (${(percentualAlvo*100).toFixed(2)}%)\n  Vender R$ ${Math.abs(diferenca).toFixed(2)}\n\n`;
            }
        }
    }
    if (!algumParaRebalancear) {
        resultado += 'Todos os ativos estão dentro da tolerância definida.';
    }
    await joplin.data.put(["notes", note.id], null, { body: note.body + resultado });
}
