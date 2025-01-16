interface WalletBalance {
    currency: string;
    amount: number;
  }
  interface FormattedWalletBalance {
    currency: string;
    amount: number;
    formatted: string;
  }
  
//   Use extends but not implements
  interface Props extends BoxProps {
  
  }
  const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;
    const balances = useWalletBalances();
    const prices = usePrices();
  
    // Move this function out of the component to avoid re-creating it on every render
    // Avoid using any type and use the correct type
      const getPriority = (blockchain: any): number => {
        switch (blockchain) {
          case 'Osmosis':
            return 100
          case 'Ethereum':
            return 50
          case 'Arbitrum':
            return 30
          case 'Zilliqa':
            return 20
          case 'Neo':
            return 20
          default:
            return -99
        }
      }
  
    const sortedBalances = useMemo(() => {
        //type WalletBalance does not have blockchain property
      return balances.filter((balance: WalletBalance) => {
            // balancePriority is computed but not used
            const balancePriority = getPriority(balance.blockchain);
            // lhsPriority is not defined lead to compile error
            if (lhsPriority > -99) {
               if (balance.amount <= 0) {
                 return true;
               }
            }
            return false
          }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
              const leftPriority = getPriority(lhs.blockchain);
            const rightPriority = getPriority(rhs.blockchain);

            
            if (leftPriority > rightPriority) {
              return -1;
            } 
            //return 1 for the rest case
            else if (rightPriority > leftPriority) {
              return 1;
            }
      });
    }, [balances, prices]);
  
    // Define array which is not used
    const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
      return {
        ...balance,
        formatted: balance.amount.toFixed()
      }
    })
  
    // It is suggested that we should not use index as key beacuse it can cause performance issues when re-render and lead to some bugs which are hard to predict
    const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow 
          className={classes.row} // classes is not defined
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      )
    })
  
    return (
      <div {...rest}>
        {rows}
      </div>
    )
  }