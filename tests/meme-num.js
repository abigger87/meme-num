const anchor = require('@project-serum/anchor');
const assert = require('assert');

describe('meme-num', () => {

  // ** Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider);

  it('Is initialized!', async () => {
    // ** Load the MemeNum program
    const program = anchor.workspace.MemeNum;

    // ** Generates a keypair
    const memeNumAccount = anchor.web3.Keypair.generate();

    // ** Initialize
    const tx = await program.rpc.initialize({
      accounts: {
        memeNumAccount: memeNumAccount.publicKey,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY,
      },
      instructions: [
        await program.account.memeNumAccount.createInstruction(memeNumAccount)
      ],
      signers: [memeNumAccount]
    });

    const memeNumAccountData = await program.account.memeNumAccount(memeNumAccount.publicKey);
    assert(memeNumAccountData.memeNum.eq(new anchor.BN(420)));
  });
});
