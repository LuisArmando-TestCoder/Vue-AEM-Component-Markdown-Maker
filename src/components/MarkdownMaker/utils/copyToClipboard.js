const copyToClipboard = (element) => {
  element.select();

  document.execCommand("copy");

  element.blur();
};

export default copyToClipboard;