import { defineModule } from '@directus/extensions-sdk';
import ModuleComponent from './module.vue';
export default defineModule({
	id: 'enquiries_portal',
	name: 'Enquiries Portal',
	icon: 'demography',
	routes: [
		{
			path: '',
			component: ModuleComponent,
		},
	],
});
