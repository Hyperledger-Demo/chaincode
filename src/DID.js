// JavaScript rule that doesn't allow you to use variables that are not declared
"use strict";

/* ------------------ IMPORTS ------------------*/
const stringify = require("json-stringify-deterministic"); // used for turning objects into JSON strings
const sortKeysRecursive = require("sort-keys-recursive"); // used for sorting docs by keys => whenever we introduce smth in the ledger, it will be sorted alphabetically
const { Contract } = require("fabric-contract-api"); // used for creating smart contracts

/* ------------------ CONFIG ------------------*/
class DID extends Contract {
  // StoreDID transaction
  // This function will be called when we want to store a new DID document
  async storeDID(ctx, DID, document) {}

  // GetDID transaction
  // This function will be called when we want to get a DID document
  async getDID(ctx, DID) {}
} // creating a new contract called DID

module.exports = DID; // exporting the contract
