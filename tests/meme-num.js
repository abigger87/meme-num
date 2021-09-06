const anchor = require('@project-serum/anchor');
const assert = require('assert');

describe('meme-num', () => {

  // ** Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  it('Is initialized!', async () => {
    // ** Load the MemeNum program
    const program = anchor.workspace.MemeNum;

    // ** Generates a keypair
    const memeNumAccount = await anchor.web3.Keypair.generate();

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

    // ** Get Meme Account Number and assert == 420
    const memeNumAccountData = await program.account.memeNumAccount.fetch(memeNumAccount.publicKey);
    assert(memeNumAccountData.memeNum.eq(new anchor.BN(420)));
  });
});
