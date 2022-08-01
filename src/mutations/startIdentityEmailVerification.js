import _ from "lodash";
import SimpleSchema from "simpl-schema";
import ReactionError from "@reactioncommerce/reaction-error";
import sendVerificationEmail from "../util/sendVerificationEmail";
import jwt from 'jsonwebtoken';

const inputSchema = new SimpleSchema({
  userId: String,
});

/**
 * @name accounts/sendResetAccountPasswordEmail
 * @summary Checks to see if a user exists for a given email, and sends a password password if user exists
 * @param {Object} context - GraphQL execution context
 * @param {Object} input - Necessary input for mutation. See SimpleSchema.
 * @param {String} input.email - email of account to reset
 * @param {String} input.url - url to use for password reset
 * @return {Promise<Object>} with email address if found
 */
export default async function startIdentityEmailVerification(context, input) {
  inputSchema.validate(input);
  const { collections } = context;
  const { Accounts } = collections;
  const {
    userId
  } = input;

  // const caseInsensitiveEmail = email.toLowerCase();

  const account = await Accounts.findOne({userId});
  
  const email = account.emails[0].address;
  console.log(account, email);
  const token = jwt.sign({data: 'Token Data'}, `${userId}`, { expiresIn: '10m' } );
  
  if (!account) throw new ReactionError("not-found", "Account not found");

  return {email, token};
}
