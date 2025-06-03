// templates/types/[name].ts
const typeTemplate = `// src/types/<%= name %>.ts
export interface <%= Name %> {
  /* TEMPLATE COMMENT:
    Add relevant attributes.
    E.g. id: number;
  */
}

export interface Create<%= Name %>Input {
  /* TEMPLATE COMMENT:
    Add relevant attributes.
    E.g. status: number;
  */
}

export interface Update<%= Name %>Input extends Create<%= Name %>Input {
  id: number;
}`;

module.exports = typeTemplate;