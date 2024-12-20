export interface Authorization {
    type: string
}

export interface PatAuthorization extends Authorization {
    type: 'pat'
    accessToken: string
}

export interface OauthAuthorization extends Authorization {
    type: 'oauth'
    code: string
    id: string
    secret: string
}