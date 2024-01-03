import { AccountIdentifier } from "@dfinity/ledger-icp";
import { Principal } from "@dfinity/principal";

export function avatar(input: { principal: string } | { aid: string }): string {

  let account_id : string = ""  
  
  if ('principal' in input) {
    // handle principal case
    account_id = AccountIdentifier.fromPrincipal({ principal: Principal.fromText(input.principal) }).toHex();
  } else if ('aid' in input) {
    // handle aid case
    account_id = input.aid;
  } else {
    throw new Error('Either "principal" or "aid" must be provided.');
  }

  // Common avatar creation logic
  const svg = `<svg height="100" width="100"><defs><radialGradient id="a" cx="50%" cy="50%" r="50%" fx="50%" fy="50%"><stop offset="9%" style="stop-color:#${account_id.substring(0,6)}"/><stop offset="35%" style="stop-color:#${account_id.substring(6,12)}"/><stop offset="65%" style="stop-color:#${account_id.substring(account_id.length - 12, account_id.length - 6)}"/><stop offset="91%" style="stop-color:#${account_id.substring(account_id.length - 6)}"/></radialGradient></defs><circle cx="50" cy="50" r="50" fill="url(#a)"/></svg>`

  return svg;
}
