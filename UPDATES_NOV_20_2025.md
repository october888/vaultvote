# VaultVote Updates - November 20, 2025

## Summary
This release includes bug fixes for CORS proxy handling, delete poll functionality, and optimization of the Zama relayer retry logic.

## New Features

### 1. Delete Poll Functionality
- **Created-state elections** now show a "Delete" button (owner-only)
- Soft-delete implementation using existing `hidden` metadata flag
- Confirmation dialog before deletion to prevent accidental removal
- Non-created elections still have Hide/Unhide toggle functionality

**Files Changed:**
- `client/src/components/ElectionCard.tsx` - Added delete button and confirmation
- `client/src/pages/home.tsx` - Added delete handler
- `client/src/pages/my-elections.tsx` - Added delete handler  
- `client/src/pages/explore.tsx` - Added delete handler

### 2. Poll Images Remain Visible
- Election images now stay visible even after the election closes
- Previously images would hide after close/reveal, now they persist for better UX

## Bug Fixes

### 1. CORS Proxy Improvements
- Fixed `/api/fhe/v1/public-decrypt` endpoint to properly handle Zama relayer responses
- Added better error handling and logging for debugging
- Proper JSON parsing with fallback to text responses
- Fixed HTTP 520 error handling from Zama testnet

**Files Changed:**
- `server/routes.ts` - Improved all three FHE proxy endpoints:
  - `/api/fhe/v1/keyurl` (GET)
  - `/api/fhe/v1/public-decrypt` (POST)
  - `/api/fhe/v1/input-proof` (POST)
- `server/index.ts` - Added express import for middleware

### 2. Retry Logic Optimization
- **Removed** 3-attempt exponential backoff retry logic for decryption
- Now uses single-attempt for faster failure feedback
- Users can manually retry by clicking "Reveal Results" again
- Reduces wait time from up to 14 seconds to immediate failure

**Files Changed:**
- `client/src/lib/fheClient.ts` - Removed retry wrapper from `decryptHandle()`

## Technical Details

### Zama Relayer Integration
The app now properly handles all Zama FHE operations through CORS-bypassing proxy:
1. **Keyurl** - Fetching encryption keys
2. **Input-proof** - Creating encrypted votes
3. **Public-decrypt** - Revealing vote tallies

### Known Issues
- **Zama Testnet Reliability**: The Zama testnet relayer occasionally returns HTTP 520 errors
  - This is a Zama infrastructure issue, not a bug in VaultVote
  - Solution: Manually retry "Reveal Results" - usually works on 2nd or 3rd attempt
  - Expected to be resolved when Zama launches mainnet

## Deployment Notes

All features tested and working on production:
- ✅ Create elections (encryption working)
- ✅ Cast votes (encryption working)  
- ✅ Reveal results (decryption working)
- ✅ Delete polls (soft-delete working)
- ✅ Hide/Unhide polls (metadata toggle working)

## Files Updated
```
server/
  ├── routes.ts (CORS proxy fixes)
  └── index.ts (express import)

client/src/
  ├── lib/
  │   └── fheClient.ts (removed retry logic)
  ├── components/
  │   └── ElectionCard.tsx (delete button)
  └── pages/
      ├── home.tsx (delete handler)
      ├── my-elections.tsx (delete handler)
      └── explore.tsx (delete handler)
```

## Deployment
This code is ready for GitHub deployment. All changes have been tested on the live site at vaultvoteorignal.digital.

Contract Address: `0x3928E3F37607Fe565c4669bc0721F5e15383c99E`
Network: Sepolia Testnet with Zama fhEVM v0.9
