import CheckerService from './CheckerService';

describe('Checker.js', () => {
  const Checker = new CheckerService();

  it('isValidEmail() returns false if email is not valid', () => {
    expect(Checker.isValidEmail('plainaddress')).toBeFalsy();
    expect(Checker.isValidEmail('#@%^%#$@#$@#.com')).toBeFalsy();
    expect(Checker.isValidEmail('@domain.com')).toBeFalsy();
    expect(Checker.isValidEmail('Joe Smith <email@domain.com>')).toBeFalsy();
    expect(Checker.isValidEmail('email.domain.com')).toBeFalsy();
    expect(Checker.isValidEmail('email@domain@domain.com')).toBeFalsy();
    expect(Checker.isValidEmail('.email@domain.com')).toBeFalsy();
    expect(Checker.isValidEmail('email.@domain.com')).toBeFalsy();
    expect(Checker.isValidEmail('email..email@domain.com')).toBeFalsy();
    expect(Checker.isValidEmail('email@domain.com (Joe Smith)')).toBeFalsy();
    expect(Checker.isValidEmail('email@domain')).toBeFalsy();
    expect(Checker.isValidEmail('email@111.222.333.44444')).toBeFalsy();
    expect(Checker.isValidEmail('email@domain..com')).toBeFalsy();
  });

  it('isValidEmail() returns true if email is valid', () => {
    expect(Checker.isValidEmail('email@domain.com')).toBeTruthy();
    expect(Checker.isValidEmail('firstname.lastname@domain.com')).toBeTruthy();
    expect(Checker.isValidEmail('email@subdomain.domain.com')).toBeTruthy();
    expect(Checker.isValidEmail('firstname+lastname@domain.com')).toBeTruthy();
    expect(Checker.isValidEmail('email@[123.123.123.123]')).toBeTruthy();
    expect(Checker.isValidEmail('"email"@domain.com')).toBeTruthy();
    expect(Checker.isValidEmail('1234567890@domain.com')).toBeTruthy();
    expect(Checker.isValidEmail('email@domain-one.com')).toBeTruthy();
    expect(Checker.isValidEmail('_______@domain.com')).toBeTruthy();
    expect(Checker.isValidEmail('email@domain.name')).toBeTruthy();
    expect(Checker.isValidEmail('email@domain.co.jp')).toBeTruthy();
    expect(Checker.isValidEmail('firstname-lastname@domain.com')).toBeTruthy();
  });
});
