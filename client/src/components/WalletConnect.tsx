import { Wallet, LogOut, Circle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import type { WalletState } from "@shared/schema";

interface WalletConnectProps {
  walletState: WalletState;
  onConnect: () => Promise<void>;
  onDisconnect: () => void;
  truncateAddress: (address: string) => string;
  onSwitchNetwork?: () => Promise<void>;
}

export function WalletConnect({ 
  walletState, 
  onConnect, 
  onDisconnect, 
  truncateAddress,
  onSwitchNetwork
}: WalletConnectProps) {
  const expectedChainId = Number(import.meta.env.VITE_CHAIN_ID || 11155111);
  const isWrongNetwork = walletState.isConnected && walletState.chainId !== expectedChainId;

  if (!walletState.isConnected || !walletState.address) {
    return (
      <Button 
        onClick={onConnect}
        size="lg"
        data-testid="button-connect-wallet"
        className="gap-2"
      >
        <Wallet className="h-4 w-4" />
        Connect Wallet
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {isWrongNetwork && (
        <Button
          onClick={onSwitchNetwork || onConnect}
          variant="destructive"
          size="sm"
          data-testid="button-switch-network"
          className="gap-2"
        >
          <AlertTriangle className="h-4 w-4" />
          Switch to Sepolia
        </Button>
      )}
      
      {walletState.isOwner && !isWrongNetwork && (
        <Badge variant="secondary" data-testid="badge-owner">
          Admin
        </Badge>
      )}
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            data-testid="button-wallet-menu"
            className="gap-2"
          >
            <Circle className="h-2 w-2 fill-green-500 text-green-500" />
            <span className="font-mono text-sm" data-testid="text-wallet-address">
              {truncateAddress(walletState.address)}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Connected Wallet</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="font-mono text-xs">
            {walletState.address}
          </DropdownMenuItem>
          {walletState.chainId && (
            <DropdownMenuItem className="text-muted-foreground text-xs">
              Chain ID: {walletState.chainId}
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={onDisconnect}
            data-testid="button-disconnect"
            className="gap-2 text-destructive focus:text-destructive"
          >
            <LogOut className="h-4 w-4" />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
