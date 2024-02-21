import { test, request, expect } from '@playwright/test';

const randId = Math.floor(Math.random() * 1000);

const petBody = {
	id: randId,
	category: {
		id: randId,
		name: 'string',
	},
	name: `doggie ${randId}`,
	photoUrls: ['string'],
	tags: [
		{
			id: randId,
			name: 'string',
		},
	],
	status: 'available',
};

const petUpd = {
	id: randId,
	category: {
		id: randId,
		name: 'string',
	},
	name: `doggie doggie`,
	photoUrls: ['string'],
	tags: [
		{
			id: randId,
			name: 'string',
		},
	],
	status: 'not available',
};

test('POST a pet', async ({ request }) => {
	const postPet = await request.post('/v2/pet', {
		data: {
			...petBody,
		},
	});

	const responseBody = await postPet.json();
	expect(postPet.status()).toBe(200);
	console.log(responseBody);
});

test('Get pet by id', async ({ request }) => {
	const getPet = await request.get(`/v2/pet/${randId}`);

	const getPetBody = await getPet.json();

	console.log(getPetBody);

	expect(getPet.status()).toBe(200);
});

test('PUT an update to the pet', async ({ request }) => {
	const petUpdate = await request.post(`/v2/pet/`, {
		data: {
			...petUpd,
		},
	});

	const updateRespBody = await petUpdate.json();

	console.log(updateRespBody);

	expect(petUpdate.status()).toBe(200);
});
