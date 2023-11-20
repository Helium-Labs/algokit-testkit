import algosdk, { Indexer } from 'algosdk'

const base = 'http://localhost'
const token = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'

// Algod
const algodPort = 4001
export const algod = new algosdk.Algodv2(token, base, algodPort)

// Kmd
const kmdPort = 4002
export const kmd = new algosdk.Kmd(token, base, kmdPort)

// Indexer
const indexerPort = 8980
export const indexer = new Indexer(token, base, indexerPort)

export function getAlgokitClients (): { algod: algosdk.Algodv2, kmd: algosdk.Kmd, indexer: Indexer } {
  return { algod, kmd, indexer }
}
