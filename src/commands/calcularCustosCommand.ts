import joplin from 'api';
import { ToolbarButtonLocation } from 'api/types';
import { calcularCustosNaNotaSelecionada } from '../services/financeiroService';

export async function calcularCustosCommand() {
    await joplin.commands.register({
        name: 'calcular-custos',
        label: 'Calcular custos',
        execute: async () => {
            await calcularCustosNaNotaSelecionada();
        }
    });

    await joplin.views.toolbarButtons.create('calcular-custos', 'calcular-custos', ToolbarButtonLocation.NoteToolbar);
}
