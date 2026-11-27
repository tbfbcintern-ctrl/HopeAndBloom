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

### Production build

Mula sa repository root, patakbuhin:

```powershell
npm.cmd run build
```

## Project structure

The page entry point is `HopeAndBloom-main/HopeAndBloom/index.html`; the React
app starts in `HopeAndBloom-main/HopeAndBloom/src/main.jsx`. Reusable page
components are in `HopeAndBloom-main/HopeAndBloom/src/components/`. The center
photos and logo are in `HopeAndBloom-main/images/` and are bundled by Vite.

## Website details

- Headings use Poppins; body text uses Roboto.
- An ABA therapy session costs 1,200.
- The assessment package, including a student handbook and uniform, costs 2,500.