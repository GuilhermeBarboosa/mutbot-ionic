import { TestBed } from '@angular/core/testing';
import { TestingModule } from '../modules/testing.module';

import { JwtService } from './jwt.service';


describe('JwtService', () => {
  let service: JwtService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestingModule
      ]
    });
    service = TestBed.inject(JwtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('checks token is valid', () => {
    spyOn(service['helper'], 'isTokenExpired').and.returnValue(false);
    expect(service.tokenIsValid('token')).toBeTruthy();
  });
});
