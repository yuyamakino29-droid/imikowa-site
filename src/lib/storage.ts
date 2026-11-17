"use client";

/**
 * localStorage に保存する読者ごとの設定（しおり・ゾッとした・文字サイズ）。
 * useSyncExternalStore で読むため、サーバー描画時は初期値、ブラウザでは保存値になる。
 * 別タブでの変更も storage イベントで反映する。
 */

import { useSyncExternalStore } from "react";
import { FONT_SIZES, STORAGE_KEYS, type FontSize } from "./prefs";

export { FONT_SIZES, type FontSize };

const KEYS = STORAGE_KEYS;

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === null || Object.values(KEYS).includes(e.key as never)) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function emit() {
  for (const l of listeners) l();
}

function readRaw(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeRaw(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // プライベートモード等で保存できない場合は、このページ表示中だけの状態になる
    memoryFallback.set(key, value);
  }
  emit();
}

const memoryFallback = new Map<string, string>();

/* ---------- ID のリスト（しおり・ゾッとした） ---------- */

const EMPTY: readonly string[] = Object.freeze([]);
const listCache = new Map<string, { raw: string | null; value: readonly string[] }>();

function readList(key: string): readonly string[] {
  const raw = readRaw(key) ?? memoryFallback.get(key) ?? null;
  const cached = listCache.get(key);
  if (cached && cached.raw === raw) return cached.value;
  let value: readonly string[] = EMPTY;
  try {
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    if (Array.isArray(parsed)) value = parsed.filter((v): v is string => typeof v === "string");
  } catch {
    value = EMPTY;
  }
  listCache.set(key, { raw, value });
  return value;
}

function toggleInList(key: string, id: string) {
  const list = readList(key);
  const next = list.includes(id) ? list.filter((v) => v !== id) : [...list, id];
  writeRaw(key, JSON.stringify(next));
}

function useList(key: string) {
  return useSyncExternalStore(
    subscribe,
    () => readList(key),
    () => EMPTY,
  );
}

export function useBookmarks() {
  return useList(KEYS.bookmarks);
}
export const toggleBookmark = (id: string) => toggleInList(KEYS.bookmarks, id);

export function useZotto() {
  return useList(KEYS.zotto);
}
export const toggleZotto = (id: string) => toggleInList(KEYS.zotto, id);

/* ---------- 文字サイズ ---------- */

function readFontSize(): FontSize {
  const raw = readRaw(KEYS.fontSize) ?? memoryFallback.get(KEYS.fontSize);
  return (FONT_SIZES as readonly string[]).includes(raw ?? "") ? (raw as FontSize) : "md";
}

export function useFontSize() {
  return useSyncExternalStore(subscribe, readFontSize, () => "md" as FontSize);
}

export function setFontSize(size: FontSize) {
  document.documentElement.dataset.fontSize = size;
  writeRaw(KEYS.fontSize, size);
}
