async function getComputedStyleProperty(
  page: any,
  selector: string,
  property: string,
  pseudoElement: string = ''
): Promise<string> { 
  return await page.$eval(
    selector,
    (el: Element, { property, pseudoElement }: { property: string; pseudoElement: string }) =>
      window.getComputedStyle(el, pseudoElement).getPropertyValue(property),
    { property, pseudoElement }
  );
}

type PseudoElement = '::before' | '::after' | null;
Then use it in your helper function:

ts
Copy code
function getPseudoStyle(element: Element, pseudo: PseudoElement) {
  return window.getComputedStyle(element, pseudo);
}
✅ Example usage:

ts
Copy code
const el = document.querySelector('.btn')!;
const beforeStyle = getPseudoStyle(el, '::before');
console.log(beforeStyle.content);