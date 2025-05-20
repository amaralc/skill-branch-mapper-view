
import { SkillPath } from "@/types/skill";

interface StoredEvaluation {
  id: string;
  timestamp: number;
  skillPath: SkillPath;
  careerId?: string;
  selectedLevel?: string | null;
  selectedTrack?: string | null;
}

const DB_NAME = 'skillBranchMapper';
const STORE_NAME = 'evaluations';
const DB_VERSION = 1;

export async function initDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
  });
}

export async function saveEvaluation(evaluation: StoredEvaluation): Promise<void> {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put(evaluation);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

export async function getEvaluation(id: string): Promise<StoredEvaluation | null> {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(id);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result || null);
  });
}

export function generateEvaluationId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}
