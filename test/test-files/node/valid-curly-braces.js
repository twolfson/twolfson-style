// We allow `case` and `default` statements to not need curly braces
switch ('hello') {
  case 'world':
    console.log('woot');
    break;
  default:
    console.log('dopplewoot');
    break;
}
