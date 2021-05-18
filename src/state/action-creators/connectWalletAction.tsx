import web3 from "ethereum/web3";
import { Dispatch } from "redux";
import { assetAddress, collateralAddress } from "../../ethereum/contracts";
import { UnilendLBFactory } from "../../ethereum/contracts/UnilendLB";
import { web3Service } from "../../ethereum/web3Service";
import { ActionType } from "../action-types";
import { Action } from "../actions/connectWalletA";
import CWweb3 from "ethereum/connectWalletWeb3";
import { maticWeb3 } from "ethereum/maticWeb3";
import { fm, formaticWeb3 } from "ethereum/formatic";
import { CoinbaseProvider, CoinbaseWeb3 } from "ethereum/coinbaseWeb3";
import { Wallet } from "components/Helpers/Types";
import { toFixed } from "Helpers";

export const setSelectedNetworkId = (selectedNetworkId: number) => ({
  type: ActionType.SELECTED_NETWORK_ID,
  networkId: selectedNetworkId,
});

export const checkNet = (net: any) => {
  switch (net) {
    case 1:
      return "Mainnet";
    case 42:
      return "Kovan";
    case 3:
      return "Ropsten";
    case 4:
      return "RinkeBy";
    case 5:
      return "Goerli";
    case 56:
      return "Binance Mainnet";
    case 97:
      return "Binance Testnet";
    case 80001:
      return "Mumbai Testnet";
    case 137:
      return "Matic Mainnet";
    default:
      return "Localhost";
  }
};

export const networkSwitchHandling = (currentProvider?: any, id?: any) => {
  return async (dispatch: Dispatch<Action>) => {
    await currentProvider.eth.net.getId().then((res: any) => {
      let accsName = checkNet(res);
      dispatch({
        type: ActionType.ACTIVE_NETWORK,
        payload: accsName,
        networkId: res,
      });
    });

    if (id) {
      let accsName = checkNet(id);
      dispatch({
        type: ActionType.ACTIVE_NETWORK,
        payload: accsName,
        networkId: id,
      });
    }
  };
};

const metamaskEventHandler = (dispatch: any, provider: any) => {
  provider.on("chainChanged", (chainId: any) => {
    window.location.reload();
  });
  provider.on("accountsChanged", function (accounts: string) {
    dispatch({
      type: ActionType.CONNECT_WALLET_SUCCESS,
      payload: [accounts[0]],
    });
  });
  provider.on("message", (message: any) => {
    // console.log(message);
  });
  provider.on("disconnect", (code: number, reason: string) => {
    dispatch({
      type: ActionType.WALLET_DISCONNECT,
    });
  });
};

export const getAccountBalance = (
  selectedAccount: string,
  currentProvider: any,
  networkId?: any
) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      let balance: any;
      if (networkId && networkId === 2) {
        balance = await (window as any).BinanceChain.request({
          method: "eth_getBalance",
          params: [selectedAccount, "latest"],
        });
      } else {
        balance = await web3Service.getBalance(selectedAccount);
        if (currentProvider === CoinbaseWeb3) {
          balance = await currentProvider.eth.getBalance(selectedAccount);
        }
      }
      let ethBal = web3Service.getWei(balance, "ether");
      let ethBalDeci = toFixed(parseFloat(ethBal), 3);
      dispatch({
        type: ActionType.ACCOUNT_BALANCE_SUCCESS,
        payload: ethBalDeci,
        fullAccountBalance: ethBal,
      });
    } catch (e) {
      dispatch({
        type: ActionType.ACCOUNT_BALANCE_SUCCESS,
        payload: "",
        fullAccountBalance: "",
      });
      dispatch({
        type: ActionType.WALLET_DISCONNECT,
      });
    }
  };
};

