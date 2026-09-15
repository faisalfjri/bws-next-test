"use client";

export function MapClient() {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-gray-200 sm:aspect-[16/9]">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d578.0165025046962!2d95.33682907383437!3d5.540462960669106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304039daff06829b%3A0x651b92d0583542a5!2sBalai%20Wilayah%20Sungai%20Sumatera%20-%20I!5e1!3m2!1sid!2sid!4v1789464272808!5m2!1sid!2sid"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        className="absolute inset-0 h-full w-full"
        title="Lokasi BWS Sumatera I"
      />
    </div>
  );
}
