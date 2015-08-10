<!-- more -->

## Properties

`box-sizing`
:  `content-box` (initial): The width and height properties are measured including only the content, but not the padding, border or margin.
:  `border-box`: The width and height properties include the padding and border, but not the margin.
:  ~~`padding-box`~~: The width and height properties include the padding size, and do not include the border or margin.

<figure>
  <figcaption>It's considered <a href="https://css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice/">good practice</a> to set all components to `border-box` by default:</figcaption>

```css
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
```
</figure>

`width: *-content`
:  `max-content`: The element width grows with the width of the content similar to an inline element like &lt;span&gt;
:   `min-content`: The width of the element contracts to the narrowest possible width the content allows
:  `fit-content`: The larger of: <sup>1</sup>the intrinsic minimum width, and <sup>2</sup>the smaller of the intrinsic preferred width and the available width

<figure>
  <figcaption>`max-content` "shrinkwraps" the content while `min-content` contracts the content to its narrowest possible width.</figcaption>

```html
<blockquote class="pretzels">These pretzels are making me thirsty.</blockquote>
<blockquote class="soup">Absolutely no soup for you.</blockquote>
```
```css
.pretzels {
  width: max-content;
}
.soup {
  width: min-content;
}
```
  <div class="fig">
    <blockquote class="demo-css3--widthmaxcontent">These pretzels are making me thirsty.</blockquote>
    <blockquote class="demo-css3--widthmincontent">Absolutely no soup for you.</blockquote>
  </div>
</figure>

## Values and Units

[`calc()`](http://www.w3.org/TR/css3-values/#calc)
:  Mathematical expressions with addition, subtraction, multiplication, and division

<figure>
  <figcaption>The following sets the `font-size` so that exactly 40em fits within the viewport, ensuring that roughly the same amount of text always fills the screen no matter the screen size.</figcaption>

```css
:root {
  font-size: calc(100vw / 40);
}
```
  <figcaption>If the rest of the design is specified using the ‘rem’ unit, the entire layout will scale to match the viewport width.</figcaption>
</figure>

[`toggle()`](http://www.w3.org/TR/css3-values/#toggle)
:  Allows descendant elements to cycle over a list of values instead of inheriting the same value.

<figure>
  <figcaption>The following example makes &lt;em&gt; elements italic in general, but makes them normal if they're inside something that's italic:</figcaption>

```css
em { font-style: toggle(italic, normal); }
```
</figure>
<figure>
  <figcaption>`toggle()` accepts more than two values so that nested elements proceed through the values, then repeat. The following example cycles markers for nested lists, so that a top level list has disc-shaped markers, but nested lists use circle, then square, then box, and then repeat through the list of marker shapes, starting again (for the 5th list deep) with disc.</figcaption>

```css
ul { list-style-type: disc; }
ul ul { list-style-type: toggle(disc, circle, square, box); }
```
</figure>

[~~`attr( attribute-name <type-or-unit>? [, <fallback> ]? )`~~]()
:  Applies the value of an HTML or XML attribute such as [data-*](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_data_attributes).
:  ლ(ಠ益ಠლ) Meager browser support ([polyfill](http://codepen.io/FWeinb/pen/Dsdkr))

<figure>
  <figcaption>Use of `attr()` to visually illustrate data in an XML file:</figcaption>

```xml
<stock>
  <wood length="12"/>
  <wood length="5"/>
  <metal length="19"/>
  <wood length="4"/>
</stock>
```
```css
stock::before {
  display: block;
  content: "To scale, the lengths of materials in stock are:";
}
stock > * {
  display: block;
  width: attr(length em); /* default 0 */
  height: 1em;
  border: solid thin;
  margin: 0.5em;
}
wood {
  background: orange url(wood.png);
}
metal {
  background: silver url(metal.png);
}
```
</figure>