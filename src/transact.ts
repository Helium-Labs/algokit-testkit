import algosdk, { makePaymentTxnWithSuggestedParamsFromObject } from 'algosdk'
import { algod } from './client'
import { getAlgokitTestkit } from '.'

export const fundAccount = async (accountAddr: string, amount: number): Promise<void> => {
  const testkit = await getAlgokitTestkit()
  const suggestedParams = await algod.getTransactionParams().do()
  const txn = makePaymentTxnWithSuggestedParamsFromObject({
    from: testkit.funder.addr,
    to: accountAddr,
    amount,
    note: new Uint8Array(Buffer.from('Funded by algokit-tester')),
    suggestedParams
  })
  const signedTxn = txn.signTxn(testkit.funder.sk)
  await algod.sendRawTransaction(signedTxn).do()
  await algosdk.waitForConfirmation(algod, txn.txID(), 3)
}
