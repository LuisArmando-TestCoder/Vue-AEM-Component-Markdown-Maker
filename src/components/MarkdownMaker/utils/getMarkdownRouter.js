import inputTriggers from "./inputTriggers";

const getMarkdownRouter = () => {
  const markdownRouter = {};

  [...inputTriggers.keys()].forEach((textareaID) => {
    Object.keys(inputTriggers.get(textareaID)).forEach((key) => {
      const textarea = document.getElementById(textareaID);
      const inputTrigger = inputTriggers.get(textareaID);
      const routerBranch = inputTrigger[key];

      markdownRouter[key] = routerBranch(textarea);
    });
  });

  return markdownRouter;
};

export default getMarkdownRouter;