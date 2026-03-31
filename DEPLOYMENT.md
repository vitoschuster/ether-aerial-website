# Deployment Blueprint — Zero-Cost Production Stack

## Stack Overview

| Layer | Service | Cost |
|---|---|---|
| Frontend hosting | Vercel Hobby Plan | $0/mo |
| Video & image storage | Cloudflare R2 | $0 (first 10 GB) / $0.015/GB after |
| DNS & CDN | Cloudflare Free | $0 |
| Image CDN (optional) | Cloudinary Free Tier | $0 (25 GB/mo) |

**Total: $0–$1/month for a portfolio at any traffic level.**

---

## 1. Vercel (Frontend)

- Connect GitHub repo at vercel.com/new
- Framework: Next.js (auto-detected)
- Every push to `main` → automatic production deploy
- Every PR → preview URL (great for reviewing changes)
- Set environment variables in Vercel dashboard (e.g. `NEXT_PUBLIC_R2_BASE_URL`)
- Add custom domain in Settings → Domains

> **Note:** Vercel Hobby is for personal/non-commercial use. A freelancer portfolio
> generally flies under the radar. If the business grows, upgrade to Pro ($20/mo).

---

## 2. Cloudflare R2 (Video & Image Storage)

### Why R2 over Vimeo/AWS S3?
- **$0 egress** — S3 charges ~$0.09/GB out. R2 is free. Stream to 1M users, pay nothing.
- 10 GB free storage, then $0.015/GB/month.
- For ~50 GB of portfolio videos: ~$0.60/month.

### Setup
1. cloudflare.com → R2 → Create bucket (e.g. `ether-aerial-media`)
2. Settings → Public Access → Enable (or use a custom domain)
3. Upload compressed `.mp4` files
4. Copy the public URL: `https://pub-HASH.r2.dev/filename.mp4`

### Compress videos before upload (ffmpeg)
```bash
# Good quality, small file (~30–50 MB for a 1-min clip at 1080p)
ffmpeg -i input.mp4 \
  -vcodec libx264 -crf 23 -preset slow \
  -acodec aac -b:a 128k \
  -vf "scale=1920:-2" \
  -movflags +faststart \
  output-compressed.mp4
```

### Using videos in the site
In `src/data/projects.ts`, uncomment `videoSrc` and set the R2 URL:
```ts
videoSrc: 'https://pub-HASH.r2.dev/bmw-m3-cs-touring.mp4',
```

The `<video>` element in VideoPanel uses `preload="none"` — video data is only
downloaded when the panel is hovered (desktop) or scrolled to (mobile).

### Custom domain on R2 (optional, looks cleaner)
In R2 bucket → Settings → Custom domain → e.g. `media.etheraerial.com`
Then URLs become: `https://media.etheraerial.com/bmw-m3-cs-touring.mp4`

---

## 3. Image Hosting

**Option A — Cloudflare R2 (simplest):**
Drop high-res portfolio JPGs into the same R2 bucket. Reference them in `projects.ts`.
The project thumbnail images in `/public/images/projects/` are fine for now (they're
already compressed YouTube thumbnails at 1280×720). Move them to R2 when the
Vercel deployment bandwidth becomes a concern.

**Option B — Cloudinary (auto-compress + WebP):**
- cloudinary.com free tier: 25 GB/mo bandwidth
- Upload images → get a URL with on-the-fly transforms:
  `https://res.cloudinary.com/YOUR_CLOUD/image/upload/w_1280,q_auto/photo.jpg`
- Automatically serves WebP to modern browsers

---

## 4. GitHub → Vercel CI/CD

After connecting the repo to Vercel:
```bash
# Normal workflow:
git add .
git commit -m "update project data"
git push
# → Vercel detects push → builds → deploys in ~60 seconds
```

Preview deployments:
```bash
git checkout -b feature/new-animation
git push -u origin feature/new-animation
# → Vercel creates preview URL automatically
```

---

## 5. Environment Variables

Add to Vercel dashboard (Settings → Environment Variables):
```
NEXT_PUBLIC_R2_BASE_URL=https://media.etheraerial.com
# or: https://pub-HASH.r2.dev
```

Use in code:
```ts
videoSrc: `${process.env.NEXT_PUBLIC_R2_BASE_URL}/bmw-m3-cs-touring.mp4`
```

---

## 6. Domain Setup (Cloudflare DNS)

1. Add domain to Cloudflare (free)
2. In Vercel: Settings → Domains → add `etheraerial.com`
3. Vercel gives you DNS records to add in Cloudflare
4. Cloudflare proxies the traffic (free DDoS protection, CDN)

---

## Video Upload Checklist

- [ ] Compress `57 - fran_showreel_v1 2.mp4` (876 MB → target ~80 MB at 1080p)
- [ ] Compress `51 - THE BMW M3 CS TOURING.mp4` (38 MB → likely fine as-is)
- [ ] Compress `54 - THE BMW M3 CS TOURING.mp4` (22 MB → fine)
- [ ] Compress `55 - THE NEW BMW M2 COUPÉ..mp4` (35 MB → fine)
- [ ] Compress `56 - The new 911...mp4` (66 MB → compress to ~30 MB)
- [ ] Compress `53 - porsche.mp4` (51 MB → compress to ~25 MB)
- [ ] Compress `52 - bmw_2.mp4` (62 MB → compress to ~30 MB)
- [ ] Compress `49 - juznivetar_bw.mp4` (62 MB → compress to ~30 MB)
- [ ] Upload all to R2 bucket
- [ ] Update `videoSrc` fields in `src/data/projects.ts`
- [ ] Add YouTube IDs for music video projects
