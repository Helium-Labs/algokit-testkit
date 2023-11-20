import { algod, indexer, kmd } from './client'
import { getFunderAccount } from './wallet'
import type algosdk from 'algosdk'

export * from './client'
export * from './wallet'
export * from './transact'

interface Testkit { algod: algosdk.Algodv2, indexer: algosdk.Indexer, kmd: algosdk.Kmd, funder: algosdk.Account }
export async function getAlgokitTestkit (): Promise<Testkit> {
  const funder = await getFunderAccount()
  return {
    algod,
    indexer,
    kmd,
    funder
  }
}
