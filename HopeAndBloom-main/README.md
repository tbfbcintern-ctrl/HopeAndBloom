# HopeAndBloom

Hope and Bloom Child Development Center website.

## Pagpapatakbo ng site sa local computer

Kailangan ang [Node.js](https://nodejs.org/) para magamit ang npm. Mula sa
repository root, patakbuhin sa PowerShell:

```powershell
npm.cmd install
npm.cmd run dev
```

Ginagamit ang `npm.cmd` dahil maaaring harangin ng PowerShell execution policy
ang `npm` command.

Buksan sa browser ang URL na ipapakita ni Vite sa terminal, karaniwan ay
`http://localhost:5173/`. Para ihinto ang server, pindutin ang `Ctrl+C` sa
terminal.

### Admin preview

Buksan ang `http://localhost:5173/admin` para makita ang admin dashboard preview.
Lalabas sa **Inquiries** ang mga ipinasa sa contact form, at mase-save ang mga ito
sa local storage ng kasalukuyang browser. Walang authentication o encryption;
gamitin lamang ang test details at huwag maglagay ng totoong impormasyon ng
pamilya o bata. Maaaring magdagdag ng internal comment at markahang done ang
inquiry. Sa **Appointments**, maaari ring pumili ng petsa sa calendar at gumawa
ng demo appointment. Sa **Programs**, maaari ring magdagdag, mag-edit, at
mag-publish o magtago ng serbisyo; makikita ang updates sa public Programs
section gamit ang parehong browser. Lahat ng ito ay local demo data lang at
hindi sini-sync sa ibang device o ipinapadala sa email o server.

### Promo payment preview

The promo cards open a demo checkout with a selectable payment-method preview.
It does not connect to PayMongo, send a payment request, collect payment
details, charge money, or activate a package. Completing the simulation adds a
demo alert, including the parent/guardian test name, in the admin preview for
the same browser only; the alert is not proof of payment. Use fake names only;
do not enter real payment or personal information.

### Production build

Mula sa repository root, patakbuhin:

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