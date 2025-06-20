import joplin from 'api';
import { calcularCustosCommand } from './commands/calcularCustosCommand';
import { calcularAlocacaoAtivosCommand } from './commands/calcularAlocacaoAtivosCommand';
import { calcularOrcamentoCommand } from './commands/calcularOrcamentoCommand';
import { rebalancearCarteiraCommand } from './commands/rebalancearCarteiraCommand';

joplin.plugins.register({
	onStart: async function() {
        await calcularCustosCommand();
        await calcularAlocacaoAtivosCommand();
        await calcularOrcamentoCommand();
        await rebalancearCarteiraCommand();
	}
});
