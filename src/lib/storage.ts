import fs from "fs/promises";

// Location to store files locally
const folder = "files/";
await fs.mkdir(folder, { recursive: true });

export function urlFor(path: string): string {
  return "/" + folder + path;
}

export async function upload(path: string, data: Buffer): Promise<string | null> {
  await Bun.write(folder + path, data.buffer);
  return urlFor(path);
}

export async function download(path: string): Promise<Blob> {
  return Bun.file(folder + path);
}

export async function remove(path: string): Promise<void> {
  await fs.unlink(folder + path);
}
