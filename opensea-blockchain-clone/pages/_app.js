import '../styles/globals.css'
import {ThirdwebWeb3Provider} from '@3rdweb/hooks'


// chain 4 represent Rinkeby test eth network
// the injected connector is a web3 connection method used by Metamask
const supportedChainIds = [4]
const connectors = {
  injected: {},
}


function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
