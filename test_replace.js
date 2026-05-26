const css = `
.bg-primary { background-color: oklch(0.5 0 0); padding: 10px; }
.text-white { color: color-mix(in srgb, var(--color-white), transparent); margin: 5px; }
`;

let replaced = css.replaceAll('oklch', 'rgb')
                .replaceAll('oklab', 'rgb')
                .replaceAll('color-mix', 'rgb');

console.log(replaced);
