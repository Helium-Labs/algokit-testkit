import algosdk from 'algosdk'
import { algod, kmd } from './client'

async function getKmdWalletAccount (
  walletAccount: {
    name: string
    predicate?: (account: Record<string, any>) => boolean
  },
  algod: algosdk.Algodv2,
  kmd: algosdk.Kmd
): Promise<algosdk.Account | undefined> {
  const { name, predicate } = walletAccount

  // List all wallets and find the one with the matching name
  const wallets = await kmd.listWallets()
  const wallet = wallets.wallets.find((w: any) => w.name === name)

  // Return undefined if no matching wallet is found
  if (wallet === undefined) {
    return undefined
  }

  // Initialize wallet handle
  const walletHandle = (await kmd.initWalletHandle(wallet.id, '')).wallet_handle_token

  // List all keys in the wallet
  const keyIds = (await kmd.listKeys(walletHandle)).addresses

  // Find the first account that matches the predicate, if provided
  for (const key of keyIds) {
    const account = await algod.accountInformation(key).do()

    if (!predicate || predicate(account)) {
      const accountKey = (await kmd.exportKey(walletHandle, '', key)).private_key
      const accountMnemonic = algosdk.secretKeyToMnemonic(accountKey)
      return algosdk.mnemonicToSecretKey(accountMnemonic)
    }
  }

  // Return undefined if no matching account is found
  return undefined
}

export async function getFunderAccount (): Promise<algosdk.Account> {
  return await getKmdWalletAccount(
    { name: 'unencrypted-default-wallet', predicate: (a) => a.status !== 'Offline' && a.amount > 1_000_000_000 },
    algod,
    kmd
  )
}
