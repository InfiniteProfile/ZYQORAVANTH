# ZYQORAVANTH: The Infinite Profile Universe

INFINITE CIVILIZATIONS. ENDLESS IDENTITIES. LIMITLESS DISCOVERY.

A static site (HTML + CSS + vanilla JS, no dependencies, no backend) that generates an endless universe of fictional identities.

## Run / deploy
Open `index.html`, or push the four files to GitHub Pages or Cloudflare Pages (no build step).

## How the infinity works
- Profile `N` is a pure function of its decimal-string ID. A 128-bit hash of every character seeds an sfc32 PRNG, so any ID, however long, always regenerates the same profile.
- IDs are never converted to Number/parseInt/parseFloat. `inc`/`dec` are decimal-string arithmetic; matching is exact string equality. There is no maximum ID length and no maximum profile count.
- 360 profiles render at load. When the viewport comes within ~260 profiles of the end of generated content (about profile 100 of the first 360), a 300-profile batch is generated in short time slices. This repeats forever.
- Batches are triggered by scroll, an IntersectionObserver sentinel, and a 700 ms timer. The timer and scroll paths keep working if IntersectionObserver is missing.
- New pages are appended below the viewport and the page never calls scrollTo during browsing, so the scroll position is preserved.
- Memory: at most ~840 cards stay in the DOM. Far-away pages are replaced by fixed-height placeholders and re-rendered from their IDs on demand.
- Civilizations, homeworlds and species are shared by each block of 1000 consecutive IDs, so societies recur and are searchable.

## Search
- Digits only (e.g. `123456789012345678901234567890`): jumps to that exact ID and the feed continues from it. IDs that haven't been rendered yet work too.
- Text (name, civilization, homeworld, species, occupation; several words are ANDed): the endless universe is scanned in the background and matches stream in.

## Details
Clicking a card opens `#p/<ID>`. Back, Esc, or the Back button returns to the feed at the same scroll position. Previous/Next identity and "Explore from here" are included.

## Files
`index.html` · `style.css` · `script.js` · `README.md`
