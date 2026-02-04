# Electricity Meter Type Dropdown Debugging Guide

## Issue
After selecting an electricity provider, the meter type dropdown is not showing prepaid/postpaid options.

## Debug Steps Added

I've added console logging to help identify the issue. Please follow these steps:

### 1. Open the Electricity Modal
- Navigate to the payments page
- Click on "Electricity" to open the modal

### 2. Select a Provider
- Choose any electricity provider (e.g., IKEDC, AEDC, EKEDC)
- Click "CONTINUE"

### 3. Check Console Output
Open your browser's developer console (F12) and look for these debug messages:

```
⚡ [DEBUG] Selected Provider: { name: "...", billerCode: "..." }
⚡ [DEBUG] Fetching variations for billerCode: ...
⚡ [API] Electricity Variations Response: { ... }
⚡ [DEBUG] Meter Types: [...]
⚡ [DEBUG] Meter Types Loading: false
```

## What to Look For

### Scenario 1: billerCode is undefined or empty
**Console shows:**
```
⚡ [DEBUG] Selected Provider: { name: "IKEDC", billerCode: undefined }
```
**Problem:** The provider data doesn't have a `billerCode` field
**Solution:** Check the API response structure for electricity plans

### Scenario 2: API returns 404 or error
**Console shows:**
```
⚡ [API] Electricity Variations Error: ...
```
**Problem:** The billerCode is invalid or the endpoint doesn't exist
**Solution:** Verify the API endpoint and billerCode format

### Scenario 3: Meter Types array is empty
**Console shows:**
```
⚡ [DEBUG] Meter Types: []
```
**Problem:** The API returned successfully but with no variations
**Solution:** Check if the provider has meter types configured in the backend

### Scenario 4: Meter Types structure is wrong
**Console shows:**
```
⚡ [DEBUG] Meter Types: [{ some_field: "...", other_field: "..." }]
```
**Problem:** The field names don't match what the modal expects
**Solution:** Update the field mapping in the modal

## Expected Correct Output

```
⚡ [DEBUG] Selected Provider: { name: "IKEDC", billerCode: "BIL119" }
⚡ [DEBUG] Fetching variations for billerCode: BIL119
⚡ [API] Electricity Variations Response: { data: { data: [...] } }
⚡ [DEBUG] Meter Types: [
  {
    item_code: "AT099",
    short_name: "Prepaid",
    name: "Prepaid Meter",
    fee: 100
  },
  {
    item_code: "AT100",
    short_name: "Postpaid",
    name: "Postpaid Meter",
    fee: 0
  }
]
⚡ [DEBUG] Meter Types Loading: false
```

## Next Steps

After checking the console:

1. **Share the console output** - Copy the debug messages and share them
2. **I'll identify the issue** - Based on the logs, I can pinpoint the exact problem
3. **Apply the fix** - I'll update the code to handle the correct data structure

## Common Issues & Fixes

### Issue: Provider has no billerCode
**Fix:** Update the provider selection to use the correct field:
```typescript
billerCode: p.billerCode || p.biller_code || p.id
```

### Issue: Variations endpoint returns different structure
**Fix:** Update the response parsing in `electricity.queries.ts`

### Issue: Field names don't match
**Fix:** Update the field mapping in the dropdown:
```typescript
name: item.short_name || item.name || item.item_name || item.variation_name
```

## Test This Now

1. Open the app
2. Go to Electricity payment
3. Select a provider
4. Check the console
5. Share the output with me

This will help me fix the issue immediately!
