import { Octokit } from '@octokit/rest';
import { AuthorizationInterface } from './authorization-interface';
import { AuthorizationConstructor } from './auth-constructor';
import { Oauth } from './oauth';
import { PersonalAccessToken } from './personal-access-token';
import { Authorization, OauthAuthorization, PatAuthorization } from '../types/Authorizations'

export class Factory {
    protected authMap: Map<string, any>

    constructor(){
        this.authMap = this.setMap()
    }

    public async generate(auth: PatAuthorization | OauthAuthorization): Promise<Octokit> {
        if(!['pat', 'oauth'].includes(auth.type)) {
            throw new Error(`Authorization type is invalid: ${auth.type}`);
        }

        const type = this.getAuthType(auth.type)
        const authObject = this.create(type, auth)

        return authObject.generate()
    }

    protected setMap(): Map<string, any> {
        return new Map<string, any>([
            ['oauth', Oauth],
            ['pat', PersonalAccessToken]
        ])
    }

    protected getAuthType(context: string): AuthorizationConstructor {
        if(!this.authMap.has(context)) {
            throw new Error(`Auth: ${context} behavior not defined`)
        }

        return this.authMap.get(context)
    }

    protected create(
        ctor: AuthorizationConstructor,
        auth: Authorization
      ): AuthorizationInterface {
        return new ctor(auth)
      }
}