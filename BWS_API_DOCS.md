# BWS API Documentation

Base URL: `/api` (lihat `routes/bws.php`, dimuat dengan prefix `api` di `RouteServiceProvider`).

Semua response dalam format JSON.

---

## Articles

### GET /api/articles/latest
4 artikel terbaru.

**Response**
```json
[
  {
    "id": 1,
    "slug": "judul-berita",
    "url": "http://app/api/articles/judul-berita",
    "title": "Judul Berita",
    "excerpt": "Paragraf singkat...",
    "category": "Berita",
    "categoryColor": "bg-blue-100 text-blue-800",
    "image": "https://ik.imagekit.io/.../gambar.jpg",
    "readTime": "3 menit",
    "views": 120,
    "publishedAt": "15 Sep 2026"
  }
]
```

### GET /api/articles
List artikel dengan pagination.

**Query params**

| Param | Default | Keterangan |
|---|---|---|
| `per_page` | `10` | Jumlah data per halaman |

**Response**
```json
{
  "data": [ { "...artikel..." } ],
  "next_page_url": "http://app/api/articles?page=2"
}
```

### GET /api/articles/{slug}
Detail satu artikel (field artikel + `content` berisi HTML isi).

**Response**
```json
{
  "id": 1,
  "slug": "judul-berita",
  "title": "Judul Berita",
  "content": "<p>Isi lengkap...</p>"
}
```

---

## Categories

### GET /api/categories
List kategori yang `published = true`.

### GET /api/categories/{alias}
Detail kategori + artikel di dalamnya (paginate 6 per halaman).

**Response**
```json
{
  "category": { "id": 1, "name": "Berita", "alias": "berita" },
  "articles": {
    "data": [],
    "current_page": 1
  }
}
```

---

## Products

### GET /api/products
List produk dengan pagination.

**Query params**

| Param | Default | Keterangan |
|---|---|---|
| `category_id` | - | Filter kategori (mis. `5` = peta, `4` = infografis, `8` = pejabat) |
| `featured` | - | Filter unggulan (`1` / `0`) |
| `per_page` | `12` | Jumlah data per halaman |

Contoh: `GET /api/products?category_id=5&featured=1`

### GET /api/products/{slug}
Detail satu produk.

---

## Slideshows

### GET /api/slideshows
List slideshow yang `publish = true`.

---

## Menus

### GET /api/menus
Struktur menu pohon nested multi-level (tanpa batas kedalaman).

**Cara kerja nesting**
- Menu top-level: `publish = true` dan `parent = 0`, diurut `ordering ASC`
- Tiap menu memuat anaknya lewat relasi `childrenRecursive`
  (`parent` → `id` induk), difilter `publish = true`, diurut `ordering ASC`
- Berlaku rekursif: anak memuat cucunya, cucu memuat cicitnya, dst.
- Tiap level hanya membawa kolom: `id`, `parent`, `url`, `target`,
  `judul`, `slug`, `publish`
- Menu tanpa anak → `children_recursive: []`
- Key nested selalu bernama `children_recursive` (mengikuti nama relasi)

**Response** (contoh 3 level)
```json
[
  {
    "id": 1,
    "parent": 0,
    "url": "/profil",
    "target": "_self",
    "judul": "Profil",
    "slug": "profil",
    "publish": true,
    "children_recursive": [
      {
        "id": 2,
        "parent": 1,
        "url": "/profil/visi-misi",
        "target": "_self",
        "judul": "Visi Misi",
        "slug": "visi-misi",
        "publish": true,
        "children_recursive": [
          {
            "id": 3,
            "parent": 2,
            "url": "/profil/visi-misi/tugas-fungsi",
            "target": "_self",
            "judul": "Tugas & Fungsi",
            "slug": "tugas-fungsi",
            "publish": true,
            "children_recursive": []
          }
        ]
      },
      {
        "id": 4,
        "parent": 1,
        "url": "https://eksternal.go.id",
        "target": "_blank",
        "judul": "Link Eksternal",
        "slug": "link-eksternal",
        "publish": true,
        "children_recursive": []
      }
    ]
  }
]
```

