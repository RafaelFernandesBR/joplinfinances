import joplin from 'api';

// Função para calcular alocação de ativos e retornar o texto consolidado
export async function calcularAlocacaoAtivosTexto() {
    const note = await joplin.workspace.selectedNote();
    if (!note) return null;

    // Regex para encontrar tabela de alocação de ativos (agora só 3 colunas)
    const tabelaAtivosRegex = /\|\s*Ativo\s*\|\s*Porcentagem recomendada\s*\|\s*Preço atual\s*\|[\s\S]*?\n((?:\|.*\|.*\|.*\|\n?)+)/i;
    // Regex para encontrar o valor total em carteira
    const valorInvestirRegex = /Valor total para investir\s*[:=]\s*R\$\s*([\d.,]+)/i;

    // Busca valor total em carteira
    const matchCarteira = note.body.match(valorInvestirRegex);
    if (!matchCarteira) return null;
    const valorCarteira = parseFloat(matchCarteira[1].replace(/\./g, '').replace(',', '.'));
    if (isNaN(valorCarteira)) return null;

    // Busca tabela de ativos
    const matchAtivos = note.body.match(tabelaAtivosRegex);
    if (!matchAtivos) return null;
    const linhas = matchAtivos[1].split('\n').filter(l => l.trim().startsWith('|'));

    let totalInvestido = 0;
    let totalCotas = 0;
    let textoAtivos = '';

    for (const linha of linhas) {
        const colunas = linha.split('|').map(s => s.trim());
        const ativo = colunas[1];
        const porcentagemStr = colunas[2]?.replace('%', '').replace(',', '.');
        const precoAtualStr = colunas[3]?.replace('R$', '').replace(',', '.');
        const porcentagem = parseFloat(porcentagemStr) / 100;
        const precoAtual = parseFloat(precoAtualStr);
        if (!ativo || isNaN(porcentagem) || isNaN(precoAtual)) continue;
        const cotas = Math.ceil((porcentagem * valorCarteira) / precoAtual);
        const totalGasto = cotas * precoAtual;
        totalInvestido += totalGasto;
        totalCotas += cotas;
        textoAtivos += `Ativo: ${ativo}\n  % Recomendada: ${(porcentagem * 100).toFixed(2)}%\n  Preço Atual: R$ ${precoAtual.toFixed(2)}\n  Cotas a Comprar: ${cotas}\n  Total Gasto: R$ ${totalGasto.toFixed(2)}\n\n`;
    }

    let resultado = `\n\n**Cálculo de Alocação de Ativos:**\n`;
    resultado += textoAtivos;
    resultado += `Valor total investido: R$ ${totalInvestido.toFixed(2)}\n`;
    resultado += `Total de cotas adquiridas: ${totalCotas}`;
    await joplin.data.put(["notes", note.id], null, { body: note.body + resultado });
}
