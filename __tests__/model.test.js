const Dog = require('../lib/dog');
const mongoose = require('mongoose');

describe('Dog model', () => {
  it('validates all schema properties', () => {
    const dogData = {
      breed: 'Alaskan Klee Kai',
      nicknames: ['AKK', 'Klee Kai', 'Miniature Alaskan Husky', 'Mini Husky'],
      size: ['small', 'medium'],
      appearance: {
        pattern: 'bicolor',
        color: 'grey and white'
      },
      weight: 16,
      purebred: true
    };
  
    const dog = new Dog(dogData);
    const errors = dog.validateSync();
    expect(errors).toBeUndefined();
  
    const json = dog.toJSON();
  
    expect(json).toEqual({
      ...dogData,
      _id: expect.any(Object),
    });
  });

  it('validates required properties', () => {
    const dogData = {};
    const dog = new Dog(dogData);

    const { errors } = dog.validateSync();
    expect(errors.breed.kind).toBe('required');
    expect(errors['appearance.color'].kind).toBe('required');
    expect(errors.weight.kind).toBe('required');
  })
  
});