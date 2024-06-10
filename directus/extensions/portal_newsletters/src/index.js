import { defineModule } from '@directus/extensions-sdk';
import ModuleComponent from './module.vue';
export default defineModule({
	id: 'newsletter_portal',
	name: 'Newsletter Portal',
	icon: 'send',
	routes: [
		{
			path: '',
			component: ModuleComponent,
		},
	],
});
