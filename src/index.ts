import { Secp256k1KeyIdentity as S256 } from '@dfinity/identity-secp256k1';
import { mnemonicToSeedSync, generateMnemonic } from 'bip39';
import { HDKey } from 'ethereum-cryptography/hdkey.js';
import { AccountIdentifier } from '@dfinity/ledger-icp';
import { Principal } from '@dfinity/principal';

// Create an SVG avatar from a principal or account id
export function avatar(input: { principal: string } | { aid: string }): string {
  let account_id: string = '';

  if ('principal' in input) {
    // handle principal case
    account_id = AccountIdentifier.fromPrincipal({ principal: Principal.fromText(input.principal) }).toHex();
  } else if ('aid' in input) {
    // handle aid case
    account_id = input.aid;
  } else {
    throw new Error('Either "principal" or "aid" must be provided.');
  }

  const svg = `<svg viewBox="0 0 100 100" width="100%" height="100%"><defs><radialGradient id="a" cx="50%" cy="50%" r="50%" fx="50%" fy="50%"><stop offset="9%" style="stop-color:#${account_id.substring(
    0,
    6,
  )}"/><stop offset="35%" style="stop-color:#${account_id.substring(
    6,
    12,
  )}"/><stop offset="65%" style="stop-color:#${account_id.substring(
    account_id.length - 12,
    account_id.length - 6,
  )}"/><stop offset="91%" style="stop-color:#${account_id.substring(
    account_id.length - 6,
  )}"/></radialGradient></defs><circle cx="50" cy="50" r="50" fill="url(#a)"/></svg>`;

  return svg;
}

// convert a principal to account id
export function p2Aid(principal: Principal | string): string {
  const principalInstance = typeof principal === 'string' ? Principal.fromText(principal) : principal;
  return AccountIdentifier.fromPrincipal({ principal: principalInstance }).toHex();
}

// create a new principal and return the seed phrase
export function generatePrincipal(seed_phrase?: string): {identity:Secp256k1KeyIdentity, seed_phrase:string} {
  const mnemonic = seed_phrase ? seed_phrase : generateMnemonic()
  const seed = mnemonicToSeedSync(mnemonic);
  const privateKey = HDKey.fromMasterSeed(seed).derive("m/44'/223'/0'/0/0").privateKey as Uint8Array;
  const identity = S256.fromSecretKey(privateKey);

  return {identity: identity, seed_phrase: mnemonic};
};

export type Secp256k1KeyIdentity = S256;