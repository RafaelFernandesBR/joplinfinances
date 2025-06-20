import joplin from 'api';
import { ToolbarButtonLocation } from 'api/types';
import { rebalancearCarteiraTexto } from '../services/rebalanceamentoService';

export async function rebalancearCarteiraCommand() {
    await joplin.commands.register({
        name: 'rebalancear-carteira',
        label: 'Rebalancear Carteira',
        execute: async () => {
            await rebalancearCarteiraTexto();
        }
    });

    await joplin.views.toolbarButtons.create('rebalancear-carteira', 'rebalancear-carteira', ToolbarButtonLocation.NoteToolbar);
}
