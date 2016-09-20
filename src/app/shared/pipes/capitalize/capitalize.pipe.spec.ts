import { TestBed, inject } from '@angular/core/testing';
import { CapitalizePipe } from './capitalize.pipe';

describe('capitalize Pipe', () => {

  beforeEach(() =>
      TestBed.configureTestingModule({
        providers: [
          CapitalizePipe
        ]
      })
  );

  it('should transform the input', inject([CapitalizePipe], (pipe: CapitalizePipe) => {

      expect(pipe.transform('toto')).toBe('Toto');
  }));

  it('should not transform the input', inject([CapitalizePipe], (pipe: CapitalizePipe) => {

    expect(pipe.transform('Toto')).toBe('Toto');
  }));

  it('should test empty input', inject([CapitalizePipe], (pipe: CapitalizePipe) => {

    expect(pipe.transform('')).toBe('');
  }));

  it('should test null input', inject([CapitalizePipe], (pipe: CapitalizePipe) => {

    expect(pipe.transform(null)).toBe(null);
  }));

  it('should not work with several words', inject([CapitalizePipe], (pipe: CapitalizePipe) => {

    expect(pipe.transform('aladin test')).toBe('Aladin test');
  }));
});
