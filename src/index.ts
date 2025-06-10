import joplin from 'api';
import { calcularCustosCommand } from './commands/calcularCustos';

joplin.plugins.register({
	onStart: async function() {
        await calcularCustosCommand();
	}
});
