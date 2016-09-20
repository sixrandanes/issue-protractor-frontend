import  * as fromDateUtil  from './date-utils';

describe('Util: Date', () => {

  it('should test null date', () => {
    // Given
    let date = null;
    // When
    let res = fromDateUtil.isValidDate(date);
    // expect
    expect(res).toBeFalsy();
  });

  it('should test empty date', () => {
    // Given
    let date = '';
    // When
    let res = fromDateUtil.isValidDate(date);
    // expect
    expect(res).toBeFalsy();
  });

  it('should test invalid number date', () => {
    // Given
    let date = '122454';
    // When
    let res = fromDateUtil.isValidDate(date);
    // expect
    expect(res).toBeFalsy();
  });

  it('should test invalid type date', () => {
    // Given
    let date = 'abcd';
    // When
    let res = fromDateUtil.isValidDate(date);
    // expect
    expect(res).toBeFalsy();
  });

  it('should test invalid format date', () => {
    // Given
    let date = '1/1/2016';
    // When
    let res = fromDateUtil.isValidDate(date);
    // expect
    expect(res).toBeFalsy();
  });

  it('should test other invalid format date', () => {
    // Given
    let date = '01-01-2016';
    // When
    let res = fromDateUtil.isValidDate(date);
    // expect
    expect(res).toBeFalsy();
  });

  it('should test other valid date', () => {
    // Given
    let date = '01/01/2016';
    // When
    let res = fromDateUtil.isValidDate(date);
    // expect
    expect(res).toBeTruthy();
  });

});
