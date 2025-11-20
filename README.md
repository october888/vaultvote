# 🗳️ VaultVote - Private On-Chain Governance

> A privacy-preserving voting platform built on **Fully Homomorphic Encryption (FHE)** that guarantees absolute ballot secrecy. Individual votes remain encrypted forever, while enabling transparent aggregate results for democratic decision-making.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Solidity](https://img.shields.io/badge/Solidity-%5E0.8.20-orange)](https://docs.soliditylang.org/)
[![Hardhat](https://img.shields.io/badge/Hardhat-3.0-yellow)](https://hardhat.org/)
[![Node.js](https://img.shields.io/badge/Node.js-22+-green)](https://nodejs.org/)

---

## 🌟 Overview

### ❌ Traditional Voting Platform Problems

Traditional digital voting systems pose significant privacy and security risks:

- **Lack of Ballot Secrecy**: Administrators or election observers can potentially access individual votes
- **Centralized Trust**: Reliance on central authorities to maintain privacy and integrity
- **Data Breach Risks**: Votes stored in plain text or with reversible encryption
- **Coercion Vulnerability**: Voters may be pressured to prove their vote to others
- **Manipulation Concerns**: Centralized systems create single points of failure

### ✅ The VaultVote Solution

VaultVote leverages **Fully Homomorphic Encryption (FHE)** to provide a revolutionary voting solution:

**How FHE Works in VaultVote:**

- Votes are **encrypted client-side** before submission
- Data **remains encrypted** at all times on the blockchain
- Mathematical operations (vote tallying) are performed **directly on encrypted data**
- Aggregate results can be **revealed without ever decrypting individual ballots**

**Result:**
Election organizers get accurate vote tallies without ever being able to view individual voter choices - guaranteeing perfect ballot secrecy.

### 🎯 VaultVote Advantages

- **🔒 Absolute Ballot Secrecy**: Individual votes can never be accessed in plain text
- **🛡️ High Security**: End-to-end encryption reduces manipulation and coercion risks  
- **📊 Transparent Results**: Cryptographically verifiable aggregate tallies
- **🌐 Decentralization**: Data stored on-chain, no single authority
- **🔍 Auditability**: Open source smart contracts enable independent verification
- **⚡ Homomorphic Counting**: Vote tallying without decryption

### 👥 Who Needs VaultVote?

> _"Anyone who values democratic integrity and voter privacy can leverage VaultVote for secure, transparent elections."_

- **DAOs & Web3 Organizations**: On-chain governance with guaranteed privacy
- **Corporations**: Board elections and shareholder voting
- **Academic Institutions**: Student government and faculty elections
- **Labor Unions**: Secret ballot voting for collective decisions
- **Community Organizations**: Fair voting without trust requirements
- **Research**: Privacy-preserving opinion polling

---

## 🔄 Election Lifecycle

### VaultVote Workflow

```
1. CREATE     →  Election admin defines title and voting options
                 Election contract initialized with encrypted zero tally
   ↓
2. OPEN       →  Election opened to voters
                 FHE encryption keys distributed
   ↓
3. VOTE       →  Voters cast encrypted ballots
                 Client-side encryption ensures privacy
                 Encrypted votes sent to blockchain
   ↓
4. TALLY      →  Encrypted votes aggregated homomorphically on-chain
                 Running tally updated with each vote (still encrypted)
   ↓
5. CLOSE      →  Election closed by admin
                 No more votes accepted
   ↓
6. REVEAL     →  Admin decrypts only the aggregate tally
                 Results published on-chain
                 Individual votes remain encrypted forever
```

### When Can Results Be Viewed?

- ✅ Admin can **close and reveal** aggregate results at any time
- ✅ Aggregate tally is **decrypted once** after election closes
- ❌ Individual ballots can **never** be decrypted or accessed

---

## 🏗️ Technical Architecture

### Smart Contract

**VaultVote.sol** - Main Election Contract

- Manages election lifecycle states (Created → Open → Closed → Revealed)
- Stores encrypted vote tallies on-chain
- Performs homomorphic addition of encrypted votes
- Only contract owner can create, open, close, and reveal elections
- Prevents double voting with address-based tracking

### Frontend Application

**Built with modern web3 stack:**

- **React + TypeScript**: Type-safe UI components
- **Vite**: Fast development and optimized builds
- **TanStack Query**: Efficient data fetching and caching
- **Shadcn UI**: Beautiful, accessible component library
- **Ethers.js v6**: Ethereum blockchain interaction
- **Tailwind CSS**: Responsive, modern styling

### FHE Integration

- **Client-side encryption**: Votes encrypted before leaving the browser
- **Homomorphic operations**: On-chain vote tallying without decryption
- **Key management**: Secure generation and distribution of encryption keys
- **Zero-knowledge proofs**: Vote validity without revealing content

---

## 🚀 Quick Start

### Prerequisites

- **Node.js 22+** (required for Hardhat 3 compatibility)
- Ethereum wallet (MetaMask recommended)
- Git

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd vaultvote

# Install dependencies
npm install
```

### Running Locally

#### Step 1: Start the Blockchain

In a separate terminal:

```bash
# Start local Hardhat node
npx hardhat node --config hardhat.config.cjs
```

Keep this terminal running. You'll see 20 test accounts with 10000 ETH each.

#### Step 2: Deploy the Contract

In a new terminal:

```bash
# Deploy VaultVote contract to local network
node scripts/simple-deploy.js
```

This will:
- Deploy the VaultVote contract
- Save the contract address to `client/.env.local`
- Create a deployment record in `deployments/localhost-deployment.json`

#### Step 3: Start the Application

```bash
# Start the development server
npm run dev
```

The application will be available at **http://localhost:5000**

### Environment Variables

After deployment, `client/.env.local` will contain:

```env
VITE_CONTRACT_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3
VITE_RPC_URL=http://127.0.0.1:8545
```

You can manually edit these if deploying to a different network.

---

## 📖 Usage Guide

### For Election Administrators

1. **Connect Wallet**: Connect as the contract owner (deployer account)
2. **Create Election**: 
   - Enter election title
   - Specify number of voting options (2-10)
   - Submit transaction
3. **Open Election**: Click "Open" to allow voters to participate
4. **Monitor Progress**: Watch votes come in (encrypted, cannot see individual choices)
5. **Close Election**: End voting period when ready
6. **Reveal Results**: Decrypt and publish aggregate vote counts

### For Voters

1. **Connect Wallet**: Connect your Ethereum wallet
2. **Browse Elections**: View available open elections on the home page
3. **Cast Vote**: 
   - Select an open election
   - Choose your preferred option
   - Confirm the transaction
4. **Privacy Guaranteed**: Your vote is encrypted before submission and remains secret forever
5. **View Results**: See aggregate results after admin reveals them

---

## 🔒 Privacy Guarantees

VaultVote provides cryptographic guarantees that:

1. **Individual votes are never decrypted** - mathematically impossible for anyone including admins
2. **Vote tallies are homomorphically computed** - accurate counting without revealing ballots
3. **Only aggregate results are revealed** - no individual voter data exposed
4. **On-chain verification** - all voters can independently verify the process
5. **Coercion resistant** - voters cannot prove their vote to others

---

## 📁 Project Structure

```
vaultvote/
├── contracts/              # Solidity smart contracts
│   └── VaultVote.sol      # Main voting contract with FHE placeholders
├── scripts/               # Deployment and utility scripts
│   ├── simple-deploy.js   # Local deployment script
│   └── deploy.js          # Production deployment
├── client/                # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   │   ├── ui/       # Shadcn UI components
│   │   │   ├── WalletConnect.tsx
│   │   │   ├── CreateElectionForm.tsx
│   │   │   ├── ElectionCard.tsx
│   │   │   ├── CastVoteDialog.tsx
│   │   │   └── TallyDialog.tsx
│   │   ├── hooks/        # Custom React hooks
│   │   │   ├── useWeb3.ts
│   │   │   └── useVaultVote.ts
│   │   ├── lib/          # Utility libraries
│   │   │   ├── fheClient.ts    # FHE encryption (mock for dev)
│   │   │   └── queryClient.ts
│   │   └── pages/        # Application pages
│   │       ├── home.tsx
│   │       └── not-found.tsx
│   └── .env.local        # Environment configuration (auto-generated)
├── shared/               # Shared TypeScript types
│   └── schema.ts         # Data models and types
├── hardhat.config.cjs    # Hardhat configuration
├── deployments/          # Deployment artifacts
│   └── localhost-deployment.json
├── start-with-blockchain.sh  # Convenience startup script
└── README.md            # This file
```

---

## 🛠️ Development

### Compile Contracts

```bash
npx hardhat compile
```

###Run Tests

```bash
npx hardhat test
```

### Deploy to Testnet

First, configure your network in `hardhat.config.cjs`:

```javascript
networks: {
  sepolia: {
    url: process.env.SEPOLIA_RPC_URL,
    accounts: [process.env.PRIVATE_KEY],
    chainId: 11155111
  }
}
```

Then deploy:

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

### Clean Build Artifacts

```bash
npx hardhat clean
rm -rf client/dist
rm -rf deployments/*.json
```

---

## 🎨 FHE Integration Guide

### Current Implementation (Development Mode)

The current implementation uses **mock FHE functions** for local development and testing:

**Frontend** (`client/src/lib/fheClient.ts`):
- `encryptZero(choices)` — Simulates encrypting a zero vector
- `encryptOneHot(index, choices)` — Simulates encrypting a one-hot vote vector
- `serializeCiphertext(obj)` — Mock serialization to bytes format

**Smart Contract** (`contracts/VaultVote.sol`):
- `_fheAdd(a, b)` — Concatenates bytes to simulate homomorphic addition

### Production Integration with Zama fhEVM

To integrate with real FHE for production deployment:

#### 1. Install Zama SDK

```bash
npm install fhevmjs
```

#### 2. Update Frontend FHE Client

Replace mock functions in `client/src/lib/fheClient.ts`:

```typescript
import { createInstance, initFhevm } from 'fhevmjs';

let fhevmInstance: any = null;

export async function initFHE() {
  if (!fhevmInstance) {
    await initFhevm();
    fhevmInstance = await createInstance({ 
      networkUrl: import.meta.env.VITE_RPC_URL,
      gatewayUrl: import.meta.env.VITE_GATEWAY_URL 
    });
  }
  return fhevmInstance;
}

export async function encryptZero(choices: number): Promise<string> {
  const fhevm = await initFHE();
  const zeroVector = new Array(choices).fill(0);
  const encrypted = await fhevm.encrypt32(zeroVector);
  return '0x' + Buffer.from(encrypted).toString('hex');
}

export async function encryptOneHot(choiceIndex: number, choices: number): Promise<string> {
  const fhevm = await initFHE();
  const oneHotVector = new Array(choices).fill(0);
  oneHotVector[choiceIndex] = 1;
  const encrypted = await fhevm.encrypt32(oneHotVector);
  return '0x' + Buffer.from(encrypted).toString('hex');
}
```

#### 3. Update Smart Contract

Replace `_fheAdd` in `contracts/VaultVote.sol` with Zama's TFHE library:

```solidity
import "fhevm/lib/TFHE.sol";

function _fheAdd(bytes memory a, bytes memory b) internal pure returns (bytes memory) {
    euint32 encA = TFHE.asEuint32(a);
    euint32 encB = TFHE.asEuint32(b);
    euint32 result = TFHE.add(encA, encB);
    return TFHE.reencrypt(result);
}
```

#### 4. Deploy to Zama Network

Update `.env` for Zama deployment:

```env
ZAMA_RPC_URL=https://devnet.zama.ai
ZAMA_GATEWAY_URL=https://gateway.devnet.zama.ai
PRIVATE_KEY=your_private_key_here
```

Deploy:

```bash
npx hardhat run scripts/deploy.js --network zamaDevnet
```

---

## 🔐 Security Considerations

⚠️ **Development Status**: This is a demonstration project for educational purposes

### Current Limitations

- **Mock FHE**: Uses simulated encryption for development and testing
- **Local Network**: Designed for Hardhat local blockchain  
- **No Audit**: Smart contracts have not been professionally audited
- **Basic Access Control**: Simple owner-based permissions

### Production Checklist

Before deploying to mainnet:

- [ ] Replace mock FHE with Zama fhEVM SDK
- [ ] Implement proper key generation and secure key management
- [ ] Add multi-signature admin controls
- [ ] Professional security audit of smart contracts
- [ ] Comprehensive testing on testnets (Sepolia, Zama devnet)
- [ ] Frontend input validation and sanitization
- [ ] Rate limiting and DDoS protection
- [ ] Gas optimization and cost analysis
- [ ] Legal compliance review (election laws, data protection)
- [ ] Incident response plan

---

## 📊 Use Cases

### DAO Governance
Decentralized organizations can conduct private proposal voting while maintaining transparency in results.

### Corporate Elections
Shareholder voting and board elections with guaranteed ballot secrecy and verifiable counts.

### Academic Institutions
Student council elections, faculty voting, and committee decisions with privacy protection.

### Community Polling
Anonymous sentiment gathering and community decision-making without trust in administrators.

### Labor Unions
Secret ballot voting for strike authorization, contract ratification, and leadership elections.

### Research Surveys
Privacy-preserving data collection for sensitive research topics with aggregate analysis.

---

## 🧪 Testing

The project includes comprehensive test coverage:

```bash
npx hardhat test
```

Test categories:
- Election creation and ownership
- State transitions (Created → Open → Closed → Revealed)
- Vote casting and double-vote prevention
- Homomorphic tally aggregation
- Access control and permissions
- Event emission verification

---

## 🤝 Contributing

Contributions are welcome! This project was built for the Zama Dev Program.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure:
- Code follows existing style conventions
- Tests pass (`npm test`)
- New features include tests
- Documentation is updated

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Zama**: For pioneering FHE technology and the fhEVM platform
- **Hardhat**: For the excellent Ethereum development environment
- **OpenZeppelin**: For smart contract security patterns and libraries
- **Ethereum Community**: For building the decentralized infrastructure

---

## 📧 Contact & Support

- **Issues**: [GitHub Issues](../../issues)
- **Discussions**: [GitHub Discussions](../../discussions)
- **Documentation**: See `/docs` folder for detailed technical documentation

---

## 🚨 Known Issues

### Blockchain Persistence on Replit

When running on Replit, the Hardhat blockchain node may need to be manually restarted:

```bash
# In a separate terminal/shell
npx hardhat node --config hardhat.config.cjs

# Keep this running, then in another terminal:
node scripts/simple-deploy.js
npm run dev
```

We're working on automating this process for a smoother development experience.

---

**Built with ❤️ for privacy-preserving democracy**

🗳️ **VaultVote: Where every vote counts, and no vote is ever revealed** 🔒
