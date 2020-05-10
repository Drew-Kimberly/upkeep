import {getRepositoryDefinitions} from '../repository-definition';
import {IRepository} from './types';
import {createRepository} from './createRepository';

export const getRepositories = async (
  definitionsPath: string
): Promise<IRepository[]> => {
  const definitions = await getRepositoryDefinitions(definitionsPath);
  return definitions.map(createRepository);
};