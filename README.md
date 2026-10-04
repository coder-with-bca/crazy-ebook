# Crazy E-Book

A small ebook store website for students. Original ebooks from Rs 9 to Rs 49.

## How it works
1. Choose an ebook on the site.
2. Pay by UPI (QR or UPI ID shown at checkout).
3. Send the payment screenshot on Telegram.
4. The admin sends the private download link manually.

## Files
- `index.html` - the full website (single file)
- `supabase-setup.sql` - database tables and Row Level Security policies

## Supabase admin setup
1. Create a Supabase project and create your owner account with a verified email. Disable public signups in Supabase Auth after creating that account.
2. In `supabase-setup.sql`, replace both `YOUR_OWNER_EMAIL@example.com` values with that exact email, then run the script in Supabase SQL Editor.
3. In `index.html`, set `SUPABASE_URL`, `SUPABASE_ANON_KEY` (the publishable/anon key), and `ADMIN_EMAIL` to your project values. The publishable/anon key is designed for browser use; never put a `service_role` or secret key in this file.
4. Host the static site over HTTPS. Open Admin Portal and sign in with the owner email and its Supabase Auth password. The public storefront is readable by visitors; edits and private delivery URLs are restricted by database RLS to that email.
5. If migrating data from an older browser, export it from the old admin portal and import it after signing in. The first successful save writes the catalogue and delivery URLs to Supabase.

The `admin_store_private` table holds delivery URLs and has no anonymous read policy. Keep this SQL and the configured email in sync. Supabase project URL and publishable/anon key are public client configuration, not secrets.

## Links
- Instagram: @crazyebook.official
- Telegram: https://t.me/crazyebookofficial

## Notes
- All ebooks are original. No copyrighted books are sold.
- Do not put private Drive links or passwords in this repository.

By Akki & Aadi
