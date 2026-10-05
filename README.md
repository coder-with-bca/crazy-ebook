# Crazy E-Book

Static storefront for Crazy E-Book by Akki & Aadi. It keeps the existing single-page catalogue, search, categories, previews, book upload, UPI QR, admin login, showcase settings, and private delivery-link storage.

## Files

- `index.html` — storefront, Supabase admin portal, checkout, purchase management, and testimonials.
- `supabase-setup.sql` — additive database setup, row-level security, purchase creation, and catalogue sync.
- `supabase/functions/send-purchase-telegram/index.ts` — secure server-side Telegram notification function.
- `upi-qr.jpg` — existing QR payment image.

## What changed

- Each book has a unique Book ID. The existing book catalogue remains the admin-managed source; a trigger mirrors it into `public.books` for database-side price and Book ID verification.
- Orders are created by one database function that loads the selected book's current price and snapshots its Book ID, title, price, customer contact, and unique Purchase ID. Payment and order start as Pending. A browser-generated one-time access token is stored only as a database hash.
- WhatsApp or Telegram is required; the customer does not need to provide both.
- Admin-only Purchases and Telegram callback buttons update the same Supabase purchase. Admin actions are mirrored to the Telegram message, and changes from Telegram appear in Purchases polling within 15 seconds.
- Admin Purchases has status filters, customer contact shortcuts, a purchase details view, and a copy-details action. Delivery can only be marked after payment is marked Paid.
- Testimonials are admin-created and can be edited, shown/hidden, or deleted. Public text identifies these as featured comments, not verified purchase reviews.
- Admin → Settings updates the public brand, creators, UPI ID, support email, support Telegram, purchase channel, Instagram, and bot username. Never enter the bot token there.
- The existing Private Book Delivery URL remains in `admin_store_private`, keyed to the exact book record. Deleting a catalog entry archives its relational row and retains its private link for past purchases. A database function returns the URL only when the customer's per-purchase access token matches and the purchase is Paid and Approved. The URL is not added to the public books table. Telegram token, admin IDs, webhook secret, and service-role key are server-side only.

## 1. Run the SQL

