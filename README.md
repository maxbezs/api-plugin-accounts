## Agreements <br/>

- - - -
In Type `Account` add object field `agreements:` with `Agreements` objects.<br/>
In `Agreements` fields:<br/>
* termAndConditions: Boolean
* isAdult: Boolean
* personalDataToOtherCompanies: Boolean
* personalDataToPromotionalOffers: Boolean <br/>

in `updateAccount` also you can update All agreements<br/>
- - - - 
With correct verification link <br/>
[src/util/sendVerificationEmail](https://github.com/maxbezs/api-plugin-accounts/blob/main/src/util/sendVerificationEmail.js)
I just add ${language}: <br/>
`confirmationUrl: ${url}/verify/${token}` (☞ﾟヮﾟ)☞ `confirmationUrl: ${url}/${language + "?"}/verify/${token}`
#   d f g h j  
 #   d f g h j  
 