const handleMetamask = (accounts: any, dispatch: any, currentProvider: any) => {
  if (
    window &&
    !(window as any).ethereum.selectedAddress &&
    accounts.length <= 0
  ) {
    (window as any).ethereum
      .enable()
      .then(() => {
        web3Service
          .getAccounts()
          .then((res: any) => {
            dispatch({
              type: ActionType.CONNECT_WALLET_SUCCESS,
              payload: [...res],
            });
            getAccountBalance(res[0], currentProvider);
            metamaskEventHandler(dispatch, (window as any).ethereum);
          })
          .catch((e: any) => {
            dispatch({
              type: ActionType.CONNECT_WALLET_ERROR,
              payload: e.message,
            });
          });
      })
      .catch((e: any) => {
        dispatch({
          type: ActionType.CONNECT_WALLET_ERROR,
          payload: e.message,
        });
      });
  } else {
    metamaskEventHandler(dispatch, (window as any).ethereum);
    dispatch({
      type: ActionType.CONNECT_WALLET_SUCCESS,
      payload: [...accounts],
    });
  }
};

async function handleWalletConnect(
  currentProviders: any,
  networkType: any,
  wallet: Wallet,
  dispatch: Dispatch<Action>
) {
  try {
    let accounts: any;
    let connectedWallet = JSON.stringify(wallet);
    localStorage.setItem("walletConnected", connectedWallet);
    dispatch({
      type: ActionType.CONNECTED_WALLET,
      payload: connectedWallet,
    });
    switch (wallet.name) {
      case "metamask":
        //// Ethererum ////
        if (networkType === 1) {
          try {
            accounts = await web3Service.getAccounts();
            handleMetamask(accounts, dispatch, currentProviders);
          } catch (e) {
            console.log(e);
          }
        } else if (networkType === 2) {
          try {
            if (
              (window as any).ethereum &&
              (window as any).ethereum.selectedAddress
            ) {
              const provider = (window as any).ethereum;
              const chainId = 56;
              try {
                await provider.request({
                  method: "wallet_addEthereumChain",
                  params: [
                    {
                      chainId: `0x${chainId.toString(16)}`,
                      chainName: "Smart Chain",
                      nativeCurrency: {
                        name: "BNB",
                        symbol: "bnb",
                        decimals: 18,
                      },
                      rpcUrls: ["https://bsc-dataseed.binance.org/"],
                      blockExplorerUrls: ["https://bscscan.com/"],
                    },
                  ],
                });
                accounts = await web3Service.getAccounts();

                // if (accounts) {
                handleMetamask(accounts, dispatch, currentProviders);
                // }

                return true;
              } catch (error) {
                console.error(error);

                return false;
              }
            } else {
              console.error(
                "Can't setup the BSC network on metamask because window.ethereum is undefined"
              );
              dispatch({
                type: ActionType.CONNECT_WALLET_ERROR,
                payload: "Connection Failed",
              });
              return false;
            }
          } catch (e) {
            console.log(e);
          }
        } else if (networkType === 3) {
          try {
            if ((window as any).ethereum) {
              const provider = (window as any).ethereum;
              const chainId = 137;
              try {
                await provider.request({
                  method: "wallet_addEthereumChain",
                  params: [
                    {
                      chainId: `0x${chainId.toString(16)}`,
                      chainName: "Matic Mainnet",
                      nativeCurrency: {
                        name: "Matic",
                        symbol: "matic",
                        decimals: 18,
                      },
                      rpcUrls: ["https://rpc-mainnet.maticvigil.com/"],
                      blockExplorerUrls: ["https://explorer.matic.network/"],
                    },
                  ],
                });
                accounts = await web3Service.getAccounts();
                handleMetamask(accounts, dispatch, currentProviders);
                return true;
              } catch (e) {
                console.error(e);
                return false;
              }
            } else {
              if ((window as any).ethereum) {
                accounts = await web3Service.getAccounts();

                // if (accounts) {
                handleMetamask(accounts, dispatch, currentProviders);
              }
              console.error(
                "Can't setup the Matic network on metamask because window.ethereum is undefined"
              );
              dispatch({
                type: ActionType.CONNECT_WALLET_ERROR,
                payload: "Connection Failed",
              });
              return false;
            }
          } catch (e) {
            console.log(e);
            dispatch({
              type: ActionType.CONNECT_WALLET_ERROR,
              payload: e.message,
            });
          }
        }
        break;
      case "binanceWallet":
        try {
          if ((window as any).ethereum) {
            const provider = (window as any).ethereum;
            const chainId = 56;
            try {
              await provider.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: `0x${chainId.toString(16)}`,
                    chainName: "Smart Chain",
                    nativeCurrency: {
                      name: "BNB",
                      symbol: "bnb",
                      decimals: 18,
                    },
                    rpcUrls: ["https://bsc-dataseed.binance.org/"],
                    blockExplorerUrls: ["https://bscscan.com/"],
                  },
                ],
              });
              accounts = await web3Service.getAccounts();
              console.log(accounts);

              // if (accounts) {
              handleMetamask(accounts, dispatch, currentProviders);
              // }

              return true;
            } catch (error) {
              console.error(error);

              return false;
            }
          } else {
            console.error(
              "Can't setup the BSC network on metamask because window.ethereum is undefined"
            );
            dispatch({
              type: ActionType.CONNECT_WALLET_ERROR,
              payload: "Connection Failed",
            });
            return false;
          }
        } catch (e) {
          dispatch({
            type: ActionType.CONNECT_WALLET_ERROR,
            payload: e.message,
          });
        }
        break;
      case "walletConnect":
        try {
          let provider: any = CWweb3.connectWalletProvider;
          await provider.enable().then((response: any) => {
            metamaskEventHandler(dispatch, CWweb3.connectWalletProvider);
          });
          await CWweb3.connectWalletWeb3.eth.getAccounts().then((res: any) => {
            dispatch({
              type: ActionType.CONNECT_WALLET_SUCCESS,
              payload: [...res],
            });
          });

          // const chainId = await web3.eth.chainId();
          // console.log(accounts, networkId, "ss", chainId);
        } catch (err) {
          dispatch({
            type: ActionType.CONNECT_WALLET_ERROR,
            payload: err.message,
          });
        }
        break;
      case "CoinbaseWallet":
        try {
          CoinbaseProvider.enable()
            .then((accounts: string[]) => {
              CoinbaseWeb3.eth.defaultAccount = accounts[0];
              dispatch({
                type: ActionType.CONNECT_WALLET_SUCCESS,
                payload: [...accounts],
              });
              metamaskEventHandler(dispatch, (window as any).ethereum);
              CoinbaseWeb3.eth
                .getBalance(accounts[0])
                .then((res: any) => {
                  let ethBal = web3Service.getWei(res, "ether");
                  let ethBalDeci = toFixed(parseFloat(ethBal), 3);
                  dispatch({
                    type: ActionType.ACCOUNT_BALANCE_SUCCESS,
                    payload: ethBalDeci,
                    fullAccountBalance: ethBal,
                  });
                })
                .catch((e: any) => {
                  dispatch({
                    type: ActionType.ACCOUNT_BALANCE_SUCCESS,
                    payload: "",
                    fullAccountBalance: "",
                  });
                });
            })
            .catch((err: any) => {
              dispatch({
                type: ActionType.CONNECT_WALLET_ERROR,
                payload: err.message,
              });
            });
        } catch (err) {
          dispatch({
            type: ActionType.CONNECT_WALLET_ERROR,
            payload: err.message,
          });
        }
        break;
      case "Fortmatic":
        try {
          let web3: any = formaticWeb3;
          // console.log(
          web3.currentProvider
            .enable()
            .then((res: any) => {
              let address: string[];
              address = res;
              dispatch({
                type: ActionType.CONNECT_WALLET_SUCCESS,
                payload: [...address],
              });
              metamaskEventHandler(dispatch, (window as any).ethereum);
              getAccountBalance(address[0], currentProviders);
            })
            .catch((err: any) => {
              dispatch({
                type: ActionType.CONNECT_WALLET_ERROR,
                payload: err.message,
              });
            });
          // );
        } catch (err) {
          dispatch({
            type: ActionType.CONNECT_WALLET_ERROR,
            payload: err.message,
          });
        }
        break;
      case "Portis":
        try {
          // if (wallet.name === "Portis" && !isMobile) {
          //   portisWeb3.eth.getAccounts((error, accounts) => {
          //     if (!error) {
          //       let address: string[];
          //       address = accounts;
          //       portis.onActiveWalletChanged((walletAddress: any) => {
          //         dispatch({
          //           type: ActionType.CONNECT_WALLET_SUCCESS,
          //           payload: [...address],
          //         });
          //         getAccountBalance(walletAddress[0]);
          //       });
          //       portis.onError((error: any) => {
          //         // console.log("error", error);
          //       });
          //       portis.onLogin(
          //         (walletAddress: any, email: any, reputation: any) => {
          //           // console.log(walletAddress, email, reputation);
          //           getAccountBalance(walletAddress);
          //         }
          //       );
          //       portis.onLogout(() => {
          //         dispatch({
          //           type: ActionType.WALLET_DISCONNECT,
          //         });
          //       });
          //       dispatch({
          //         type: ActionType.CONNECT_WALLET_SUCCESS,
          //         payload: [...address],
          //       });
          //     } else {
          //       dispatch({
          //         type: ActionType.CONNECT_WALLET_ERROR,
          //         payload: error.message,
          //       });
          //     }
          //   });
          // }
        } catch (err) {
          dispatch({
            type: ActionType.CONNECT_WALLET_ERROR,
            payload: err.message,
          });
        }
        break;
      default:
        accounts = await web3Service.getAccounts();
        if (window && !(window as any).ethereum.selectedAddress) {
          (window as any).ethereum.enable();
          dispatch({
            type: ActionType.CONNECT_WALLET_SUCCESS,
            payload: [...accounts],
          });
        } else {
          dispatch({
            type: ActionType.CONNECT_WALLET_SUCCESS,
            payload: [...accounts],
          });
        }
        break;
    }
  } catch (e) {
    dispatch({
      type: ActionType.CONNECT_WALLET_ERROR,
      payload: e.message,
    });
  }
}

