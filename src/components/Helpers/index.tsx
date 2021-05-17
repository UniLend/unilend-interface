export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.substring(1);

  export function shortenAddress(address: string, chars = 4): any {
    if (address) {
      const parsed = address;
      // if (!parsed) {
      //   throw Error(`Invalid 'address' parameter '${address}'.`)
      // }
      return `${parsed.substring(0, chars + 2)}...${parsed.substring(
        42 - chars
      )}`;
    }
  }

  export const copyToClipboard = (address: string) => {
    var textField = document.createElement("textarea");
    textField.innerText = address;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

  export const getAddressUrl = (activeNetWork: string, hash: string) => {
    let baseURL = `etherscan.io/address/${hash}`;
    let bscBaseURL = `bscscan.com/address/${hash}`;
    switch (activeNetWork) {
      case "Mainnet":
        return `https://${baseURL}`;
      case "Binance Testnet":
        return `https://testnet${bscBaseURL}`;
      case "Binance Mainnet":
        return `https://${bscBaseURL}`;
      default:
        return `https://${activeNetWork.toLowerCase()}.${baseURL}`;
    }
  };
  
  export const getTransactionHashUrl = (activeNetWork: string, hash: any) => {
    let baseURL = `etherscan.io/tx/${hash}`;
    let bscBaseURL = `bscscan.com/tx/${hash}`;
    switch (activeNetWork) {
      case "Mainnet":
        return `https://${baseURL}`;
      case "Binance Testnet":
        return `https://testnet.${bscBaseURL}`;
      case "Binance Mainnet":
        return `https://${bscBaseURL}`;
      default:
        return `https://${activeNetWork.toLowerCase()}.${baseURL}`;
    }
  };
