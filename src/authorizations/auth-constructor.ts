import { Authorization } from '../types/Authorizations'
import { AuthorizationInterface } from './authorization-interface'

export type AuthorizationConstructor = new (auth: Authorization) => AuthorizationInterface