import { Icon } from '@iconify/react'
import clsx from 'clsx'
import { useState } from 'react'
import tokens from '../constants/prices.json'
import { WSRVImage } from './WSRVImage'

type SwapperProps = {}

type Token = { currency: string; price: number }

type ExchangedUnitProps = {
    name?: string
    amount?: number
    dollar?: number
    iconSrc?: string | null
    classes?: {
        root?: string
    }
    handleSelect: (token: Token) => void
    handleChangeAmount: (amount: number) => void
}

type ExchangedUnitState = {
    currency: string
    price: number
    amount: number
}

const swapTo = (from: ExchangedUnitState, to: ExchangedUnitState) => {
    const total = from.amount * from.price
    const toAmount = total / to.price

    return createExchangedUnit(to.currency, to.price, toAmount)
}

const getCurrencyImage = (currency?: string) => {
    return currency
        ? `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${currency}.svg`
        : ''
}

const createExchangedUnit = (
    currency?: string | null,
    price?: number | null,
    amount?: number | null
): ExchangedUnitState => {
    return {
        currency: currency || '',
        price: price || 0,
        amount: amount || 0,
    }
}

export const Swapper: React.FC<SwapperProps> = ({}: SwapperProps) => {
    const [from, setFrom] = useState<ExchangedUnitState>(createExchangedUnit())
    const [to, setTo] = useState<ExchangedUnitState>(createExchangedUnit())

    return (
        <div className="flex w-full max-w-[500px] flex-col gap-5 rounded-xl bg-primary px-5 py-5">
            <div className="flex flex-col gap-1">
                <ExchangedUnit
                    name={from?.currency || ''}
                    amount={from?.amount || 0}
                    dollar={from?.price || 0}
                    iconSrc={getCurrencyImage(from?.currency)}
                    classes={{
                        root: 'w-full',
                    }}
                    handleSelect={(token) => {
                        const fromToken = createExchangedUnit(
                            token.currency,
                            token.price,
                            from?.amount
                        )
                        if (to.currency && fromToken.currency) {
                            if (to.amount && fromToken.amount === 0) {
                                setFrom(swapTo(to, fromToken))
                            } else {
                                setFrom(fromToken)
                                setTo(swapTo(fromToken, to))
                            }
                        } else {
                            setFrom(fromToken)
                        }
                    }}
                    handleChangeAmount={(amount) => {
                        const fromToken = createExchangedUnit(
                            from?.currency,
                            from?.price,
                            amount
                        )
                        if (fromToken.currency && to.currency) {
                            setTo(swapTo(fromToken, to))
                        }
                        setFrom(fromToken)
                    }}
                />
                <div className="relative">
                    <span
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-white px-2 py-2 text-[40px] transition-all hover:scale-75"
                        onClick={() => {
                            setFrom(to)
                            setTo(from)
                        }}
                    >
                        <Icon icon="mdi:swap-horizontal" />
                    </span>
                </div>
                <ExchangedUnit
                    name={to?.currency || ''}
                    amount={to?.amount || 0}
                    dollar={to?.price || 0}
                    iconSrc={getCurrencyImage(to?.currency)}
                    classes={{
                        root: 'w-full',
                    }}
                    handleSelect={(token) => {
                        const toToken = createExchangedUnit(
                            token.currency,
                            token.price,
                            to?.amount
                        )
                        if (from.currency && toToken.currency) {
                            if (from.amount && toToken.amount === 0) {
                                setTo(swapTo(from, toToken))
                            } else {
                                setTo(toToken)
                                setFrom(swapTo(toToken, from))
                            }
                        } else {
                            setTo(toToken)
                        }
                    }}
                    handleChangeAmount={(amount) => {
                        const toToken = createExchangedUnit(
                            to?.currency,
                            to?.price,
                            amount
                        )

                        if (toToken.currency && from.currency) {
                            setFrom(swapTo(toToken, from))
                        }
                        setTo(toToken)
                    }}
                />
            </div>
            {/* <button className="flex w-full items-center justify-center gap-1 rounded-lg bg-blue-light px-2 py-2 text-lg capitalize text-white transition-all hover:opacity-70">
                <span className="text-[24px]">
                    <Icon icon="mdi:swap-vertical" />
                </span>
                Swap
            </button> */}
        </div>
    )
}

