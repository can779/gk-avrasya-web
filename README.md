# GK Avrasya Avukatlık Bürosu — Web Sitesi

Kaynak: `GK Avrasya v13.dc.html` (tasarım ve içerik birebir korunmuştur).

## Yapı
```
public/
  index.html        Sitenin tamamı (14 sayfa, TR/EN/AR, hash yönlendirme: #/hakkimizda …)
  support.js        Sayfa çalışma zamanı (React'i yerel /vendor'dan yükler)
  vendor/           React 18.3.1 UMD (CDN bağımlılığı yok)
  assets/           Görseller, logo ve hero videosu
  env.js            Yerel geliştirme için boş anahtar
scripts/build.mjs   public/ → dist/ kopyalar, env.js'i ortam değişkeninden üretir
```

## Yerel çalıştırma
```
cp .env.example .env     # anahtarı girin (isteğe bağlı)
npm run preview          # http://localhost:4173
```
Not: index.html doğrudan dosya olarak (file://) açılmaz; bir sunucu üzerinden açın.

## Yayın
**Vercel** veya **Netlify**: depoyu bağlayın; ayarlar `vercel.json` / `netlify.toml` içinde hazır
(Build: `npm run build`, Çıktı: `dist`). Ortam değişkeni olarak ekleyin:

`VITE_GOOGLE_MAPS_API_KEY` — Google Cloud'da **Maps JavaScript API** ve **Geocoding API** açık,
HTTP referrer kısıtlaması alan adınıza ayarlı olmalı. Anahtar yoksa her avukat için anahtarsız Google Maps gömme haritası gösterilir.

## Yönlendirme
Sayfalar hash tabanlıdır (`/#/iletisim`, `/#/avukatlarimiz/nada-karadirek`), bu yüzden sunucuda yönlendirme kuralı gerekmez.

## Düzenleme noktaları (index.html içindeki betik)
- `LAWYERS` — avukat bilgileri, adresler; kesin koordinat varsa `lat/lng`
- `CONTACT` — telefon / e-posta / WhatsApp (boş alanlar sitede görünmez)
- `I18N`, `AREA_T`, `ART_T`, `LAW_T` — çeviriler

## Harici bağlantılar
Google Fonts (Noto Serif/Sans/Arabic), Google Maps, Unsplash görselleri (çalışma alanları ve yazılar).
