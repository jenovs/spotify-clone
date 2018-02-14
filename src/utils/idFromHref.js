export default href => {
  const args = href.split('/');
  return args[args.length - 1];
};
