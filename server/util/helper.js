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
  },
  sort: (list, key, isDateField, descending = true) => {
    return list.sort((item1, item2) => {
      let comparison = 0;
      const item1Key = (item1 && (key in item1) && (isDateField ? new Date(item1[key]) : item1[key].toLowerCase())) || '';
      const item2Key = (item2 && (key in item2) && (isDateField ? new Date(item2[key]) : item2[key].toLowerCase())) || '';

      if (item1Key > item2Key) {
        comparison = descending ? 1 : -1;
      } else if (item1Key < item2Key) {
        comparison = descending ? -1 : 1;
      }

      return comparison;
    });
  }
};

module.exports = helper;
