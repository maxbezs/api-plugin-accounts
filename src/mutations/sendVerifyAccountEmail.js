import _ from "lodash";
import SimpleSchema from "simpl-schema";
import ReactionError from "@reactioncommerce/reaction-error";
import sendVerificationEmail from "../util/sendVerificationEmail";


const inputSchema = new SimpleSchema({
  email: String,
  url: String,
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
export default async function sendVerifyAccountEmail(context, input) {
  inputSchema.validate(input);
  const { collections } = context;
  const { Accounts } = collections;
  const {
    email,
    url,
  } = input;

  const caseInsensitiveEmail = email.toLowerCase();

  const account = await Accounts.findOne({ "emails.address": caseInsensitiveEmail });
  if (!account) throw new ReactionError("not-found", "Account not found");

  await sendVerificationEmail(context, {bodyTemplate: "accounts/verifyEmail",userId: account.userId, url,});

  return email;
}