export const connectWalletAction = (networkType: any, wallet?: Wallet) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.CONNECT_WALLET,
    });

    try {
      // let accounts = await (window as any).BinanceChain.request({
      //   method: "eth_accounts",
      // });
      // dispatch({
      //   type: ActionType.CONNECT_WALLET_SUCCESS,
      //   payload: [...accounts],
      // });
      // console.log(accounts);
      if (wallet) {
        let currentProvider: any;
        let provider: any;
        let EthProvider = (window as any).ethereum;
        switch (wallet.name) {
          case "metamask":
            currentProvider = web3;
            provider = EthProvider;
            break;
          case "walletConnect":
            currentProvider = CWweb3.connectWalletWeb3;
            provider = CWweb3.connectWalletProvider;
            break;
          case "CoinbaseWallet":
            currentProvider = CoinbaseWeb3;
            provider = EthProvider;
            break;
          case "Fortmatic":
            currentProvider = formaticWeb3;
            provider = fm;
            break;
          case "Portis":
            // if (wallet.name === "Portis" && !isMobile) {
            //   currentProvider = portisWeb3;
            //   provider = portis;
            // }
            break;
          case "binanceWallet":
            // currentProvider = bscWeb3;
            // provider = (window as any).BinanceChain;
            currentProvider = web3;
            provider = EthProvider;
            break;
          case "maticWallet":
            currentProvider = maticWeb3;
            provider = EthProvider;
            break;
          default:
            currentProvider = web3;
            provider = EthProvider;
        }
        dispatch({
          type: ActionType.CURRENT_PROVIDER,
          payload: currentProvider,
          provider: provider,
        });
        handleWalletConnect(currentProvider, networkType, wallet, dispatch);
      }
    } catch (err) {
      dispatch({
        type: ActionType.CONNECT_WALLET_ERROR,
        payload: err.message,
      });
    }
  };
};

export const walletDisconnect = (walletProvider: any) => {
  return async (dispatch: Dispatch<Action>) => {
    localStorage.removeItem(
      "-walletlink:https://www.walletlink.org:session:id"
    );
    localStorage.removeItem(
      "-walletlink:https://www.walletlink.org:session:secret  "
    );
    localStorage.removeItem(
      "-walletlink:https://www.walletlink.org:session:linked"
    );
    localStorage.removeItem("walletConnected");
    // if (walletProvider === (window as any).ethereum) walletProvider.disable();
    // await walletProvider.disconnect();
    dispatch({
      type: ActionType.WALLET_DISCONNECT,
    });
  };
};
