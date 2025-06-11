import {Tenant} from '@lib/models/tenant';
import {TenantLocation} from '@lib/models/tenant-location';

const TEST_TENANT_1 = new Tenant(
	'191e84db-b52f-46f9-bd53-b0b68241b0d2',
	'Elaut Group',
	new Date(),
	new Date()
);

const TEST_TENANT_1_LOCATION_1 = new TenantLocation(
	'e5a0ec4e-e27f-4e41-9955-8d6e169c58f6',
	{
		id: TEST_TENANT_1.id,
		name: TEST_TENANT_1.name,
	},
	'Test Location 1',
	'passtraat 223',
	'Sint-Niklaas',
	'Oost-Vlaanderen',
	'9100',
	'Belgium',
	'unknown',
	'',
	new Date(),
	new Date(),
	true
);

export {TEST_TENANT_1, TEST_TENANT_1_LOCATION_1};
