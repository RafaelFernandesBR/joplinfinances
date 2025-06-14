import joplin from 'api';
import { ToolbarButtonLocation } from 'api/types';
import { calcularAlocacaoAtivosNaNotaSelecionada } from '../services/financeiroService';

export async function calcularAlocacaoAtivosCommand() {
    await joplin.commands.register({
        name: 'calcular-alocacao-ativos',
        label: 'Calcular alocação de ativos',
        execute: async () => {
            await calcularAlocacaoAtivosNaNotaSelecionada();
        }
    });

    await joplin.views.toolbarButtons.create('calcular-alocacao-ativos', 'calcular-alocacao-ativos', ToolbarButtonLocation.NoteToolbar);
}
