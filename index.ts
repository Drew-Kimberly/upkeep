import {
  PackageManagers,
  RepositoryDefinition,
} from './src/repository-definition';
import {
  createRepositoryLoader,
  FailedLoadHandler,
} from './src/repository-loader';
import {createMemorySource} from './src/repository-loader/memory-source';
import {createDelayedMemorySource} from './src/repository-loader/__fixtures__/delayed-memory-source';
import {createErrorSource} from './src/repository-loader/__fixtures__/error-source';
import {loggerFactory} from './src/logger';

const createDefinitionFixture = (id: string): RepositoryDefinition => ({
  id: `repository-${id}`,
  name: `Repository Fixture ${id}`,
  packageManager: PackageManagers.NPM,
  gitRepository: {
    url: 'testing',
  },
  emails: [],
  securityAlert: {
    enabled: true,
  },
  dependencyReport: {
    enabled: true,
  },
});

const createMockDefinitions = (
  numDefinitions: number,
  offset = 0
): RepositoryDefinition[] => [
  ...new Array(numDefinitions)
    .fill(0)
    .map((val, idx) => createDefinitionFixture((idx + 1 + offset).toString())),
];

(async () => {
  const logger = loggerFactory.createLogger();

  const source1 = createDelayedMemorySource(createMockDefinitions(10));
  const source2 = createMemorySource(createMockDefinitions(10, 100));

  const onFailedLoad: FailedLoadHandler = (source, e) =>
    logger.error(`An error occurred loading from source ${source.id()}`, e);
  const repositoryLoader = createRepositoryLoader(
    [source1, source2],
    onFailedLoad,
    {limit: 10}
  );

  repositoryLoader.subscribe(repo => logger.info(repo.id()));
})();

// Security alert.
// (async () => {
//   const logger = loggerFactory.createLogger();
//   const git: IGit = createGitService(createExecutable, loggerFactory);
//
//   const definitionsPath = path.join(__dirname, 'repositories');
//   const destinationPath = path.join(__dirname, 'gitRepos/');
//   const repositories = await getRepositories(definitionsPath, destinationPath);
//
//   for (const repo of repositories) {
//     if (!(await git.clone(repo))) {
//       continue;
//     }
//
//     if (repo.isSecurityAlertEnabled()) {
//       const auditCmd = `cd ${repo.cloneDestination()} && npm audit --json`;
//       const audit: Executable = createExecutable(auditCmd);
//       const auditResult: IExecutionResult = await audit();
//
//       if (isExecutionSuccessful(auditResult) || auditResult.code === 1) {
//         logger.info(
//           `Results for ${repo.name()}`,
//           JSON.parse(auditResult.output).metadata.vulnerabilities
//         );
//       } else {
//         logger.error(
//           `An error occurred for ${repo.name()}`,
//           auditResult.error,
//           auditResult.output
//         );
//       }
//     }
//   }
// })();

export * from './src';
