import joplin from 'api';
import { ToolbarButtonLocation } from 'api/types';
import { calcularOrcamentoNaNotaSelecionada } from '../services/orcamentoService';

export async function calcularOrcamentoCommand() {
    await joplin.commands.register({
        name: 'calcular-orcamento',
        label: 'Calcular orçamento',
        execute: async () => {
            await calcularOrcamentoNaNotaSelecionada();
        }
    });

    await joplin.views.toolbarButtons.create('calcular-orcamento', 'calcular-orcamento', ToolbarButtonLocation.NoteToolbar);
}
