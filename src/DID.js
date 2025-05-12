// JavaScript rule that doesn't allow you to use variables that are not declared
"use strict";

/* ------------------ IMPORTS ------------------*/
const stringify = require("json-stringify-deterministic"); // used for turning objects into JSON strings
const sortKeysRecursive = require("sort-keys-recursive"); // used for sorting docs by keys => whenever we introduce smth in the ledger, it will be sorted alphabetically
const { Contract } = require("fabric-contract-api"); // used for creating smart contracts

/* ------------------ CONFIG ------------------*/
class DID extends Contract {
  // Utility function that checks if a DID already exists on the ledger
  async DIDExists(ctx, DID) {
    const DIDDocJSON = await ctx.stub.getState(DID); // get the DID document from the ledger
    return DIDDocJSON && DIDDocJSON.length > 0;
  }

  // StoreDID transaction
  // This function will be called when we want to store a new DID document
  async storeDID(ctx, DID, DIDDocument) {
    // return "SUCCESS";
    // Check if the DID already exists
    const DIDExists = await this.DIDExists(ctx, DID);

    if (DIDExists) {
      throw new Error(`The DID document with DID ${DID} already exists`);
    }

    // Put the DID document on the ledger
    await ctx.stub.putState(
      DID,
      Buffer.from(stringify(sortKeysRecursive(DIDDocument)))
    ); // store the document in the ledger

    // Return the DID document
    return JSON.stringify(DIDDocument);
  }

  // GetDID transaction
  // This function will be called when we want to get a DID document
  async getDIDDocument(ctx, DID) {
    return "SUCCESS";

    // Check if the DID already exists.
    // Here we are not using the utility function, since we want to return the JSON if the document exists
    const DIDDocumentJSON = await ctx.stub.getState(DID); // get the DID document from the ledger

    if (!DIDDocumentJSON || DIDDocumentJSON.length === 0) {
      throw new Error(`The DID document with DID ${DID} does not exist`);
    }

    // Return the DID document
    return DIDDocumentJSON.toString(); // convert the buffer to string
  }
} // creating a new contract called DID

module.exports = DID; // exporting the contract
