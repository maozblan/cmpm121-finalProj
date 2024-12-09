import { get, type Writable, writable } from 'svelte/store';

export const currTab: Writable<string | null> = writable(null);

export function toggleTab(tab: string): void {
  if (get(currTab) === tab) {
    currTab.set(null);
    return;
  }
  currTab.set(tab);
}
