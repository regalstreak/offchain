# Offchain
>Built at [InOut 6.0](http://hackinout.co), India's Largest Community Hackathon.

What if blockchain transactions could be offline?

## The problem
Internet connectivity is one of the major issues in most areas. To make decentralized transactions possible in such situations, we have built a platform, more of an SDK, which makes Ethereum transactions offline. This would be helpful in most of the situations in areas having no access to internet. Imagine if you could use or even interact with a DApp without internet. We basically use SMS to interact with Etherum in our case. So, we send a signed transaction to the node which is connected to the internet through SMS. As the transaction is signed on the user's device itself and not the middleware node, it is secure. More info of this is given in the Challenges section.

## The challenges
One of the major problems we ran into was regarding how to sign a transaction. Now for securing and keeping it as decentralised as it should be, we did not want to send the private key to a server and sign it through there as it might compromise security and be probable to data breaches. We implemented something that will send a signed transaction via SMS to a node which would be connected to the internet to get it on the blockchain.

Speaking of SMS, we ran into hell loads of problems getting a proper SMS API. The existing ones like Twillio and the rest weren't usable in India to their full extent. TRAI regulations do not permit the usage of marketing SMS after 9pm and most of our development time was at night. Also, for transactional SMS, we needed a registered company and we had to get our accounts verified by the government of something, so it was a bummer. We then created a middleware kinda hacky solution to recieve an SMS to an intermediate phone acting as a node which has internet, and that will further send a POST request to our server, which in turn completes the transaction.

Also, SMS has a limit of 160 characters, so we had to break down the original buffer into chunks and send it. The original string was around 390 characters consisting of some JSON data.

## Tech
Here is a list of the technologies we used for building Offchain:
* [Ethereum](https://ethereum.org)
* [web3](https://github.com/ethereum/web3.js/)
* [ganache](https://www.trufflesuite.com/ganache)
* [node.js](https://nodejs.org/en/)
* [react-native](https://facebook.github.io/react-native/)
* [Matic Network](http://matic.network)