**Catatan field**
- `parent` — `0` berarti menu utama; selain itu berisi `id` induknya
- `target` — `_self` (buka di tab yang sama) atau `_blank` (tab baru,
  biasanya untuk link eksternal)
- `url` — bisa path internal (`/profil/...`) atau URL eksternal penuh

---

## Feedback

### GET /api/feedback
Rekapitulasi voting.

**Response**
```json
{
  "counts": { "puas": 10, "tidak_puas": 2 },
  "totalVotes": 12,
  "alreadyVoted": false
}
```

### POST /api/feedback
Kirim voting (satu IP hanya bisa vote sekali).

**Body**
```json
{ "feedback": "puas" }
```

**Response**
- `201` — vote tersimpan
- `409` — `{ "message": "Already voted" }`
- `422` — validasi gagal (`feedback` wajib string, maks 255)

---

## Visitor

### GET /api/visitor
Jumlah pengunjung.

**Response**
```json
{ "visitorCount": 1234 }
```

---

## Website (aggregate / legacy)

> Setiap request ke controller ini ikut memuat data bersama dari constructor:
> `menus` (pohon menu), `category` (semua kategori published), `articles`
> (6 artikel terbaru + relasi kategori).

### GET /api/website
Data agregat halaman home.

**Response**
```json
{
  "articles": {
    "current_page": 1,
    "data": [
      {
        "id": 10,
        "slug": "peresmian-bendung",
        "judul": "Peresmian Bendung",
        "metadesc": "Ringkasan berita...",
        "image": "berita/10/gambar.jpg",
        "language": "form",
        "published": 1,
        "created_at": "2026-09-15T08:00:00.000000Z",
        "kategori_id": 1,
        "categories": { "id": 1, "name": "Berita" }
      }
    ],
    "per_page": 6,
    "total": 42
  },
  "slideshows": [
    {
      "id": 1,
      "judul": "Selamat Datang",
      "image": "slideshow/banner.jpg",
      "url": "/profil",
      "publish": true
    }
  ],
    {
      "id": 1,
      "parent": 0,
      "url": "/profil",
      "target": "_self",
      "judul": "Profil",
      "slug": "profil",
      "publish": true,
      "ordering": 1,
      "children_recursive": [
        {
          "id": 2,
          "parent": 1,
          "url": "/profil/visi-misi",
          "target": "_self",
          "judul": "Visi Misi",
          "slug": "visi-misi",
          "publish": true,
          "children_recursive": [
            {
              "id": 3,
              "parent": 2,
              "url": "/profil/visi-misi/tugas-fungsi",
              "target": "_self",
              "judul": "Tugas & Fungsi",
              "slug": "tugas-fungsi",
              "publish": true,
              "children_recursive": []
            }
          ]
        }
      ]
    }
  ],
  "pengumumans": {
    "current_page": 1,
    "data": [
      {
        "id": 7,
        "slug": "pengumuman-libur",
        "judul": "Pengumuman Libur",
        "language": "form",
        "published": 1,
        "created_at": "2026-09-14T08:00:00.000000Z",
        "kategori_id": 2
      }
    ],
    "per_page": 3,
    "total": 5
  },
  "visitorCount": 1234,
  "counts": { "puas": 10, "tidak_puas": 2 },
  "totalVotes": 12,
  "alreadyVoted": false,
  "dataPeta": [
    {
      "id": 3,
      "nama": "Peta DAS Sumatera",
      "image": "produk/peta.jpg",
      "category_id": 5,
      "featured": true
    }
  ],
  "dataInfografis": [
    {
      "id": 8,
      "nama": "Infografis Bendungan",
      "image": "produk/infografis.jpg",
      "category_id": 4,
      "featured": true
    }
  ],
  "dataPejabat": [
    {
      "id": 12,
      "nama": "Kepala Balai",
      "image": "produk/pejabat.jpg",
      "category_id": 8,
      "featured": true
    }
  ]
}
```

