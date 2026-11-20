import { RuleConfigSeverity } from '@commitlint/types';

/**
 * Conventional Commits, avec les types et les scopes de CONTRIBUTING.md.
 * @type {import('@commitlint/types').UserConfig}
 */
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      RuleConfigSeverity.Error,
      'always',
      [
        // apps
        'application',
        'front',
        'gateway',
        'identity',
        'job-runner',
        'matching',
        'offer',
        'profile',
        // packages
        'contracts',
        'eslint',
        'tsconfig',
        'utils',
        // transverses
        'deps',
        'docker',
        'github',
        'repo',
      ],
    ],
    'subject-case': [RuleConfigSeverity.Error, 'always', 'lower-case'],
    'type-enum': [
      RuleConfigSeverity.Error,
      'always',
      ['build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'test'],
    ],
  },
};
