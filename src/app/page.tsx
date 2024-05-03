"use client";

import { fontSans, fontHeading } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { createThirdwebClient, getContract } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
import Link from "next/link";
import {
  ConnectButton,
  TransactionButton,
  useActiveAccount,
  useActiveWallet,
} from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { getOwnedNFTs, claimTo } from "thirdweb/extensions/erc721";

export default function Home() {
  const thirdwebClient = createThirdwebClient({
    clientId: process.env.NEXT_PUBLIC_THIRDWEB_API_KEY!,
  });

  const account = useActiveAccount();

  const contract = getContract({
    client: thirdwebClient,
    chain: baseSepolia,
    address: "0xe9a7eCaB146d7b3756FaC610e70eD8B3c6197fB6",
  });

  return (
    <section
      className={cn("space-y-6 pb-12 pt-16 md:pb-2 md:pt-16 lg:py-24 mb-2")}
    >
      {/* Hero section - Title and brief description */}
      <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center mt-12">
        <h1
          className={cn(
            fontHeading.className,
            "font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl z-10"
          )}
        >
          RIP-7212 Demo with Coinbase Smart Wallet
        </h1>

        <p
          className={cn(
            fontSans.className,
            "w-full max-w-[52rem] leading-normal text-muted-foreground xs:text-md sm:text-lg md:text-xl sm:leading-8 z-10 mt-1"
          )}
        >
          An account abstraction onboarding demo without any extension,
          mnemonics, or gas fee. Powered by{" "}
          <Link
            href="https://www.coinbase.com/en-au/wallet/smart-wallet"
            target="_blank"
            rel="noopener noreferrer"
            className="bold underline"
          >
            Coinbase Smart Wallet
          </Link>
          ,{" "}
          <Link
            href="https://www.youtube.com/watch?v=RFsUuihO_aY"
            target="_blank"
            rel="noopener noreferrer"
            className="bold underline"
          >
            EIP-4337
          </Link>
          , and{" "}
          <Link
            href="https://www.youtube.com/watch?v=HVlHfudlbgE"
            target="_blank"
            rel="noopener noreferrer"
            className="bold underline"
          >
            RIP-7212
          </Link>
          , built by{" "}
          <Link
            href="https://twitter.com/jarrodWattsDev"
            target="_blank"
            rel="noopener noreferrer"
            className="bold underline"
          >
            jarrod
          </Link>
          .
        </p>

        <Card className="md:p-8 w-full flex flex-col md:flex-row justify-start gap-6 pt-4">
          <Card className="p-2 pb-4 flex flex-col items-center justify-center md:min-w-[320px]">
            <CardHeader>
              <Image
                src={`/kanga.jpg`}
                alt="Magical Kangaroo"
                width={200}
                height={200}
                className="rounded-sm"
              />
            </CardHeader>

            <CardContent className="pb-4">
              <CardTitle>Magical Kangaroo</CardTitle>
              <CardDescription className="mt-2">
                A magical kangaroo that can jump over the moon.
              </CardDescription>
            </CardContent>
          </Card>

          <div className="flex flex-col items-center justify-center md:items-start md:justify-normal p-2 pt-4">
            <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              Mint your NFT.
            </h2>
            <h3 className="scroll-m-20 text-lg font-bold tracking-tight mt-2 text-center md:text-left">
              No extensions. No mnemonics. No gas fees.
            </h3>

            <p className="leading-7 mt-2 md:text-left mb-4">
              This demo showcases RIP-7212 in action by allowing the user to
              create a new smart wallet and minting an NFT.
            </p>

            {!account && (
              <>
                <p className="leading-7 mt-2 md:text-left mb-4">
                  Try it out by clicking the button below.
                </p>

                <ConnectButton
                  client={thirdwebClient}
                  wallets={[
                    createWallet("com.coinbase.wallet", {
                      walletConfig: {
                        options: "smartWalletOnly",
                      },
                      chains: [baseSepolia],
                      appMetadata: {
                        name: "ETH Global Sydney 2024",
                        description: "Hackathon project by Jarrod Watts",
                        logoUrl:
                          "https://avatars.githubusercontent.com/u/35270686?s=280&v=4",
                      },
                    }),
                  ]}
                  theme={"dark"}
                  connectButton={{
                    style: {
                      width: "100%",
                    },
                  }}
                />
              </>
            )}

            {account && (
              <>
                {}
                <p className="leading-7 mt-2 md:text-left mb-4">
                  You just created a new EOA wallet with the secp256r1 curve
                  using <strong>RIP-7212</strong>. This wallet will be the admin
                  of the smart contract wallet you are about to deploy using{" "}
                  <strong>EIP-4337</strong> when you mint your NFT.
                </p>

                <TransactionButton
                  style={{ width: "100%" }}
                  transaction={() =>
                    claimTo({
                      contract,
                      to: account.address,
                      quantity: BigInt(1),
                    })
                  }
                  onTransactionSent={(result) => {
                    console.log(
                      "Transaction submitted",
                      result.transactionHash
                    );
                  }}
                  onTransactionConfirmed={(receipt) => {
                    console.log(
                      "Transaction confirmed",
                      receipt.transactionHash
                    );
                  }}
                  onError={(error) => {
                    console.error("Transaction error", error);
                  }}
                >
                  Mint NFT
                </TransactionButton>
              </>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
}
