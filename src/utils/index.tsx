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
