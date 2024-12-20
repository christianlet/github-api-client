import { createOAuthAppAuth, createOAuthUserAuth } from '@octokit/auth-oauth-app';
import { Octokit } from '@octokit/rest'
import { AuthorizationInterface } from './authorization-interface';
import { OauthAuthorization } from '../types/Authorizations'

export class Oauth implements AuthorizationInterface {
    protected code: string
    protected id: string
    protected secret: string

    constructor(auth: OauthAuthorization) {
        this.code = auth.code

        if(auth.id && auth.secret) {
            this.id   = auth.id
            this.secret = auth.secret
        } else {
            throw new Error("App credentials not set");
        }
    }

    public async generate() {
        const appOctokit = new Octokit({
            authStrategy: createOAuthAppAuth,
            auth: {
                clientId: this.id,
                clientSecret: this.secret
            }
        })

        return await appOctokit.auth({
            type: 'oauth-user',
            code: this.code,
            factory: (options: any) => {
                return new Octokit({
                    authStrategy: createOAuthUserAuth,
                    auth: options
                })
            }
        }) as Octokit
    }
}
