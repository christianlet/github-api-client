import { Octokit } from '@octokit/rest';

export interface AuthorizationInterface {
    generate(): Promise<Octokit>
}