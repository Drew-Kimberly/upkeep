import {Maybe} from '../util';

export const parseRepositoryId = (
  repositoryDefinitionPath: string
): Maybe<string> => {
  const matches = repositoryDefinitionPath.match(/.+\/(.+)\.repository\.yml$/);
  return matches && matches.length > 1 ? matches[1] : undefined;
};