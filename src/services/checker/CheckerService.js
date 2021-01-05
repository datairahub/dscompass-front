/* eslint-disable class-methods-use-this */

export default class {
  /**
   * Check if email is valid
   * Returns true is email has correct format, otherwise returns false
   */
  isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
    return re.test(String(email).toLowerCase());
  }

  /**
   * Check if password is valid
   * Returns true is password has correct format, otherwise returns false
   */
  isValidPassword(password) {
    return password.length >= 20
      && this.containsNotOnlyNumbers(password)
      && this.uncommonPassword(password);
  }

  /**
   * Check if string contains not only numbers
   * Returns true is string is't only numbers, otherwise returns false
   */
  containsNotOnlyNumbers(string) {
    const reNotOnlyNumbers = /(?!^\d+$)^.+$/;
    return reNotOnlyNumbers.test(string);
  }

  /**
   * Check if password isn't a common password
   * Returns true is string is uncommon, otherwise returns false
   */
  uncommonPassword(password) {
    const commons = ['123456','password','12345678','qwerty','123456789','12345','1234','111111','1234567','dragon','123123','baseball','abc123','football','monkey','letmein','696969','shadow','master','666666','qwertyuiop','123321','mustang','1234567890','michael','654321','pussy','superman','1qaz2wsx','7777777','fuckyou','121212','000000','qazwsx','123qwe','killer','trustno1','jordan','jennifer','zxcvbnm','asdfgh','hunter','buster','soccer','harley','batman','andrew','tigger','sunshine','iloveyou','fuckme','2000','charlie','robert','thomas','hockey','ranger','daniel','starwars','klaster','112233','george','asshole','computer','michelle','jessica','pepper','1111','zxcvbn','555555','11111111','131313','freedom','777777','pass','fuck','maggie','159753','aaaaaa','ginger','princess','joshua','cheese','amanda','summer','love','ashley','6969','nicole','chelsea','biteme','matthew','access','yankees','987654321','dallas','austin','thunder','taylor','matrix'];  // eslint-disable-line
    return commons.indexOf(password) === -1;
  }
}
