import { Plus } from "lucide-react";
import Image from "next/image";
import externalLinkIcon from "@/public/images/external-link.svg";
import TransactionCard from "./TransactionCard";

interface TransactionActionsProps {
  addRoute?: string;
  viewRoute?: string;
}

export default function TransactionActions({
  addRoute = "/transaction/add",
  viewRoute = "/transaction",
}: TransactionActionsProps) {
  return (
    <TransactionCard>
      <div className="flex items-center justify-between gap-[15px]">
        <h2 className="text-base font-semibold text-[var(--card-foreground)]">
          Transações
        </h2>
        <div className="flex gap-2">
          <a
            href={addRoute}
            className="flex h-[30.29px] transform items-center gap-[3.74px] rounded-[5px] bg-[var(--default-button)] px-[10px] text-xs text-white transition-transform hover:scale-105 hover:bg-neutral-600"
          >
            <Plus size={14} />
            Adicionar
          </a>
          <a
            href={viewRoute}
            className="flex h-[30.29px] transform items-center justify-center rounded-[5px] bg-[var(--default-button)] px-[10px] text-xs text-white transition-transform hover:scale-105 hover:bg-neutral-600"
          >
            <Image
              src={externalLinkIcon}
              alt="Visualizar Transações"
              width={16}
              height={16}
            />
          </a>
        </div>
      </div>
    </TransactionCard>
  );
}
