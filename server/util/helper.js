const helper = {
  replaceChars: (input, char) => {
    let output;
    if (typeof input === 'string') {
      output = input.split(char).join('');
    } else if (input instanceof Array) {
      output = [];
      input.forEach((txt) => {
        output.push(txt.split(char)[1]);
      });
    }
    return output;
  }
};

module.exports = helper;
