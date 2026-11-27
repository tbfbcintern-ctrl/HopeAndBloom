# HopeAndBloom

Hope and Bloom Child Development Center website.

## Running the site locally

You need [Node.js](https://nodejs.org/) to use npm. From the repository root,
run these commands in PowerShell:

```powershell
npm.cmd install
npm.cmd run dev
```

Use `npm.cmd` because PowerShell's execution policy may block the `npm`
command.

Open the URL Vite displays in the terminal, usually
`http://localhost:5173/`. To stop the server, press `Ctrl+C` in the terminal.

### Admin preview

Open `http://localhost:5173/admin` to view the admin dashboard preview.
Contact-form submissions appear under **Inquiries** and are saved in the current
browser's local storage. There is no authentication or encryption, so use test
details only; do not enter real family or child information. You can add
internal comments to inquiries and mark them as done. Under **Appointments**,
you can select a date and create a demo appointment. Under **Programs**, you can
add, edit, publish, or hide a service; updates appear in the public Programs
section in the same browser. This is local demo data only; it is not synced
across devices or sent to an email address or server.

### Promo payment preview

The promo cards open a demo checkout with a selectable payment-method preview.
It does not connect to PayMongo, send a payment request, collect payment
details, charge money, or activate a package. Completing the simulation adds a
demo alert, including the parent/guardian test name, in the admin preview for
the same browser only; the alert is not proof of payment. Use fake names only;
do not enter real payment or personal information.

### Production build

From the repository root, run:
```powershell
npm.cmd run build
```

## Project structure

The page entry point is `HopeAndBloom-main/HopeAndBloom/index.html`; the React
app starts in `HopeAndBloom-main/HopeAndBloom/src/main.jsx`. Reusable page
sections are in `HopeAndBloom-main/HopeAndBloom/src/components/sections/`, and
the admin preview is divided into focused components in
`HopeAndBloom-main/HopeAndBloom/src/components/admin/`. Browser-local data
models live in `HopeAndBloom-main/HopeAndBloom/src/data/`; shared date helpers
are in `HopeAndBloom-main/HopeAndBloom/src/utils/`. Styles are grouped into
base, public-site, admin, and responsive files under
`HopeAndBloom-main/HopeAndBloom/src/styles/`. The center photos and logo are in
`HopeAndBloom-main/images/` and are bundled by Vite. Public-page behaviors are
initialized from `HopeAndBloom-main/HopeAndBloom/src/interactions.js`.

## Website details

- Headings use Poppins; body text uses Roboto.
- An ABA therapy session costs 1,200.
- The assessment package, including a student handbook and uniform, costs 2,500.

## Website details

- Headings use Poppins; body text uses Roboto.
- An ABA therapy session costs 1,200.
- The assessment package, including a student handbook and uniform, costs 2,500.
