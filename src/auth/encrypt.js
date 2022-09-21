const{ createMessage, encrypt, readKey }=require('openpgp');



 async function mencrypt(keyId,pubKey,number,cvv) {
  let  CardDetails ={
       "number": number,    // required when storing card details
        "cvv": cvv       // required when cardVerification is set to cvv
       }
 

    const decodedPublicKey = await readKey({ armoredKey: atob(pubKey) })
    const message = await createMessage({ text: JSON.stringify(CardDetails)})
    return encrypt({
      message,
      encryptionKeys: decodedPublicKey,
    }).then((ciphertext) => {
       return data={encryptedMessage: btoa(ciphertext),keyId};
    
    })
  }
    

  module.exports=mencrypt;