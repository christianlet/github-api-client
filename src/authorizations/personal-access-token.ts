import { Octokit } from '@octokit/rest'
import { AuthorizationInterface } from './authorization-interface';
import { PatAuthorization } from '../types/Authorizations'

export class PersonalAccessToken implements AuthorizationInterface {
    protected accessToken: string

    constructor(auth: PatAuthorization) {
        if(auth.accessToken) {
            this.accessToken = auth.accessToken
        } else {
            throw new Error("Missing token");
        }
    }
    /**
     * generate
     */
    public async generate() {
        return new Octokit({
            auth: this.accessToken
        })
    }
}
