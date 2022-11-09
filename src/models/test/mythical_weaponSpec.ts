import { weapon, MythicalWeaponStore } from '../mythical_weapon';
const store = new MythicalWeaponStore();

describe('mythical wepons model', () => {
  it('should have an index', () => {
    expect(store.index).toBeDefined();
  });

  it('index should return a list', async () => {
    const result = await store.index();
    expect(result).toEqual([]);
  });
});
