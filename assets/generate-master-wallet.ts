import * as anchor from "@project-serum/anchor";
import * as fs from 'fs';

// Generate a new keypair
const keypair = anchor.web3.Keypair.generate();

// Save the secret key to master.json
fs.writeFileSync(
    './app_v2/wallet/master.json',
    JSON.stringify(Array.from(keypair.secretKey))
);

console.log('Generated new master wallet:');
console.log('Public key:', keypair.publicKey.toString()); 