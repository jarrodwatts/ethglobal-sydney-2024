import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import Link from "next/link";

export default function MoreInfo() {
  return (
    <Accordion type="multiple" className="w-full md:w-5/6 text-left">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is RIP-7212?</AccordionTrigger>
        <AccordionContent>
          <strong>RIP-7212</strong> is a &ldquo;Rollup Improvement
          Proposal&rdquo;, similar to Ethereum&rsquo;s EIPs, but intended for
          Layer 2 blockchains. It adds a new precompiled contract that allows
          for the verification of Ethereum signatures using the{" "}
          <strong>secp256r1</strong> elliptic curve. RIP-7212 has been
          implemented on some chains already, such as Polygon PoS and Base.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>
          What is the secp265r1 elliptic curve?
        </AccordionTrigger>
        <AccordionContent>
          Elliptic curve algorithms are used to perform two essential actions on
          Ethereum:
          <ol className="ml-4 list-decimal list-inside mt-2">
            <li>
              Generate the public-private key pair of your accounts on Ethereum.
            </li>
            <li>
              Create signatures from your account to sign messages or approve
              transactions.
            </li>
          </ol>
          <br />
          Ethereum uses a specific elliptic curve called{" "}
          <strong>secp256k1</strong> by default. The <strong>secp256r1</strong>{" "}
          curve,{" "}
          <i>(note the &ldquo;r1&rdquo; as opposed to the &ldquo;k1&rdquo;)</i>,{" "}
          however, is a different elliptic curve that is far more widely
          adopted, and used in almost all other modern devices such as
          smartphones to store sensitive values.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>
          What is a precompiled contract & what precompiled contract does
          RIP-7212 add?
        </AccordionTrigger>
        <AccordionContent>
          The EVM has a set of precompiled contracts that are used to perform
          certain operations considered more advanced than the standard EVM
          opcodes.{" "}
          <Link
            href="https://www.evm.codes/precompiled"
            target="_blank"
            rel="noopener noreferrer"
            className="bold underline"
          >
            View all precompiled contracts
          </Link>
          .
          <br />
          <br />
          Precompiled contracts are significantly more cost efficient than
          performing the same operations written in custom Solidity.
          <br /> <br />
          The EVM currently has an <code>ecRecover</code> precompiled contract
          that allows for the verification of Ethereum signatures using the
          secp256k1 curve. However, there is no such precompiled contract for
          the secp256r1 curve. <br />
          <br />
          Because of this, while it is possible to recover the public key from a
          signature from the secp256r1 curve by writing custom logic in
          Solidity, it is <i>very</i> gas expensive to do so.
          <br />
          <br />
          RIP-7212 adds a new precompiled contract that allows for the
          verification of Ethereum signatures using the secp256r1 curve. Meaning
          you can now recover the public key from a signature using the
          secp256r1 curve in a gas efficient way.
          <br />
          <br />
          One important thing to note is that only smart contract accounts will
          be able to take advantage of this. This is why we pair this with
          EIP-4337 to allow for the creation of smart contract accounts that can
          take advantage of this new precompiled contract.
          <br />
          <br />
          You can watch my full{" "}
          <Link
            href="https://www.youtube.com/watch?v=HVlHfudlbgE"
            target="_blank"
            rel="noopener noreferrer"
            className="bold underline"
          >
            RIP-7212 video
          </Link>{" "}
          on my YouTube channel for more info.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
