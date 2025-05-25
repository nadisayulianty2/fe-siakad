import type { MahasiswaType } from 'types/Mahasiswa'; // sesuaikan path
import axios from 'axios';
import type { MataKuliahType } from '@/types/MataKuliah';

// Ganti URL base sesuai dengan lokasi backend kamu
export const api = axios.create({
  baseURL: 'http://localhost:3124',
  headers: {
    'Content-Type': 'application/json',
  },
});

// === MAHASISWA ENDPOINT ===

export const getMahasiswa = () => api.get<MahasiswaType[]>('/mahasiswa');

export const getMahasiswaByNim = (nim: string) =>
  api.get<MahasiswaType>(`/mahasiswa/${nim}`);

export const createMahasiswa = (data: MahasiswaType) =>
  api.post('/mahasiswa', data);

export const updateMahasiswa = (nim: string, data: MahasiswaType) =>
  api.put(`/mahasiswa/${nim}`, data);

export const deleteMahasiswa = (nim: string) =>
  api.delete(`/mahasiswa/${nim}`);

// === MATA KULIAH ENDPOINT ===

export const getMataKuliah = () => api.get<MataKuliahType[]>('/mata-kuliah');

export const getMataKuliahByKode = (kode: string) =>
  api.get<MataKuliahType>(`/mata-kuliah/${kode}`);

export const createMataKuliah = (data: MataKuliahType) =>
  api.post('/mata-kuliah', data);

export const updateMataKuliah = (kode: string, data: MataKuliahType) =>
  api.put(`/mata-kuliah/${kode}`, data);

export const deleteMataKuliah = (kode: string) =>
  api.delete(`/mata-kuliah/${kode}`);


