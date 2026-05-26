const css = `
.bg-primary {
  --tw-bg-color: color-mix(in srgb, var(--primary), black);
  background-color: var(--tw-bg-color);
  padding: 10px;
}
.text-white { color: oklch(1 0 0); margin: 5px; }
`;

let replaced = css.replace(/([\w-]+)\s*:[^;}]*?(oklch|oklab|color-mix)[^;}]*?([;}])/g, '/* removed $1 */$3');
console.log(replaced);