const ExchangedUnit: React.FC<ExchangedUnitProps> = ({
    name,
    amount,
    dollar,
    iconSrc,
    classes,
    handleSelect,
    handleChangeAmount,
}: ExchangedUnitProps) => {
    const [search, setSearch] = useState<string>('')

    return (
        <>
            <div
                className={clsx(
                    'flex w-fit select-none flex-col gap-4 rounded-lg bg-secondary px-4 py-8 text-white',
                    classes?.root
                )}
            >
                <button className="group relative w-fit">
                    <div
                        className={clsx(
                            'relative flex h-[35px] w-[150px] max-w-[150px] cursor-pointer items-center gap-2 rounded-full bg-primary py-1 pl-3 pr-6'
                        )}
                    >
                        {iconSrc && (
                            <WSRVImage
                                alt="token-icon"
                                src={iconSrc}
                                imgWrsvParams="?w=18&h=18"
                                classes={{
                                    img: 'w-[18px] h-[18px]',
                                    root: 'flex-none',
                                }}
                            />
                        )}
                        <span className="truncate text-[20px] uppercase">
                            {name}
                        </span>
                        <span className="absolute right-2">
                            <Icon icon="mdi:arrow-down-drop" />
                        </span>
                    </div>
                    {/* Search currency */}
                    <div className="absolute left-0 top-full z-[1] hidden w-[250px] max-w-[250px] rounded-lg border border-blue-medium bg-blue-dark px-2 py-2 shadow-lg group-focus-within:block">
                        <div className="relative h-fit">
                            <input
                                placeholder="Search currency"
                                value={search}
                                className="peer w-full rounded-lg border border-white bg-[transparent] py-2 pl-8 font-thin text-white caret-white outline-none focus:border-blue-light"
                                onChange={(e) => {
                                    setSearch(e.target.value)
                                }}
                            />
                            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-white peer-focus:text-blue-light">
                                <Icon icon="mdi:magnify" />
                            </span>
                        </div>
                        <ul className="no-scrollbar mt-2 h-[200px] overflow-auto">
                            {tokens &&
                                tokens
                                    .filter((token) =>
                                        token.currency
                                            .toLowerCase()
                                            .includes(
                                                search.toLocaleLowerCase()
                                            )
                                    )
                                    // I swear of god, I do not want to use this index as key
                                    .map((token, index) => (
                                        <li
                                            key={`${token.currency}-${index}`}
                                            className="hover:bg-blue-semi h-fit rounded-lg px-3 py-2 text-white transition-all"
                                            onClick={() => {
                                                handleSelect({
                                                    currency: token.currency,
                                                    price: token.price,
                                                })
                                            }}
                                        >
                                            <div className="flex items-start gap-3">
                                                <WSRVImage
                                                    alt="token-icon"
                                                    src={getCurrencyImage(
                                                        token.currency
                                                    )}
                                                    imgWrsvParams="?w=18&h=18"
                                                    classes={{
                                                        root: 'block w-fit h-fit',
                                                    }}
                                                />
                                                <span className="truncate text-start text-sm font-thin">
                                                    {token.currency}
                                                    <br />
                                                    <span className="truncate text-[12px]">
                                                        {token.price}
                                                    </span>
                                                </span>
                                            </div>
                                        </li>
                                    ))}
                        </ul>
                    </div>
                    {/* -------------------- */}
                </button>
                <div className="text-sm font-thin">
                    <input
                        placeholder="0.0"
                        type="number"
                        value={amount + ''}
                        onChange={(e) => {
                            const value = Number.parseFloat(e.target.value) || 0
                            if (!Number.isNaN(value)) {
                                handleChangeAmount(value)
                            }
                        }}
                        className="appearance-none rounded-md border border-blue-medium bg-[transparent] px-1 py-1 text-white outline-none focus:border-blue-light"
                    />
                    <p className="text-gray mt-2">${dollar}</p>
                </div>
            </div>
        </>
    )
}
