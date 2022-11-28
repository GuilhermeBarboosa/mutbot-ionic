import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);

    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('returns item from localStorage', () => {
    const value = new Date().getTime().toString();
    const key = `testing_${value}`;
    localStorage.setItem(key, value);
    expect(service.getItem(key)).toEqual(value);
  });

  it('returns empty string from localStorage when not exists', () => {
    expect(service.getItem('test')).toBeFalsy();
  });

  it('set item on localStorage', () => {
    const value = new Date().getTime().toString();
    const key = `testing_${value}`;
    service.setItem(key, value);
    expect(localStorage.getItem(key)).toEqual(value);
  });

  it('clear localStorage', () => {
    const value = new Date().getTime().toString();
    const key = `testing_${value}`;
    localStorage.setItem(key, value);
    service.clear();
    expect(localStorage.getItem(key)).toBeFalsy();
  });
});
