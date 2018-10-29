
const fLetterCaps = function firstLetterUpperCase(value){
  let lower =value.toLowerCase();
  let upper = lower.charAt(0).toUpperCase() + lower.substring(1);
  return upper;
}

module.exports =fLetterCaps;