1. Open your Supabase project at [supabase.com/dashboard](https://supabase.com/dashboard).
2. Choose **SQL Editor** → **New query**.
3. Open `supabase-setup.sql` from this folder, copy the whole file, paste it into the editor, and click **Run**. It preserves the existing storefront tables and policies and adds the new tables/functions.
4. If your existing storefront row already contains books, the SQL backfills them. Otherwise sign in to the Admin Portal and save one existing book once; that writes the current catalogue and syncs every book. Do this before accepting purchases.

For an existing installation, rerun the full SQL file after site updates that change the purchase schema. The current script adds private access-token hashes and Telegram message IDs, guards paid/delivered/rejected transitions, and adds the customer status/delivery lookup. It does not delete purchase rows or books.

The owner email in the SQL must match the existing `ADMIN_EMAIL` in `index.html` (`crazyebook.official@gmail.com`). If you change the admin email, change the matching email in the SQL policies too. Do not turn on public signup for the owner account.

## 2. Deploy Telegram notifications

### Add the bot to the channel

1. Open the **Crazy E-Book** channel in Telegram.
2. Open the channel name → **Administrators** → **Add Admin**.
3. Search for `@CrazyEbookPurchaseBot`, add it, and allow **Post Messages**. It does not need permission to manage the channel.
4. Post a new test message in the channel after adding the bot.

### Configure the notification destination

The bot `@CrazyEbookPurchaseBot` is already expected to be an administrator of the public purchase channel. The Edge Function accepts a public channel username, so set `TELEGRAM_CHANNEL_ID` to **`@crazyebook`**. A numeric channel ID is not required for this public channel. Keep the bot token private and enter it only in Supabase Secrets.

### Add secrets and deploy

1. In Supabase Dashboard, open **Edge Functions** → **Secrets**. Keep `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHANNEL_ID` (`@crazyebook`) there. Add `TELEGRAM_ADMIN_IDS` with the owner's numeric Telegram user ID(s), comma-separated, and `TELEGRAM_WEBHOOK_SECRET` with a random 32-byte hex string. Never put these values in `index.html` or GitHub.
2. Install the Supabase CLI using the official [CLI installation guide](https://supabase.com/docs/guides/cli/getting-started). Open PowerShell in this project folder (`C:\Users\adity\downloads\crazyebook`) by File Explorer address bar → type `powershell` → Enter.
3. Run these commands one at a time:

   ```powershell
   supabase login
   supabase link --project-ref YOUR_PROJECT_REF
   supabase functions deploy send-purchase-telegram
   ```

   Find `YOUR_PROJECT_REF` in your Supabase project URL: in `https://YOUR_PROJECT_REF.supabase.co`, it is the part before `.supabase.co`. `supabase login` opens a browser to sign in. If the CLI says the project is not initialized, run `supabase init` from this same folder, then repeat `supabase link` and deploy.

The deployed function receives new purchase IDs, atomically claims the notification, and posts inline Approve/Reject buttons. Telegram callback requests are checked against `TELEGRAM_WEBHOOK_SECRET` and `TELEGRAM_ADMIN_IDS`. The owner Admin Portal also uses the function to update the same Telegram message after changing a purchase. Telegram webhooks require the function URL and the same webhook secret in Telegram's `setWebhook` call. Follow the PowerShell setup instructions provided with this update. Redeploy this function after code/config changes.

After you know your numeric Telegram user ID (for example, by asking a Telegram ID lookup bot), open PowerShell in the project folder and run:

```powershell
$adminIds = Read-Host 'Numeric Telegram user ID(s), comma-separated'
$randomBytes = New-Object byte[] 32
$rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
$rng.GetBytes($randomBytes)
$webhookSecret = -join ($randomBytes | ForEach-Object { $_.ToString('x2') })
supabase secrets set "TELEGRAM_ADMIN_IDS=$adminIds" "TELEGRAM_WEBHOOK_SECRET=$webhookSecret"

$secureToken = Read-Host 'Bot token' -AsSecureString
$tokenPointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secureToken)
$botToken = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($tokenPointer)
try {
  $body = @{ url = 'https://YOUR_PROJECT_REF.supabase.co/functions/v1/send-purchase-telegram'; secret_token = $webhookSecret; allowed_updates = '["callback_query"]' }
  Invoke-RestMethod -Method Post -Uri "https://api.telegram.org/bot$botToken/setWebhook" -Body $body
} finally {
  [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($tokenPointer)
  $botToken = $null
  $secureToken.Dispose()
}
```

Replace `YOUR_PROJECT_REF` with the part of your Supabase URL before `.supabase.co`. The token is entered through a secure prompt, not stored in the project. The returned Telegram response should report success.

## 3. Test the purchase flow

1. Host the site over HTTPS and open it. Make sure `SUPABASE_URL`, `SUPABASE_ANON_KEY` (publishable key), and `ADMIN_EMAIL` in `index.html` match your project.
2. Sign in to Admin Portal, save an existing book once if needed to sync the catalogue, and confirm its Book ID is unique.
3. Open the site in a private/incognito window. Choose a paid book and enter a name plus either a WhatsApp number or Telegram username. Leaving both contact fields blank should show the contact message.
4. Create an order. It should display a unique `CEB-YYYYMMDD-` purchase ID, the database price, and Pending status. The QR remains available; **Pay Now** attempts the UPI app with the configured UPI ID and the exact amount. The button does not mark an order Paid.
5. Confirm the Telegram post and its buttons. Approve or reject from Admin → Purchases or from Telegram. The customer status card polls while open and restores from its browser's per-purchase token; only Paid + Approved purchases receive the private URL. Mark Delivered remains an admin tracking action. Test status synchronization, contact links, and testimonial management.

If an order creation error occurs, verify that `supabase-setup.sql` ran successfully and that the relational `books` table is populated. Do not expose a service-role key or Telegram token in browser code. The browser only uses the Supabase publishable/anon key; database RLS protects admin operations.

## Existing links

- Instagram: @crazyebook.official
- Telegram: https://t.me/crazyebookofficial

## Contact and delivery

- Brand: Crazy E-Book, by Akki & Aadi.
- Customer/support Telegram: [@crazyebookofficial](https://t.me/crazyebookofficial).
- Purchase notifications: [@crazyebook](https://t.me/crazyebook). Bot: [@CrazyEbookPurchaseBot](https://t.me/CrazyEbookPurchaseBot).
- UPI: `akashmaurya18@upi`; keep the root `upi-qr.jpg` in the deployed site.
- Support email: `crazyebook.official@gmail.com`.
- Instagram: [@crazyebook.official](https://www.instagram.com/crazyebook.official?stkn=YmNlZm9iN2Nlczhl).

Delivery unlocks on the website after payment approval. The customer uses **Download Your Ebook** to open the matching book's private Drive link. **Mark Delivered** is for admin tracking. Use **Copy Purchase Details** when needed. Add only real books and real customer-approved testimonials in Admin; starter/demo books are not published.

By Akki & Aadi
