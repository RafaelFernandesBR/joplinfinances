import joplin from 'api';
import { calcularCustosCommand } from './commands/calcularCustos';
import { calcularAlocacaoAtivosCommand } from './commands/calcularAlocacaoAtivos';

joplin.plugins.register({
	onStart: async function() {
        await calcularCustosCommand();
        await calcularAlocacaoAtivosCommand();
	}
});
