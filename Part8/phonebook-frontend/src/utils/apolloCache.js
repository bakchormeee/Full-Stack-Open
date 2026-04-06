import { ALL_PERSONS } from "../queries";

export const addPersonToCache = (cache, personToAdd) => {
  cache.updateQuery({ query: ALL_PERSONS }, ({ allPersons }) => {
    //some is a method that looks whether the person is already avaliable in the cache, returning a boolean
    const personExists = allPersons.some(
      (person) => person.id === personToAdd.id,
    );

    if (personExists) {
      return { allPersons };
    }

    return {
      allPersons: allPersons.concat(personToAdd),
    };
  });
};
