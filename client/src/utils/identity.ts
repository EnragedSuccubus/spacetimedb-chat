import type { User } from '../module_bindings';

export function userIdentityToString(user: User, truncate = false): string {
    let identityString: string = user.identity.toHexString();

    if (truncate) {
        identityString = identityString.slice(0, 8);
    }

    return identityString;
}
