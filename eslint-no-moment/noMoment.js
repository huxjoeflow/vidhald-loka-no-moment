// @ts-check
/** @type {import('eslint').Rule.RuleModule} */
const rule = {
    meta: {
      type: "problem",
      docs: {
        description: "Forbids use of the moment library",
        category: "Possible Errors",
      },
    },
    create(context) {
      return {
        "ImportDeclaration, CallExpression"(node) {
          let sourceValue = "";
  
          if (
            node.type === "ImportDeclaration" &&
            node.source &&
            typeof node.source.value === "string"
          ) {
            sourceValue = node.source.value;
          } else if (
            node.type === "CallExpression" &&
            node.callee.name === "require" &&
            node.arguments.length > 0 &&
            node.arguments[0].type === "Literal" &&
            typeof node.arguments[0].value === "string"
          ) {
            sourceValue = node.arguments[0].value;
          }
  
          if (sourceValue === "moment") {
            context.report({
              node,
              message:
                "The use of the moment library is forbidden. Use date-fns for consistency",
            });
          }
        },
      };
    },
  };
  
  module.exports = rule;