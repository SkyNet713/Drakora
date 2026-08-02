export type PersonalReptile = {
  id: string;
  name: string;
  speciesSlug: string;
  notes: string;
  age: string;
  weight: string;
  lastFed: string;
  lastWatered: string;
  feedingSchedule: string;
  wateringSchedule: string;
  cleaningSchedule: string;
  substrateSchedule: string;
  createdAt: string;
};

export type UserProfile = {
  email: string;
  displayName: string;
  password: string;
  reptiles: PersonalReptile[];
};

const USER_KEY = "rh_user";
const SESSION_KEY = "rh_session";

function canUseStorage() {
  return typeof window !== "undefined";
}

export function registerUser(
  email: string,
  displayName: string,
  password: string
): { ok: true } | { ok: false; error: string } {
  if (!canUseStorage()) return { ok: false, error: "Storage unavailable" };
  const existing = localStorage.getItem(USER_KEY);
  if (existing) {
    const parsed = JSON.parse(existing) as UserProfile;
    if (parsed.email.toLowerCase() === email.toLowerCase()) {
      return { ok: false, error: "An account with this email already exists on this device." };
    }
  }
  const user: UserProfile = {
    email,
    displayName,
    password,
    reptiles: [],
  };
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  localStorage.setItem(SESSION_KEY, email);
  return { ok: true };
}

export function loginUser(
  email: string,
  password: string
): { ok: true } | { ok: false; error: string } {
  if (!canUseStorage()) return { ok: false, error: "Storage unavailable" };
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return { ok: false, error: "No account found. Create one first." };
  const user = JSON.parse(raw) as UserProfile;
  if (
    user.email.toLowerCase() !== email.toLowerCase() ||
    user.password !== password
  ) {
    return { ok: false, error: "Incorrect email or password." };
  }
  localStorage.setItem(SESSION_KEY, user.email);
  return { ok: true };
}

export function logoutUser() {
  if (!canUseStorage()) return;
  localStorage.removeItem(SESSION_KEY);
}

export function getSessionEmail(): string | null {
  if (!canUseStorage()) return null;
  return localStorage.getItem(SESSION_KEY);
}

export function getCurrentUser(): UserProfile | null {
  if (!canUseStorage()) return null;
  const email = localStorage.getItem(SESSION_KEY);
  const raw = localStorage.getItem(USER_KEY);
  if (!email || !raw) return null;
  const user = JSON.parse(raw) as UserProfile;
  if (user.email.toLowerCase() !== email.toLowerCase()) return null;
  return user;
}

export function saveUser(user: UserProfile) {
  if (!canUseStorage()) return;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function upsertPersonalReptile(
  reptile: Omit<PersonalReptile, "id" | "createdAt"> & {
    id?: string;
    createdAt?: string;
  }
): PersonalReptile | null {
  const user = getCurrentUser();
  if (!user) return null;

  if (reptile.id) {
    user.reptiles = user.reptiles.map((r) =>
      r.id === reptile.id
        ? {
            ...r,
            ...reptile,
            id: r.id,
            createdAt: r.createdAt,
          }
        : r
    );
    saveUser(user);
    return user.reptiles.find((r) => r.id === reptile.id) ?? null;
  }

  const created: PersonalReptile = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    name: reptile.name,
    speciesSlug: reptile.speciesSlug,
    notes: reptile.notes,
    age: reptile.age,
    weight: (reptile as any).weight || "",
    lastFed: reptile.lastFed,
    lastWatered: reptile.lastWatered,
    feedingSchedule: reptile.feedingSchedule,
    wateringSchedule: reptile.wateringSchedule,
    cleaningSchedule: (reptile as any).cleaningSchedule || "",
    substrateSchedule: (reptile as any).substrateSchedule || "",
  };
  user.reptiles.push(created);
  saveUser(user);
  return created;
}

export function deletePersonalReptile(id: string) {
  const user = getCurrentUser();
  if (!user) return;
  user.reptiles = user.reptiles.filter((r) => r.id !== id);
  saveUser(user);
}

export function updateProfile(displayName: string) {
  const user = getCurrentUser();
  if (!user) return;
  user.displayName = displayName;
  saveUser(user);
}

// Firebase sync removed from top-level module import to prevent server component errors.
// Will be implemented via a safe client-side only function in the future.