Keterangan:
- `articles` — 6 artikel terbaru + relasi `categories`, paginate 6
  (kolom: `id`, `slug`, `judul`, `metadesc`, `image`, `language`,
  `published`, `created_at`, `kategori_id`)
- `menus` — pohon menu nested multi-level (sama seperti `GET /api/menus`).
  Menu utama (`parent = 0`, `publish`, urut `ordering`) membawa kolom
  tambahan `ordering`; tiap anak di `children_recursive` hanya membawa
  `id`, `parent`, `url`, `target`, `judul`, `slug`, `publish` dan
  anak-anaknya lagi secara rekursif. Menu tanpa anak → `children_recursive: []`
- `pengumumans` — artikel `kategori_id = 2`, paginate 3
- `dataPeta` — produk `category_id = 5` + `featured`
- `dataInfografis` — produk `category_id = 4` + `featured`
- `dataPejabat` — produk `category_id = 8` + `featured`
- `alreadyVoted` — `true` jika IP pengunjung sudah pernah vote

### GET /api/website/articles
Cari/list artikel (paginate 6).

**Query params**

| Param | Keterangan |
|---|---|
| `search` | Cari di kolom `judul` (`LIKE %search%`) |

Contoh: `GET /api/website/articles?search=bendung`

**Response**
```json
{
  "title": "Berita",
  "articles": { "data": [], "current_page": 1 },
  "menus": [],
  "search": "bendung"
}
```

### GET /api/website/article/{slug}
Detail satu artikel (semua kolom + relasi `categories`) beserta data sidebar.

**Response**
```json
{
  "category": [],
  "articles": { "data": [] },
  "article": {
    "id": 1,
    "slug": "judul-berita",
    "judul": "Judul Berita",
    "isi": "<p>...</p>",
    "categories": { "id": 1, "name": "Berita" }
  },
  "menus": []
}
```

Error: `404` jika slug tidak ditemukan.

### GET /api/website/category/{alias}
Artikel per kategori (paginate 6).

**Response**
```json
{
  "title": "Berita",
  "articles": { "data": [], "current_page": 1 },
  "menus": [],
  "search": ""
}
```

Error: `404` jika alias tidak ditemukan.

### GET /api/website/page/{slug}
Detail halaman statis + relasi `parents`.

**Response**
```json
{
  "category": [],
  "articles": { "data": [] },
  "article": {
    "id": 5,
    "slug": "profil",
    "judul": "Profil",
    "parents": null
  },
  "menus": []
}
```

> Catatan: isi halaman ada di key `article`.

Error: `404` jika slug tidak ditemukan.

### GET /api/website/product/{slug}
Detail produk. Bentuk response sama seperti page, key `article` berisi objek produk.

Error: `404` jika slug tidak ditemukan.

### GET /api/website/foto
Feed Instagram (via Instagram Graph API).

**Response**
```json
{
  "feeds": [
    {
      "id": "123",
      "caption": "...",
      "permalink": "https://instagram.com/...",
      "media_type": "IMAGE",
      "media_url": "https://...",
      "timestamp": "2026-09-15T00:00:00+0000"
    }
  ],
  "menus": []
}
```

### GET /api/website/video
24 video terbaru channel YouTube (via YouTube Data API, `order=date`).

**Response**
```json
{
  "videos": [
    {
      "id": { "videoId": "abc123" },
      "snippet": { "title": "...", "thumbnails": {} }
    }
  ],
  "menus": []
}
```

### GET /api/website/sitemap
Data untuk peta situs.

**Response**
```json
{
  "articles": { "data": [] },
  "category": [],
  "menus": []
}
```
