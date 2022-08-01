/**
 * @name Mutation/sendVerifyAccountEmail
 * @summary resolver for the sendResetAccountPasswordEmail GraphQL mutation
 * @param {Object} _ - unused
 * @param {Object} args.input - an object of all mutation arguments that were sent by the client
 * @param {String} args.input.email - email of account to reset
 * @param {String} [args.input.clientMutationId] - An optional string identifying the mutation call
 * @param {Object} context - an object containing the per-request state
 * @returns {Object} r=sendResetAccountPasswordEmailPayload
 */
 export default async function sendVerifyAccountEmail(_, { input }, context) {
    const { email,url, clientMutationId, language  = null } = input;
    const emailAddress = await context.mutations.sendVerifyAccountEmail(context, {
      email,
      url,
      language
    });
  
    return {
      email: emailAddress,
      clientMutationId
    };
  }
