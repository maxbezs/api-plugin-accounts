import _ from "lodash";
import SimpleSchema from "simpl-schema";
import ReactionError from "@reactioncommerce/reaction-error";
import Logger from "@reactioncommerce/logger";
import jwt from 'jsonwebtoken';

const inputSchema = new SimpleSchema({
  token: String,
  email: String,
});

/**
 * @name accounts/verifyJsonToken
 * @summary Checks to see if a user exists for a given email, and sends a password password if user exists
 * @param {Object} context - GraphQL execution context
 * @param {Object} input - Necessary input for mutation. See SimpleSchema.
 * @param {String} input.email - email of account to verify
 *  * @param {String} input.token - jwt token to check
 * @return {Promise<Object>} with email address if found
 */
export default async function verifyJsonToken(context, input) {
  inputSchema.validate(input);
  const { collections } = context;
  const { Accounts } = collections;
  const {
    token,
    email
  } = input;

  const result = null;

  const caseInsensitiveEmail = email.toLowerCase();
  const account = await Accounts.findOne({ "emails.address": caseInsensitiveEmail });


  jwt.verify(token, `${account.userId}`, async function(err, decoded) {
    if (err) {
        Logger.error(err);
        return {verified: false, message: err};
    }
    else {
        Logger.info("success");
        const account = await Accounts.findOneAndUpdate({ "emails.address": caseInsensitiveEmail }, {$set: {"emails.verified": true}, returnNewDocument : true } );
        if (!account) throw new ReactionError("not-found", "Account not found");
        return {verified: false, message:"Email verifified successfully"};
    }
  });

  try {
    const decoded = jwt.verify(token, account.userId);
    if (decoded) {
      const account = await Accounts.findOneAndUpdate({ "emails.address": caseInsensitiveEmail }, {$set: {"emails.0.verified": true}} );
      if (!account) throw new ReactionError("not-found", "Account not found");
      return {verified: true, message:"Email verified successfully"};
    }
   }
   catch (err) {  
    Logger.error(err);
    return {verified: false, message: err.message}; 
  }
}
