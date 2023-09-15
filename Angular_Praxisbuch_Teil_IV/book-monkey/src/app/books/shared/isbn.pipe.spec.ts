import { IsbnPipe } from './isbn.pipe';

describe('IsbnPipe', () => {
  let pipe: IsbnPipe;

  beforeEach(() => {
    pipe = new IsbnPipe();
  });

  it('should create an instance', () => {
    // @ts-ignore
    expect(pipe).toBeTruthy();
  });

  it('should transform the value correctly', () => {
    const originalValue = '1234567890';
    const transformedValue = pipe.transform(originalValue);
    // @ts-ignore
    expect(transformedValue).toBe('123-4567890');
  });

  it('should handle empty input', () => {
    const originalValue = ''; // Empty string
    const transformedValue = pipe.transform(originalValue);
    // @ts-ignore
    expect(transformedValue).toBe('');
  });

  it('should handle null input', () => {
    const originalValue = null as any; // Cast null as any
    const transformedValue = pipe.transform(originalValue);
    // @ts-ignore
    expect(transformedValue).toBe(''); // Use .toBe(null) for null checks
  });

  it('should handle undefined input', () => {
    const originalValue = undefined as any; // Cast undefined as any
    const transformedValue = pipe.transform(originalValue);
    // @ts-ignore
    expect(transformedValue).toBe(''); // Use .toBe(undefined) for undefined checks
  });
});
