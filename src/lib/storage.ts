import fs from "fs/promises";

// Create folder to store files automatically
const folder = "files/";
await fs.mkdir(folder, { recursive: true });

export function urlFor(path: string): string {
  return "/" + folder + path;
}

export async function upload(path: string, data: Buffer): Promise<void> {
  await Bun.write(folder + path, data.buffer);
}

export async function download(path: string): Promise<Blob> {
  return Bun.file(folder + path);
}

export async function remove(path: string): Promise<void> {
  await fs.unlink(folder + path);
}
