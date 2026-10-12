"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { ProductDTO } from "@/lib/types";
import { useCart } from "./CartProvider";
import { IconHeart } from "./Icons";
import { QuickAddSheet } from "./QuickAddSheet";

interface Props {
  product: ProductDTO;
  priority?: boolean;
}

/* Badge color mapping based on tags */
function getBadge(product: ProductDTO): { label: string; className: string } | null {
  const tags = product.tags.map((t) => t.toLowerCase());
  if (tags.includes("best-seller") || tags.includes("bestseller")) {
    return { label: "Best Seller", className: "badge-bestseller" };
  }
  if (tags.includes("nouveau") || tags.includes("new")) {
    return { label: "Nouveau", className: "badge-nouveau" };
  }
  if (tags.includes("édition limitée") || tags.includes("limited") || tags.includes("edition-limitee")) {
    return { label: "Édition Limitée", className: "badge-limited" };
  }
  if (tags.includes("premium")) {
    return { label: "Premium", className: "badge-limited" };
  }
  return null;
}

/* Button accent color based on product tags/category */
function getAccentColor(product: ProductDTO): string {
  const tags = product.tags.map((t) => t.toLowerCase());
  if (tags.includes("best-seller") || tags.includes("bestseller")) return "#6b1d2a";
  if (tags.includes("nouveau") || tags.includes("new")) return "#c9a96e";
  if (tags.includes("premium")) return "#1a1a2e";
  if (tags.includes("édition limitée") || tags.includes("limited")) return "#2d2d2d";
  if (tags.includes("solde")) return "#8b6914";
  return "#0a0a0a";
}

export function ProductCard({ product, priority }: Props) {
  const { toggleFavorite, isFavorite } = useCart();
  const [sheetOpen, setSheetOpen] = useState(false);
  const fav = isFavorite(product.slug);
  const onSale =
    product.comparePrice !== null && product.comparePrice > product.price;

  const badge = getBadge(product);
  const accentColor = getAccentColor(product);

  return (
    <article className="group fade-in flex flex-col">
      {/* Image container */}
      <div 
        className="zoom-container relative aspect-[3/4] overflow-hidden rounded-xl"
        style={{ backgroundColor: 'var(--product-card-bg, #f5f0eb)' }}
      >
        <Link href={`/produit/${product.slug}`} aria-label={product.name}>
          {(() => {
            const url = product.images[0]?.url ?? "";
            const isVideo = /\.(mp4|webm|mov|ogg)(\?|$)/i.test(url) || url.includes("video");
            if (isVideo) {
              return (
                <video
                  src={url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="zoom-img h-full w-full object-cover pointer-events-none"
                />
              );
            }
            return (
              <Image
                src={url}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                priority={priority}
                className="zoom-img object-cover"
              />
            );
          })()}
        </Link>

        {/* Badge */}
        {badge && (
          <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-wider shadow-sm ${badge.className}`}>
            {badge.label}
          </span>
        )}

        {/* Sale badge (if no other badge) */}
        {onSale && !badge && (
          <span className="absolute left-3 top-3 rounded-full bg-red-600 px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-white shadow-sm">
            Promo
          </span>
        )}

        {/* Heart icon */}
        <button
          type="button"
          aria-label={fav ? "Retirer des favoris" : "Ajouter aux favoris"}
          onClick={() => toggleFavorite(product.slug)}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-sm transition-all duration-300 hover:scale-110 hover:bg-white z-10"
          style={{ color: fav ? '#e53e3e' : '#666666' }}
        >
          <IconHeart size={14} filled={fav} />
        </button>
      </div>

      {/* Product info */}
      <div className="mt-3 flex-1">
        <Link href={`/produit/${product.slug}`}>
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 transition-smooth hover:opacity-70 line-clamp-1">
            {product.name}
          </h3>
        </Link>
        {product.colors.length > 0 && (
          <p className="mt-0.5 text-[11px] text-neutral-500">
            {product.colors.join(" · ")}
          </p>
        )}
      </div>

      {/* Price */}
      <div className="mt-1.5 flex items-baseline gap-2">
        <span className="text-sm font-bold text-gray-900">
          {product.price.toLocaleString("fr-DZ")} {product.currency}
        </span>
        {onSale && (
          <span className="text-xs text-neutral-400 line-through">
            {product.comparePrice!.toLocaleString("fr-DZ")} {product.currency}
          </span>
        )}
      </div>

      {/* Add to cart button */}
      <button
        type="button"
        onClick={() => setSheetOpen(true)}
        className="mt-2.5 w-full rounded-full py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:opacity-90 active:scale-[0.98]"
        style={{ backgroundColor: accentColor }}
      >
        Ajouter au panier
      </button>

      {/* Quick-add bottom sheet */}
      <QuickAddSheet
        product={product}
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
      />
    </article>
  );
}